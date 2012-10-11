define([
  "jquery"
],

function($) {
  var charts = [{
      type  : "piechart"
    , label : "Pie Chart"
  }, {
      type  : "barchart"
    , label : "Bar Chart"
  }, {
      type  : "linechart"
    , label : "Line Chart"
  }];

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