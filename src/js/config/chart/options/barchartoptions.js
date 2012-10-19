define([

],

function() {
  return function(options, preferences) {
    preferences = preferences || {};
    options.push({
      name  : "horizontal",
      type  : "bool",
      event : "options.chart.barchart.horizontal",
      options : {
        default : false
      }
    });
    options.push({
      name  : "stacked",
      type  : "bool",
      event : "options.chart.barchart.stacked",
      options : {
        default : true
      }
    });
  }
});