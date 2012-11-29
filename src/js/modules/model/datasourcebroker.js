define([

],

function() {

  return function(ctx) {
    var map = {};

    ctx.on("data.datasource.add", function(item) {
      map[item.path] = item;
    });

    ctx.on("data.datasource.removebypath", function(path) {
      if(!map[path]) return;
      ctx.trigger("data.datasource.remove", map[path]);
    });

    ctx.on("data.folder.remove", function(path) {
      if(path.substr(-1) !== '/') path += '/';
      var len = path.length;
      console.log("REMOVE FOLDER", path);
      for(var key in map) {
        if(!map.hasOwnProperty(key)) continue;
        if(key.length >  len && key.substr(0, len) === path) {
          ctx.trigger("data.datasource.removebypath", key);
        }
      }
    });

    ctx.on("data.datasource.remove", function(item) {
      delete map[item.path];
    });

    ctx.on("data.datasource.select", function(path) {
      if(map[path])
        ctx.trigger("data.datasource.selected", map[path]);
    });

    ctx.on("data.datasource.deselect", function(path) {
      if(map[path])
        ctx.trigger("data.datasource.deselected", map[path]);
    });
  }
});