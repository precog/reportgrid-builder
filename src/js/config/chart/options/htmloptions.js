define([],

function() {
  return function(options, preferences) {
    preferences = preferences || {};
    options.push({
      name  : "tooltip",
      event : "options.chart.label.datapointover",
      group : "label",
      weight : -10,
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
      name : "datapoint",
      group : "label",
      event : "options.chart.label.datapoint",
      editors : [{
        type  : "template",
        options : {
          default : ""
        }
      }]
    });
  };
});