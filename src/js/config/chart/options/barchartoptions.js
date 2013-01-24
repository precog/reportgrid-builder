define([

],

function() {
  return function(options, preferences) {
    preferences = preferences || {};

    options.push({
      label : "datapoint",
      group : "label",
      event : "options.chart.label.datapoint",
      editors : [{
        type  : "template",
        options : {
          default : "",
          variables : ["stats"],
          useDimensions : true
        }
      }]
    });
    
    options.push({
      label  : "horizontal",
      group : "barchart",
      event : "options.chart.barchart.horizontal",
      editors : [{
        type  : "boolean",
        options : {
          default : false
        }
      }]
    });

    options.push({
      label  : "stacked",
      group : "barchart",
      weight : -10,
      event : "options.chart.barchart.stacked",
      editors : [{
        type  : "boolean",
        options : {
          default : true
        }
      }]
    });

    options.push({
      label : "start at",
      group : "barchart",
      weight : -10,
      event : "options.chart.barchart.startproperty",
      editors : [{
        type  : "variable",
        options : {
          default : ""
        }
      }]
    });

    options.push({
      label  : "effect",
      group : "aesthetic",
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

    options.push({
      label : "for bars",
      group : "barpadding",
      weight : 0,
      event : "options.chart.barchart.barpadding",
      editors : [{
        type : "float",
        options : {
          default : 12,
          step : 1,
          min : 0
        }
      }]
    });

    options.push({
      label : "for data",
      group : "barpadding",
      weight : 0,
      event : "options.chart.barchart.barpaddingdatapoint",
      editors : [{
        type : "float",
        options : {
          default : 2,
          step : 1,
          min : 0
        }
      }]
    });

    options.push({
      label : "for axes",
      group : "barpadding",
      weight : 0,
      event : "options.chart.barchart.barpaddingaxis",
      editors : [{
        type : "float",
        options : {
          default : 4,
          step : 1,
          min : 0
        }
      }]
    });
  };
});