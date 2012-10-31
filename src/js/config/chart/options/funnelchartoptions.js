define([

],

function() {
  return function(options, preferences) {
    preferences = preferences || {};

    options.push({
      name : "sort",
      group : "funnelchart",
      weight : 0,
      event : "options.chart.funnelchart.sort",
      editors : [{
        type : "expression",
        options : {
          default : ""
        }
      }]
    });

    options.push({
      name : "arrowsize",
      label : "arrow size",
      group : "funnelchart",
      event : "options.chart.funnelchart.arrowsize",
      editors : [{
        type : "float",
        options : {
          default : 30,
          step : 10,
          min : 0
        }
      }]
    });

    options.push({
      name : "segmentpadding",
      label : "spacing",
      group : "funnelchart",
      event : "options.chart.funnelchart.segmentpadding",
      editors : [{
        type : "float",
        options : {
          default : 2.5,
          step : 1
        }
      }]
    });

    options.push({
      name : "flatness",
      label : "flatness",
      group : "funnelchart",
      event : "options.chart.funnelchart.flatness",
      editors : [{
        type : "float",
        options : {
          default : 1,
          step : 0.05,
          min : 0,
          max : 2
        }
      }]
    });

    options.push({
      name  : "effect",
      group : "funnelchart",
      weight : 0,
      event : "options.chart.funnelchart.effect",
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
      name : "datapoint",
      group : "label",
      event : "options.chart.label.datapoint",
      editors : [{
        type  : "boolean",
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
        type  : "boolean",
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