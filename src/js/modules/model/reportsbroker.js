define([],

function() {

  return function(ctx) {
    var map = {};

    ctx.on("reports.report.add", function(path, item) {
      map[path] = item;
    });

    ctx.on("reports.report.removebypath", function(path) {
      if(!map[path]) return;
      ctx.trigger("reports.report.remove", path, map[path]);
    });

    ctx.on("reports.folder.remove", function(path) {
      if(path.substr(-1) !== '/') path += '/';
      var len = path.length;
      for(var key in map) {
        if(!map.hasOwnProperty(key)) continue;
        if(key.length >  len && key.substr(0, len) === path) {
          ctx.trigger("reports.report.removebypath", key);
        }
      }
    });

    ctx.on("reports.report.remove", function(path, item) {
      delete map[path];
    });

    ctx.on("reports.report.select", function(path) {
      if(map[path])
        ctx.trigger("reports.report.selected", path, map[path]);
    });

    ctx.on("reports.report.deselect", function(path) {
      if(map[path])
        ctx.trigger("reports.report.deselected", path, map[path]);
    });

    ctx.on("reports.report.openpath", function(path) {
      if(!map[path]) return;
      ctx.trigger("chart.state.update", map[path]);
    });

    ctx.on("reports.report.exportpath", function(path) {
      if(!map[path]) return;
      ctx.trigger("reports.report.export", map[path], path);
    });
  };
});