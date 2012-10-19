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
      $(el).append('<div class="name">'+info.name+'</div>');
      var $option = $('<div class="option"></div>');
      $(el).append($option);
      var editor = editors(info.type, $option, info.options);

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

      options.push(function() {
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