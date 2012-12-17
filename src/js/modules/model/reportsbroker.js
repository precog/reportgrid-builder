define([],

function() {

  return function(ctx) {
    var map = {};

    function save(path, item) {
      map[path] = JSON.stringify(item);
    }

    function load(path) {
      return JSON.parse(map[path]);
    }

    function exists(path) {
      return !!map[path];
    }

    function remove(path) {
      delete map[path];
    }

    ctx.on("reports.report.add", function(path, item) {
      save(path, item);
    });

    ctx.on("reports.report.update", function(path, item) {
      if(!exists(path)) {
        ctx.trigger("reports.report.add", path, item);
      } else {
        save(path, item);
      }
    });

    ctx.on("reports.report.removebypath", function(path) {
      if(!exists(path)) return;
      ctx.trigger("reports.report.remove", path, load(path));
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
      remove(path);
    });

    ctx.on("reports.report.select", function(path) {
      if(exists(path))
        ctx.trigger("reports.report.selected", path, load(path));
    });

    ctx.on("reports.report.deselect", function(path) {
      if(exists(path))
        ctx.trigger("reports.report.deselected", path, load(path));
    });

    ctx.on("reports.report.openpath", function(path) {
      if(!exists(path)) return;
      ctx.trigger("chart.state.update", load(path));
      ctx.trigger("chart.name.set", path.split("/").pop());
    });

    ctx.on("reports.report.exportpath", function(path) {
      if(!exists(path)) return;
      ctx.trigger("reports.report.export", load(path), path);
    });
  };
});