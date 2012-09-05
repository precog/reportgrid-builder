define([
    "model/filesystem"
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
    fs.add("/b", "folder");
    fs.add("/c", "folder");

    ctx.on("modules.loaded", function() {
      ctx.trigger("data.system.ready", fs);
      fs.add("/d", "folder");
      fs.add("/a/e", "folder");
      setTimeout(function() { fs.add("/b/f", "folder"); }, 2000);
    });
  };
});