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
      label : "css",
      group : "aesthetic",
      event : "options.chart.css.palette.set",
      condition : {
        event : "options.chart.heatgrid.color",
        visible : function(value) {
          return value && value.substr(0, 3) === "css";
        }
      },
      editors : [{
        type  : "rgcss",
        options : {
          default : ""
        }
      }]
    });

    options.push({
      label : "color",
      group : "aesthetic",
      event : "options.chart.heatgrid.color",
      className : "multiline",
      editors : [{
        type  : "selection",
        options : {
          default : "css",
          values : [
              { value : "css", label : "from css" },
              { value : "css:1", label : "first css color" },
              { value : "interpolated:", label : "interpolated", editor : { type : "colorlist", options : { default : "#fff,#000" } } },
              { value : "sequence:", label : "sequence", editor : { type : "colorlist", options : { default : "#fff,#777,#000" } } }
          ]
        }
      }]
    });
  };
});