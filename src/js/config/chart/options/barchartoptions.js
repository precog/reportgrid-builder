define([

],

function() {
  return function(options, preferences) {
    preferences = preferences || {};
    options.push({
      name  : "horizontal",
      event : "options.chart.barchart.horizontal",
      editors : [{
        type  : "bool",
        options : {
          default : false
        }
      }]
    });
    options.push({
      name  : "stacked",
      event : "options.chart.barchart.stacked",
      editors : [{
        type  : "bool",
        options : {
          default : true
        }
      }]
    });
    options.push({
      name  : "labelhorizontal",
      label : "horizontal labels",
      event : "options.chart.barchart.labelhorizontal",
      editors : [{
        type  : "bool",
        options : {
          default : true
        }
      }]
    });
  }
});