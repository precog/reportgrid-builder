define([
    "lib/model/filesystem"
],

function(createFileSystem) {

  return function(ctx) {
    var fs = createFileSystem({
            types : {
                "folder":     { "container" : ["datasource", "folder"] }
              , "datasource": { "container" : ["discrete", "continuous", "category", "time"] }
              , "discrete":   { "container" : false }
              , "continuous": { "container" : false }
              , "category":   { "container" : false }
              , "ordinal":    { "container" : false }
              , "time":       { "container" : false }
            },
            defaultType : "folder"
          });
    ctx.on("modules.loaded", function() {
      ctx.trigger("data.system.ready", fs);
    });
  };
});