define([

],

function() {
  return function(options, preferences) {
    preferences = preferences || {};
    /*
     options.push({
     name  : "horizontal",
     group : "barchart",
     event : "options.chart.barchart.horizontal",
     editors : [{
     type  : "bool",
     options : {
     default : false
     }
     }]
     });
     */



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
  }
});