define([

],

function() {

  return function(ctx) {
    var map = {};

    ctx.on("data.datasource.add", function(item) {
      map[item.path] = item;
    });

    ctx.on("data.datasource.removebyname", function(name) {
      if(!map[name]) return;
      ctx.trigger("data.datasource.remove", map[name]);
    });

    ctx.on("data.datasource.remove", function(item) {
      delete map[item.path];
    });

    ctx.on("data.datasource.select", function(path) {
console.log("SELECTED", path);
      if(map[path])
        ctx.trigger("data.datasource.selected", map[path]);
    });

    ctx.on("data.datasource.deselect", function(path) {
      if(map[path])
        ctx.trigger("data.datasource.deselected", map[path]);
    });
  }
});