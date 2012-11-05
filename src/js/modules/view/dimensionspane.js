define([
    "jquery"
  , "config/ui"
  , "lib/util/ui"
],

function($, uiconfig, ui) {
  return function(ctx) {
    var el,
        $fields,
        datasource;

    function updateChartType(type) {
      $fields.children("*").remove();
      if(datasource)
        setTimeout(function() {
          updateDataSource(datasource);
        }, 200);
    }

    function updateDataSource(source) {
      datasource = source;
      var $select = $fields.find("select");
      $select.find(".value").remove();
      $select.attr("disabled", false);
      if($select.find(".optional").length === 0)
        $select.prepend('<option value="" class="mandatory">[select]</option>');
      $(source.fields.list).each(function() {
        var $option = $('<option class="value '+this.type+'">'+this.name+'</option>');
        $select.append($option);
      });
    }

    function createSelect($container, info) {
      var $select = $('<select></select>').appendTo($container);
      $select.attr("disabled", true);
      if(info.min === 0) {
        $select.append('<option value="" class="optional">[optional]</option>');
      } else {
        $select.append('<option value="" class="mandatory">[select]</option>');
      }
      var lastval;
      $select.on("change", function() {
        var val = $(this).val();
        if(val == "") {
          ctx.trigger("chart.field.remove", datasource.fields.map[lastval], info)
        } else {
          ctx.trigger("chart.field.add", datasource.fields.map[val], info);
        }
        if($(this).val() == "") {
          $select.find(".optional").text("[optional]");
        } else {
          $select.find(".optional").text("[remove]");
        }
        $select.find(".mandatory").remove();
        lastval = val;
      });

      return $select;
    }

    function appendDimension(info) {
      $fields.append('<div class="name">'+(info.label || info.name)+'</div>');
      var $div = $('<div class="dimension"></div>').appendTo($fields);
      createSelect($div, info);
    }

    function init(container) {
      el = container;

      $fields = $('<div class="fields"></div>');
      $fields.appendTo(el);

      ctx.on("chart.type.change", updateChartType);
      ctx.on("chart.datasource.change", updateDataSource);
      ctx.on("chart.dimension.add", appendDimension);
    }

    ctx.on("view.editor.dimensions", init);
  };
});