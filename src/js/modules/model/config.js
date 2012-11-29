define([
  "lib/util/store"
],

function(createStore) {
  var STORE_NAME = "RGBUILDER:CONFIG",
      defaults = {
        theme : "gray"
      },
      store = createStore(STORE_NAME, defaults);

  return function(ctx) {
    /*
    store.monitor.bind("theme", function(theme) {
      ctx.trigger("theme.change", theme);
    });
    */
    ctx.on("modules.ready", function() {
      var theme = store.get("theme");
      ctx.trigger("theme.change", theme);
    });
    ctx.on("theme.changing", function(theme) {
      store.set("theme", theme, true);
      store.commit();
    });
  };
});