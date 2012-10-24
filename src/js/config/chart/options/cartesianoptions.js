define([

],

function() {
  return function(options, preferences) {
    preferences = preferences || {};
    options.push({
      name  : "displayrules",
      event : "options.chart.cartesian.displayrules",
      editors : [{
        type  : "bool",
        options : {
          default : false
        }
      }, {
        type  : "expression",
        options : {
          default : ""
        }
      }]
    });
  }
});