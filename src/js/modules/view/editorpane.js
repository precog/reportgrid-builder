define([
    "jquery"
  , "text!templates/layout.editor.html"

  , 'ext/jquery-ui/jquery.ui'
  , "ext/jquery-layout/jquery.layout"
],

function($, tplEditor) {

  return function(ctx) {
    var map = {};
    function init(el) {
      var $layout = $(tplEditor).appendTo(el),
          $splitter = el.find(".chart-splitter"),
          $chart = el.find(".chart-container"),
          $dimensions = el.find(".dimensions-container"),
          $options = el.find(".options-container");

      el.layout({
        east : {
            size : 300
          , initClosed : false
          , resizable: false
          , closable : false
          , slidable : false
          , spacing_open : 0
        }
      });

      $splitter.layout({
        south : {
            size : 200
          , initClosed : false
          , resizable: false
          , closable : false
          , slidable : false
          , spacing_open : 0
        }
      });

      ctx.trigger("view.editor.chartselector", $dimensions);
      ctx.trigger("view.editor.dimensions", $dimensions);
      ctx.trigger("view.editor.options", $options);
      ctx.trigger("view.editor.chart", $chart);
/*
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
*/

/*
      ctx.trigger("view.editor.chartselector", $chartSelection);
      ctx.trigger("view.editor.dimensions", $dimensions);
      ctx.trigger("view.editor.options", $options);
      ctx.trigger("view.editor.chart", $chart);
*/
      el.mousedown(function() { if(ReportGrid.tooltip) ReportGrid.tooltip.hide(); });
    }

    ctx.on("view.editor.pane", init);
  }
});