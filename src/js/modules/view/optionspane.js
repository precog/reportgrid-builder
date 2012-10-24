define([
    "jquery"
  , "lib/util/ui"
  , "lib/util/widget/values/editors"
],

function($, ui, editors) {

  return function(ctx) {
    var el,
        options = [];
    function init(container) {
      el = container;
      ctx.on("chart.type.change", update);
      ctx.on("chart.option.add", appendOption);
    };

    function update(type) {
      while(options.length > 0) {
        options.pop()();
      }

      el.children("*").remove()
    }

    function appendOption(info) {
      var editor,
          index = 0,
          $container = $('<div class="option-editor"></div>').appendTo(el);
      $container.append('<div class="name">'+(info.label || info.name)+'</div>');
      var $option = $('<div class="option"></div>');
      $container.append($option);

      function ctx_on_handler(v) {
        if(v !== editor.value.get())
          editor.value.set(v);
      }

      function ctx_trigger_handler(v) {
        ctx.trigger(info.event, v);
        ctx.trigger("chart.option.set", info.event.split(".").slice(2).join("."), v);
      }

      if(info.editors.length > 1) {
        var menu = ui.contextmenu('<div class="rg-widget settings-menu"></div>'),
            $multitrigger = ui.button($container, {
              icon : "ui-icon-gear",
              description : "switch editor"
            }).click(function() {
              var pos = $(this).offset(),
                  h = $(this).outerHeight();
              menu.css({
                position : "absolute",
                top : (pos.top + h) + "px",
                left : pos.left + "px"
              }).show();
            });
        var $ul = menu.find("ul");
        for(var i = 0; i < info.editors.length; i++) {
          var ieditor = info.editors[i];
              $li = $('<li class="ui-menu-item" role="presentation"><a href="#">'+(ieditor.label || ieditor.type)+'</a></li>');
          $li.click(function() {
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
            // create new
            editor = editors(info.editors[index].type, $option, info.editors[index].options);
            editor.value.on("value.change", ctx_trigger_handler);
          });
          $ul.append($li);
        }
      }

      editor = editors(info.editors[index].type, $option, info.editors[index].options);
      editor.value.on("value.change", ctx_trigger_handler);

      ctx.on(info.event, ctx_on_handler);


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
        ctx.off(info.event, ctx_on_handler);
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