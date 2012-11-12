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
      name : "labelradius",
      label : "label",
      group : "piechartposition",
      event : "options.chart.piechart.labelradius",
      editors : [{
        type : "float",
        options : {
          default : 0.45,
          step : 0.05,
          min : 0,
          max : 1
        }
      }]
    });

    options.push({
      name : "outerradius",
      label : "external",
      group : "piechartposition",
      event : "options.chart.piechart.outerradius",
      editors : [{
        type : "float",
        options : {
          default : 0.9,
          step : 0.05,
          min : 0,
          max : 1
        }
      }]
    });

    options.push({
      name : "innerradius",
      label : "internal",
      group : "piechartposition",
      event : "options.chart.piechart.innerradius",
      editors : [{
        type : "float",
        options : {
          default : 0.0,
          step : 0.05,
          min : 0,
          max : 1
        }
      }]
    });

    options.push({
      name : "tooltipradius",
      label : "tooltip",
      group : "piechartposition",
      event : "options.chart.piechart.tooltipradius",
      editors : [{
        type : "float",
        options : {
          default : 0.5,
          step : 0.05,
          min : 0,
          max : 1
        }
      }]
    });

    options.push({
      name : "dontfliplabel",
      label : "don't flip",
      group : "label",
      event : "options.chart.piechart.dontfliplabel",
      editors : [{
        type  : "boolean",
        options : {
          default : true
        }
      }]
    });
/*
    options.push({
      name : "overradius",
      label : "over",
      group : "piechartposition",
      event : "options.chart.piechart.overradius",
      editors : [{
        type : "float",
        options : {
          default : 0.95,
          step : 0.05,
          min : 0,
          max : 1
        }
      }]
    });
*/
    options.push({
      name : "labelorientation",
      label : "orientantion",
      group : "label",
      event : "options.chart.piechart.labelorientation",
      editors : [{
        type : "selection",
        options : {
          default : "aligned",
          values : [
              { value : "aligned", label : "aligned" }
            , { value : "orthogonal", label : "orthogonal" }
            , { value : "fixed:0", label : "fixed", editor : { type : "float", options : { default : 0, step : 5} } }
          ]
        }
      }]
    });

    options.push({
      name  : "effect",
      group : "aesthetic",
      weight : 0,
      event : "options.chart.piechart.effect",
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
      name : "sort",
      group : "piechart",
      weight : 0,
      event : "options.chart.piechart.sort",
      editors : [{
        type : "expression",
        options : {
          default : ""
        }
      }]
    });
  }
});