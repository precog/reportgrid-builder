define([
  "util/storagemonitor"
],

function(createStore) {
  var CONFIG_KEY = "rg-builder-config",
      defaults = {
        theme : "gray"
      },
      config = createStore(CONFIG_KEY, defaults);
  return function(ctx) {
    config.monitor.bind("theme", function(theme) {
      ctx.trigger("view.theme.change", theme);
    });
    ctx.on("modules.loaded", function() {
      var theme = config.get("theme");
      ctx.trigger("view.theme.change", theme);
    });
    ctx.on("view.theme.changed", function(e, theme) {
      config.set("theme", theme);
    });
  };
});