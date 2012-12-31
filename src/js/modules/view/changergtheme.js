define([
  "jquery"
],

function($) {

  return function(ctx) {
    var timer, current;
    function poll(callback) {
      clearInterval(timer);
      if($("head").find('link.custom-rg-css').length > 0) {
        setTimeout(callback, 1000);
      } else {
        timer = setTimeout(function() { poll(callback); }, 50);
      }
    }
    function change_chart_theme(theme) {
      if(current === theme) return;
      current = theme;
//      $("head").find('link[href="https://api.reportgrid.com/css/rg-charts.css"]').remove();
      $("head").find('link.custom-rg-css').remove();
      if(!theme) return;
      $("head").append('<link rel="stylesheet" class="custom-rg-css" href="https://api.reportgrid.com/css/colors/'+theme+'">');
      poll(function() {
        ctx.trigger("chart.rgcss.loaded", theme);
      });
    }
    ctx.on("chart.rgcss.load", change_chart_theme);
  }
});