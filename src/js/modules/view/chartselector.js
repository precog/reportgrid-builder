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
        format : function(item) {
          return '<span class="chart-icon icon-'+item.type+'"></span><span class="text">'+item.label+'</span>';
        },
        width : 200
      });
      $(menu).on("select", function(e, data) {
        ctx.trigger("chart.type.change", data.type);
      });

      ctx.on("chart.type.change", function(type) {
        menu.selectIndex(charts.map[type].index);
      });
    }

    ctx.on("view.editor.chartselector", init);
  }
});