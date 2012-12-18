define([
  "lib/util/store"
],

function(createStore) {
  var STORE_NAME = "RGBUILDER:REPORTS",
      store = createStore(STORE_NAME, { map : {} });

  function save_filter(v) {
    return JSON.stringify(v);
  }

  function load_filter(v) {
    return "string" === typeof v ? JSON.parse(v) : v;
  }

  return function(ctx) {
    var map = store.get("map");

    for(var path in map) {
      if(!map.hasOwnProperty(path)) continue;
      ctx.trigger("reports.report.add", path, load_filter(map[path]));
    }

    ctx.on("reports.report.add", function(path, state) {
      map[path] = save_filter(state);
      store.delayedCommit();
    });

    ctx.on("reports.report.update", function(path, state) {
      map[path] = save_filter(state);
      store.delayedCommit();
    });

    ctx.on("reports.report.remove", function(path) {
      delete map[path];
      store.delayedCommit();
    });
  };
});