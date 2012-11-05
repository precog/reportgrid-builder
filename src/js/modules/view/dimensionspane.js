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
    }

    function updateDataSource(source) {
      datasource = source;
      var $select = $fields.find("select");
      $select.find("option.value").remove();
      $select.attr("disabled", false);
      $(source.fields.list).each(function() {
        var $option = $('<option class="value '+this.type+'">'+this.name+'</option>');
        $select.append($option);
      });
    }

    function appendDimension(info) {
      $fields.append('<div class="name">'+(info.label || info.name)+'</div>');
      var $div = $('<div class="dimension"></div>').appendTo($fields),
          $select = $('<select></select>').appendTo($div);
      $select.attr("disabled", true);
      if(info.min === 0) {
        $select.append('<option value="" class="optional">[optional]</option>');
      } else {
        $select.append('<option value="" class="mandatory">[select]</option>');
      }
      $select.on("change", function() {
        ctx.trigger("chart.field.add", datasource.fields.map[$(this).val()], info);
      });
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