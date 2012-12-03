define([
    "jquery"
  , "lib/util/ui"
],


function($, ui) {

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
        selectMessage : "select the data source",
        labelWidth : 160,
        position : {
          menu : "left bottom",
          at : "left bottom"
        },
        format : function(item) {
          return '<span class="text">'+item.data.name.split("/").pop()+'</span>';
        },
        id : function(value, item) {
          return value === item.data.path;
        }
      });
      $(menu).on("select", function(e, data) {
        ctx.trigger("chart.datasource.change", data);
      });

      dequeue();

      ctx.on("data.datasource.add", add);
      ctx.on("data.datasource.remove", remove);

      ctx.off("data.datasource.add", addToQueue);
      ctx.off("data.datasource.remove", removeFromQueue);

      ctx.on("chart.datasource.change", function(datasource) {
        menu.select(datasource.path);
      });
    }

    function addToQueue(item) {
      queue.push(item);
    }

    function add(item) {
      items.push(item);
      menu.add({ content : item.name.split("/").pop(), data : item });
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
      console.log("TODO: REMOVE ITEM FROM SELECTOR");
    }

    ctx.on("data.datasource.add", addToQueue);
    ctx.on("data.datasource.remove", removeFromQueue);

    ctx.on("view.editor.datasourceselector", init);
  }
});