define([
    "jquery"
  , "lib/util/widget/values/editors"
],

function($, editors) {

  return function(ctx) {
    var el, options = [];
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
      var $container = $('<div></div>').appendTo(el);
      $container.append('<div class="name">'+(info.label || info.name)+'</div>');
      var $option = $('<div class="option"></div>');
      $container.append($option);
      // TODO switch to multiples

      var editor = editors(info.editors[0].type, $option, info.editors[0].options);

      function ctx_on_handler(v) {
        if(v !== editor.value.get())
          editor.value.set(v);
      }

      function ctx_trigger_handler(v) {
        ctx.trigger(info.event, v);
        ctx.trigger("chart.option.set", info.event.split(".").slice(2).join("."), v);
      }

      editor.value.on("value.change", ctx_trigger_handler);
      ctx.on(info.event, ctx_on_handler);


      function visible() {
        if(info.condition.visible.apply(info, arguments))
          $container.show();
        else
          $container.hide();
      }

      if(info.condition) {
        ctx.on(info.condition.event, visible);
        $container.hide();
      }

      options.push(function() {
        if(info.condition) {
          ctx.off(info.condition.event, visible);
        }
        editor.value.off("value.change", ctx_trigger_handler);
        ctx.off(info.event, ctx_on_handler);
        editor.destroy();
      });


      setTimeout(function() {
        ctx_trigger_handler(editor.value.get());
      }, 0);
    }

    ctx.on("view.editor.options", init);
  };
});