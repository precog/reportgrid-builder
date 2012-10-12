define([
  "lib/util/arrays"
],

function(arrays) {

  return function(ctx) {
    var queue = [], filesystem;

    function dequeue() {
      if(!filesystem) return;
      while(queue.length > 0) {
        addItem(queue.shift());
      }
    }

    function addItem(item) {
      filesystem.add(item.name, "datasource");
        for(var i = 0; i < item.fields.length; i++) {
          filesystem.add(item.name+"/"+item.fields[i].name, item.fields[i].type);
        }
    }

    function removeItem(item) {
      filesystem.remove(item.name);
    }

    ctx.on("data.source.add", function(item) {
      queue.push(item);
      dequeue();
    });

    ctx.on("datas.ource.remove", function(item) {
      if(arrays.remove(queue))
        return;
      removeItem(item);
    });

    ctx.on("data.system.ready", function(fs) {
      filesystem = fs;
      dequeue();
    });
  }
});