define([
    "lib/model/filesystem"
  , "lib/model/variables"
  , "lib/util/arrays"
],

function(createfs, variables, arrays) {

  return function(ctx) {
    var queue = [],
        fs = createfs({
          types : {
              "folder":     { "container" : ["datasource", "folder"] }
            , "datasource": { "container" : variables.all() }
            , "category":   { "container" : false }
            , "ordinal":    { "container" : false }
            , "time":       { "container" : false }
            , "discrete":   { "container" : false }
            , "continuous": { "container" : false }
          },
          defaultType : "folder"
        });

    function dequeue() {
      if(!fs) return;
      while(queue.length > 0) {
        addItem(queue.shift());
      }
    }

    function addItem(item) {
      fs.add(item.path, "datasource", true);
      for(var i = 0; i < item.fields.length; i++) {
        var field = item.fields[i];
        fs.add(item.path+"/"+field.name, field.type, true);
      }
    }

    function removeItem(path, type) {
      fs.remove(path, type);
    }

    ctx.on("modules.ready", function() {
      ctx.trigger("data.system.ready", fs);
    });

    ctx.on("data.datasource.add", function(item) {
      queue.push(item);
      dequeue();
    });

    ctx.on("request.datasource.path.validate", function(path) {
      var validation = fs.validate(path, "datasource");
      ctx.trigger("response.datasource.path.validated", path, !validation, validation);
    });

    ctx.on("data.datasource.remove", function(item) {
      if(arrays.remove(queue, item))
        return;
      removeItem(item.path, "datasource");
    });
  };
});