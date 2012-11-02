define([
  "jquery"
],

function($) {

  return function(ctx) {
    var timer;
    function poll(callback) {
      clearInterval(timer);
      if($("head").find('link.custom-rg-css').length > 0) {
        setTimeout(callback, 500);
      } else {
        timer = setTimeout(function() { poll(callback); }, 50);
      }
    }
    function changecharttheme(theme) {
//      $("head").find('link[href="https://api.reportgrid.com/css/rg-charts.css"]').remove();
      $("head").find('link.custom-rg-css').remove();
      $("head").append('<link rel="stylesheet" class="custom-rg-css" href="https://api.reportgrid.com/css/colors/'+theme+'">');
      poll(function() {
        ctx.trigger("chart.rgcss.loaded", theme);
      });
    }
    ctx.on("chart.rgcss.load", changecharttheme);
  }
});