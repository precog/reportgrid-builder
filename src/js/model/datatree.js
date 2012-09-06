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
    fs.add("/c", "folder");
    fs.add("/b", "datasource");

    ctx.on("modules.loaded", function() {
      ctx.trigger("data.system.ready", fs);
      fs.add("/d", "folder");
      fs.add("/a/e", "folder");
      setTimeout(function() { fs.add("/slow/child", "folder", true); }, 2000);
      setTimeout(function() { fs.add("/average/child", "folder", true); }, 1000);
      setTimeout(function() { fs.add("/fast/sub/a3", "folder", true); }, 0);
    });
  };
});