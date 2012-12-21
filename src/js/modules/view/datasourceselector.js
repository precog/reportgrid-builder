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
        width : 400,
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
        ctx.provide("chart.datasource.change", data);
      });

      dequeue();

      ctx.on("data.datasource.add", add);
      ctx.on("data.datasource.remove", remove);

      ctx.off("data.datasource.add", add_to_queue);
      ctx.off("data.datasource.remove", remove_from_queue);

      ctx.on("chart.datasource.change", function(datasource) {
        menu.selectValue((datasource && datasource.path) || null);
      });
    }

    function add_to_queue(item) {
      queue.push(item);
    }

    function add(item) {
      items.push(item);
      menu.add({ content : item.name.split("/").pop(), data : item });
    }

    function remove_from_array(arr, item) {
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

    function remove_from_queue(item) {
      remove_from_array(queue, item);
    }

    function remove(item) {
      remove_from_array(items, item);
      console.log("TODO: REMOVE ITEM FROM SELECTOR");
    }

    ctx.on("data.datasource.add", add_to_queue);
    ctx.on("data.datasource.remove", remove_from_queue);

    ctx.one("view.editor.datasourceselector", init);
  }
});