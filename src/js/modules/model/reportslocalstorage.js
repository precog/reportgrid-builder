define([
  "lib/util/store"
],

function(createStore) {
  var STORE_NAME = "RGBUILDER:REPORTS",
      store = createStore(STORE_NAME, { map : {} });

  return function(ctx) {
    var map = store.get("map");

    for(var path in map) {
      if(!map.hasOwnProperty(path)) continue;
      ctx.trigger("reports.report.add", path, map[path]);
    }

    ctx.on("reports.report.add", function(path, state) {
      map[path] = state;
      store.delayedCommit();
    });

    ctx.on("reports.report.remove", function(path) {
      delete map[path];
      store.delayedCommit();
    });
  };
});