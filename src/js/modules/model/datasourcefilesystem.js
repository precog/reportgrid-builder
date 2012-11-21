define([
    "lib/model/filesystem"
  , "lib/util/arrays"
],

function(createfs, arrays) {

  return function(ctx) {
    var queue = [],
        fs = createfs({
          types : {
              "folder":     { "container" : ["datasource", "folder"] }
            , "datasource": { "container" : ["discrete", "continuous", "category", "time"] }
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
      fs.add(item.name, "datasource");
      for(var i = 0; i < item.fields.length; i++) {
        var field = item.fields[i];
        fs.add(item.path+item.name+"/"+field.name, field.type);
      }
    }

    function removeItem(name, type) {
      fs.remove(name, type);
    }

    ctx.on("modules.ready", function() {
      ctx.trigger("data.system.ready", fs);
    });

    ctx.on("data.datasource.add", function(item) {
      queue.push(item);
      dequeue();
    });

    ctx.on("data.datasource.remove", function(item) {
      if(arrays.remove(queue, item))
        return;
      removeItem(item.name, "datasource");
    });
  };
});