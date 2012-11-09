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
        selectMessage : "select the data source",
        labelWidth : 160,
        position : {
          menu : "left bottom",
          at : "left bottom"
        },
        format : function(item) {
          return '<span class="text">'+item.data.name.split("/").pop()+'</span>';
        }
      });
      $(menu).on("select", function(e, data) {
        ctx.trigger("chart.datasource.change", data);
      });

      ctx.on("chart.datasource.change", function(data) {
        console.log("MUST UPDATE THE SELECTOR");
        console.log("DATA SOURCE CHANGE", data);
//        menu.selectIndex(charts.map[type].index);
      });

      dequeue();

      ctx.on("data.source.add", add);
      ctx.on("data.source.remove", remove);

      ctx.off("data.source.add", addToQueue);
      ctx.off("data.source.remove", removeFromQueue);
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
      console.log("REMOVE ITEM FROM SELECTOR");
    }

    ctx.on("data.source.add", addToQueue);
    ctx.on("data.source.remove", removeFromQueue);

    ctx.on("view.editor.datasourceselector", init);
  }
});