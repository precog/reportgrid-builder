define([

],

function() {
  return function(options, preferences) {
    preferences = preferences || {};
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

    options.push({
      name  : "stacked",
      group : "barchart",
      weight : -10,
      event : "options.chart.barchart.stacked",
      editors : [{
        type  : "bool",
        options : {
          default : true
        }
      }]
    });

    options.push({
      name  : "effect",
      group : "barchart",
      weight : 0,
      event : "options.chart.barchart.effect",
      editors : [{
        type  : "selection",
        options : {
          default : "gradient",
          values : [
              { value : "noeffect", label : "none" }
            , { value : "gradient", label : "gradient" }
            , { value : "gradient:1.25", label : "custom gradient", editor : { type : "float", options : { default : 1.25, min : -10, max : 10 } } }
          ]
        }
      }]
    });
  }
});