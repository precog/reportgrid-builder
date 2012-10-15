define([
    "jquery"
  , "lib/util/widget/dropdimension"
  , "lib/util/ui"
],

function($, createDrop, ui) {

  return function(ctx) {
    var el, dimensions = [];
    function init(container) {
      el = container;
      ctx.on("chart.type.change", update);
      ctx.on("chart.dimension.add", appendDimension);
    };

    function update(type) {
      while(dimensions.length > 0)
      {
        var dimension = dimensions.pop();

        $(dimension.drop).off("add", dimension.add);
        $(dimension.drop).off("remove", dimension.remove);

        dimension.drop.destroy();
      }

      el.children("*").remove()
    }

    function appendDimension(info) {
      $(el).append('<div>'+info.name+'</div>');
      var options = {
          accept   : function(data) { return true }
        , multiple : info.max !== 1
        , format   : function(data) {
          return data.path.split("/").pop();
        }
      };
      var drop = createDrop(el, options), add, remove;
      $(drop).on("added", add = function(e, data) {
        ctx.trigger("chart.field.add", data, info);
      });
      $(drop).on("removed", remove = function(e, data) {
        ctx.trigger("chart.field.remove", data, info);
      });

      dimensions.push({ drop : drop, add : add, remove : remove });
//      el.append(drop);
    }

    ctx.on("view.editor.dimensions", init);
  };
});