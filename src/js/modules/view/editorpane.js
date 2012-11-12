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
            size : 100
          , initClosed : false
          , resizable: false
          , closable : false
          , slidable : false
          , spacing_open : 0
        }
      });

     var $selectors = $('<div class="selectors pane"></div>').appendTo($dimensions);
      ctx.trigger("view.editor.chartselector", $('<div class="chartselector-container"></div>').appendTo($selectors));
      ctx.trigger("view.editor.datasourceselector", $('<div class="dataosurceselector-container"></div>').appendTo($selectors));
      ctx.trigger("view.editor.dimensions", $('<div class="pane dimensionsoptions-container"></div>').appendTo($dimensions));
      ctx.trigger("view.editor.options", $options);
      ctx.trigger("view.editor.chart", $chart);

      el.mousedown(function() { if(ReportGrid.tooltip) ReportGrid.tooltip.hide(); });
    }

    ctx.on("view.editor.pane", init);
  }
});