define([
    "jquery"
],

function($) {

  return function(ctx) {
    var map = {};
    function init(el) {
      // create containers
      // chart selection
      var $chartSelection = $('<div class="chart-selection-container"></div>');
      // dimensions container
      var $dimensions = $('<div class="dimensions-container"></div>');
      // options container
      var $options = $('<div class="options-container"></div>');
      // chart container
      var $chart = $('<div class="chart-container"></div>');

      el.append($chartSelection);
      el.append($dimensions);
      el.append($options);
      el.append($chart);
      ctx.trigger("view.editor.chartselector", $chartSelection);
      ctx.trigger("view.editor.dimensions", $dimensions);
      ctx.trigger("view.editor.options", $options);
      ctx.trigger("view.editor.chart", $chart);

      el.mousedown(function() { if(ReportGrid.tooltip) ReportGrid.tooltip.hide(); });
    }

    ctx.on("view.editor.pane", init);
  }
});