define([
    "lib/model/filesystem"
],

function(createFileSystem) {

  return function(ctx) {
    var fs = createFileSystem({
            types : {
                "folder":     { "container" : ["datasource", "folder"] }
              , "datasource": { "container" : ["column"] }
              , "column":     { "container" : false}
            },
            defaultType : "folder"
          });

    fs.add("/a", "folder");
    fs.add("/c", "folder");
    fs.add("/ds1", "datasource");

    ctx.on("modules.loaded", function() {
      ctx.trigger("data.system.ready", fs);
      fs.add("/ds2", "datasource");
      fs.add("/a/e", "folder");
      setTimeout(function() { fs.add("/ds-slow/col", "column", true); }, 500);
      setTimeout(function() { fs.add("/average/child", "folder", true); }, 250);
      setTimeout(function() { fs.add("/fast/sub/ds3", "datasource", true); }, 0);
    });
  };
});