define([
    "jquery"
  , "lib/util/ui"
  , "config/charts"
],


function($, ui, charts) {

  return function(ctx) {
    function init(el) {
      var menu = ui.selectmenu(el, {
        data : charts.list,
        labelWidth : 160,
        position : {
          menu : "left bottom",
          at : "left bottom"
        },
        format : function(item) {
          return '<span class="chart-icon icon-'+item.type+'"></span><span class="text">'+item.label+'</span>';
        }
      });
      $(menu).on("select", function(e, data) {
        ctx.provide("chart.type.change", data.type);
      });

      ctx.on("chart.type.change", function(type) {
        menu.selectIndex(charts.map[type].index, true);
      });

      setTimeout(function() {
        ctx.provide("chart.type.change", "barchart");
        $(menu).on("select", function(e, data) {
          ctx.trigger("user.chart.type", data.type);
        });
      }, 100);
    }

    ctx.on("view.editor.chartselector", init);
  }
});