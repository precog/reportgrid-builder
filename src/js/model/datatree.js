define([
    "model/filesystem"
],

function(createFileSystem) {

  return function(ctx) {
    var fs = createFileSystem({
      types : {
          "folder" : { "container" : true }
        , "datasource" : { "container" : true }
        , "column" : { "container" : false}
      },
      defaultType : "folder"
    });

    ctx.on("modules.loaded", function() {
      ctx.trigger("data.system.ready", fs);
    });
  };
});