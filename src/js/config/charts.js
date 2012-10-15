define([
    "jquery"
  , "config/chart/barchart"
  , "config/chart/linechart"
  , "config/chart/piechart"
],

function($) {
  var charts = $.makeArray(arguments).slice(1);

  var map = {},
      groups = {},
      counter = 0;
  $.each(charts, function() {
    map[this.type] = this;
    this.index = counter++;
  });

  return {
    map : map,
    list : charts
  }
});