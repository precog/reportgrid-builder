define([
    "jquery"
  , "config/ui"
  , "lib/util/ui"
  , "lib/util/widget/values/editors"
  , "config/optiongroups"
],

function($, uiconfig, ui, editors, optiongroups) {

  return function(ctx) {
    var el,
        options = [],
        groups = {},
        defaultGroup;
    function init(container) {
      el = container;

      $(optiongroups).each(function() {
        var $ogroup = $('<fieldset class="ui-widget-content"><div class="group-header ui-widget-content ui-widget-header">'+this.label+'</div><div class="fields"></div></fieldset>').hide();
        el.append($ogroup);
        groups[this.group] = $ogroup;
      });
      defaultGroup = groups[optiongroups[optiongroups.length - 1].group];
      ctx.on("chart.type.change", update);
      ctx.on("chart.option.add", appendOption);
    };

    function update(type) {
      while(options.length > 0) {
        options.pop()();
      }


      el.find('fieldset').hide().find('div.fields').children("*").remove();
    }

    function findRef(container, weight, name) {
      var list = container.find(".option-editor"), t;
      for(var i = 0; i < list.length; i++) {
        var el = $(list[i]);
        t = parseInt(el.attr("data-weight"));
        if(weight < t)
          return el;
        if(weight > t)
          continue;

        t = el.attr("data-name");
        if(name < t)
          return el;
      }
      return null;
    }

    function appendOption(info) {
      var editor,
          index = 0,
          $fieldset = (groups[info.group] || defaultGroup).show(),
          $fields = $fieldset.find(".fields:first"),
          weight = info.weight || 0,
          $ref = findRef($fields, weight, info.name),
          $container = $('<div class="option-editor" data-weight="'+weight+'" data-name="'+info.name+'"></div>'),
          eventName = info.event.split(".").slice(2).join("."),
          current_type,
          menu;

      if($ref) {
        $container.insertBefore($ref);
      } else {
        $fields.append($container);
      }

      if(ctx.debug && !groups[info.group]) {
        console.warn("UNMATCHED GROUP " + info.group + " for " + info.name);
      }

      function ctx_on_handler(v) {
        if(v !== editor.value.get())
          editor.value.set(v);
      }

      function ctx_trigger_handler(v) {
        ctx.trigger(info.event, v);
        if(info.event.substr(0, "options.chart.".length) === "options.chart.")
        {
          ctx.off("chart.option.set", editor_value_set);
          ctx.trigger("chart.option.set", eventName, v, current_type);
          ctx.on("chart.option.set", editor_value_set);
        }
      }

      function editor_value_set(event, v, type) {
        if(event !== eventName) return;
        if(v !== editor.value.get()) {
console.log("$$$$$$$$$$", event, eventName, v, type);
          var newindex = -1;
          for(var i = 0; i < info.editors.length; i++)
          {
            if(info.editors[i].type === type) {
              newindex = i;
              break;
            }
          }
          if(menu && newindex >= 0 && newindex != index) {
            menu.find("li:eq("+newindex+")").click();
          }
          console.log(editor.value.validate(v));
          editor.value.set(v);
        }
      }

      ctx.on("chart.option.set", editor_value_set);

      if(info.editors.length > 1) {
        menu = ui.contextmenu('<div class="rg-widget settings-menu"></div>');
        var $multitrigger = ui.button($container, {
                icon : "ui-icon-gear",
                description : "switch editor",
                className : "swap-option"
              })
              .click(function() {
              var pos = $(this).offset(),
                  h = $(this).outerHeight();
              menu.css({
                position : "absolute",
                top : (pos.top + h) + "px",
                left : pos.left + "px"
              }).show();
            });
        var $ul = menu.find("ul");

        function switch_editor() {
          var newindex = $(this).index();
          if(index === newindex)
            return;
          index = newindex;
          if(editor) {
            // destroy old
            editor.value.off("value.change", ctx_trigger_handler);
            editor.destroy();
            $option.children("*").remove();
          }
          current_type = info.editors[index].type;
          // create new
          editor = editors.create($option, info.editors[index].type, info.editors[index].options);
          editor.value.on("value.change", ctx_trigger_handler);
        }

        for(var i = 0; i < info.editors.length; i++) {
          var ieditor = info.editors[i];
              $li = $('<li class="ui-menu-item" role="presentation"><a href="#">'+(ieditor.label || ieditor.type)+'</a></li>');
          $li.click(switch_editor);
          $ul.append($li);
        }
      }

      var $label = $('<div class="name">'+(("undefined" !== typeof info.label) ? info.label : info.name)+'</div>');
      $container.append($label);
      var $option = $('<div class="option"></div>');
      if(info.className) {
        $container.addClass(info.className);
      }
      $container.append($option);

      editor = editors.create($option, info.editors[index].type, info.editors[index].options);
      editor.value.on("value.change", ctx_trigger_handler);
      current_type = info.editors[index].type;


//      ctx.on(info.event, ctx_on_handler);


      function condition_visible() {
        if(info.condition.visible.apply(info, arguments)) {
          $container.show();
        } else {
          $container.hide();
        }
      }

      if(info.condition) {
        ctx.on(info.condition.event, condition_visible);
        $container.hide();
      }

      options.push(function() {
        if(info.condition) {
          ctx.off(info.condition.event, condition_visible);
        }
        editor.value.off("value.change", ctx_trigger_handler);
//        ctx.off(info.event, ctx_on_handler);
        ctx.off("chart.option.set", editor_value_set);
        editor.destroy();
      });

      $container.append('<div class="clr"></div>');

      setTimeout(function() {
        ctx_trigger_handler(editor.value.get());
      }, 0);
    }

    ctx.on("view.editor.options", init);
  };
});