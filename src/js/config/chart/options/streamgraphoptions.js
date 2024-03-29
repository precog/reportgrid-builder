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
      label : "effect",
      group : "aesthetic",
      event : "options.chart.streamgraph.effect",
      weight : 10,
      editors : [{
        type : "selection",
        options : {
          default : "gradientv:",
          values : [
              { value : "noeffect",   label : "none" }
            , { value : "gradientv:", label : "vertical gradient",   editor : { type : "float", options : { default : 0.75 } } }
            , { value : "gradienth:", label : "horizontal gradient", editor : { type : "float", options : { default : 0.75 } } }
          ]
        }
      }]
    });

    options.push({
      label : "interpolation",
      group : "streamgraph",
      event : "options.chart.streamgraph.lineinterpolation",
      weight : 0,
      editors : [{
        type : "selection",
        options : {
          default : "cardinal:",
          values : [
            { value : "linear" },
            { value : "basis" },
            { value : "cardinal:", label : "cardinal", editor : { type : "float", options : { default : 0.75, step : 0.05  } } },
            { value : "monotone" },
            { value : "step" },
            { value : "stepafter", label : "step after" },
            { value : "stepbefore", label : "step before" }
          ]
        }
      }]
    });
  };
});