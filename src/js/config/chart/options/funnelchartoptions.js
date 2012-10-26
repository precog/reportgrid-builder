define([

],

function() {
  return function(options, preferences) {
    preferences = preferences || {};

    options.push({
      name : "datapoint",
      group : "label",
      event : "options.chart.label.datapoint",
      editors : [{
        type  : "bool",
        options : {
          default : true
        }
      }, {
        type  : "template",
        options : {
          default : ""
        }
      }]
    });

    options.push({
      name : "arrow",
      group : "label",
      event : "options.chart.label.arrow",
      editors : [{
        type  : "bool",
        options : {
          default : true
        }
      }, {
        type  : "template",
        options : {
          default : ""
        }
      }]
    });
  };
});