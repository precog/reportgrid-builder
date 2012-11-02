define([
    "jquery"
  , "config/ui"
  , "lib/util/widget/dropdimension"
  , "lib/util/ui"
],

function($, uiconfig, createDrop, ui) {

  return function(ctx) {
    var el,
        $fields,
        dimensions = [];
    function init(container) {
      el = container;

      $fields = $('<div class="fields"></div>');
      $fields.appendTo(el);

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

      $fields.children("*").remove()
    }

    function appendDimension(info) {
      $fields.append('<div class="name">'+(info.label || info.name)+'</div>');
      var options = {
          accept   : function(data) { return true }
        , multiple : info.max !== 1
        , format   : function(data) {
          return data.path.split("/").pop();
        }
      };
      var drop = createDrop($fields, options), add, remove;
      $(drop).on("added", add = function(e, data) {
        ctx.trigger("chart.field.add", data, info);
      });
      $(drop).on("removed", remove = function(e, data) {
        ctx.trigger("chart.field.remove", data, info);
      });

      dimensions.push({ drop : drop, add : add, remove : remove });

//      ui.snapHeight($fields, uiconfig.fieldsetGridSnapping);
    }

    ctx.on("view.editor.dimensions", init);
  };
});