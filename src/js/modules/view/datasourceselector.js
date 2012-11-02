define([
    "jquery"
  , "lib/util/ui"
],


function($, ui, charts) {

  return function(ctx) {
    var queue = [],
        items = [],
        menu;

    function dequeue() {
      while(queue.length > 0)
        add(queue.shift());
    }

    function init(el) {
      menu = ui.selectmenu(el, {
        data : [],
        format : function(item) {
console.log(item);
          return '<span class="text">'+item.data.name+'</span>';
        },
        width : 300
      });
      $(menu).on("select", function(e, data) {
        console.log(e, data);
//        ctx.trigger("chart.datasource.change", data.type);
      });

      ctx.on("chart.datasource.change", function(data) {
        console.log("DATA SOURCE CHANGE", e, data);
//        menu.selectIndex(charts.map[type].index);
      });

      dequeue();

      ctx.on("data.source.add", add);
      ctx.on("data.source.remove", remove);

      ctx.off("data.source.add", addToQueue);
      ctx.off("data.source.remove", removeFromQueue);

//      ctx.trigger("chart.type.change", "barchart");
    }

    function addToQueue(item) {
      queue.push(item);
      console.log("ADD ITEM TO MENU QUEUE", item);
    }

    function add(item) {
console.log("ADD ITEM DATASOURCE", item);
      items.push(item);
      menu.add({ content : item.name, data : item });
    }

    function removeFromArray(arr, item) {
      var j = -1;
      for(var i = 0; i < arr.length; i++) {
        if(arr[i].name == item.name) {
          j = -1;
          break;
        }
      }
      if(j > 0)
        arr.splice(j, 1);

    }

    function removeFromQueue(item) {
      removeFromArray(queue, item);
    }

    function remove(item) {
      removeFromArray(items, item);
      console.log("REMOVE ITEM");
    }

    ctx.on("data.source.add", addToQueue);
    ctx.on("data.source.remove", removeFromQueue);

    ctx.on("view.editor.datasourceselector", init);
  }
});

/*
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
 for(var i = 0; i < item.fields.list.length; i++) {
 filesystem.add(item.name+"/"+item.fields.list[i].name, item.fields.list[i].type);
 }
 }

 function removeItem(item) {
 filesystem.remove(item.name);
 }

 ctx.on("data.source.add", function(item) {
 queue.push(item);
 dequeue();
 });

 ctx.on("data.source.remove", function(item) {
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
  */