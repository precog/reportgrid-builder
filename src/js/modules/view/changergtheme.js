define([
  "jquery"
],

function($) {

  return function(ctx) {
    function changecharttheme(theme) {
//      $("head").find('link[href="https://api.reportgrid.com/css/rg-charts.css"]').remove();
      $("head").find('link.custom-rg-css').remove();
      $("head").append('<link rel="stylesheet" class="custom-rg-css" href="https://api.reportgrid.com/css/colors/'+theme+'">');
console.log("THEME", theme);
    }
    ctx.on("options.chart.rgcss", changecharttheme);
  }
});