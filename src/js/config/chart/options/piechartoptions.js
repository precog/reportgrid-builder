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
        type  : "boolean",
        options : {
          default : true
        }
      }, {
        type  : "template",
        options : {
          default : "",
          variables : ["stats"],
          useDimensions : true
        }
      }]
    });

    options.push({
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

    options.push({
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
      label : "effect",
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
      label : "sort",
      group : "piechart",
      weight : 0,
      event : "options.chart.piechart.sort",
      editors : [{
        type : "expression",
        options : {
          default : "",
          variables : ["a", "b"],
          useDimensions : false,
          placeholder : "=compare(a.value,b.value)"
        }
      }]
    });
  };
});