define([
    "lib/model/filesystem"
  , "lib/util/arrays"
],

function(createfs, arrays) {

  return function(ctx) {
    var queue = [],
        fs = createfs({
          types : {
              "folder": { "container" : ["report", "folder"] }
            , "report": { "container" : false }
          },
          defaultType : "folder"
        });

    function dequeue() {
      if(!fs) return;
      while(queue.length > 0) {
        addItem(queue.shift());
      }
    }

    function addItem(path) {
      fs.add(path, "report", true);
    }

    function removeItem(path, type) {
      fs.remove(path, type);
    }

    ctx.on("modules.ready", function() {
      ctx.trigger("reports.system.ready", fs);
    });

    ctx.on("reports.report.add", function(path) {
      queue.push(path);
      dequeue();
    });

    ctx.respond("report.path.validate", function(path) {
      var validation = fs.validate(path, "report");
      return {
        valid : !validation,
        reason : validation
      };
    });

    ctx.on("reports.report.remove", function(path) {
      if(arrays.remove(queue, path))
        return;
      removeItem(path, "report");
    });
  };
});