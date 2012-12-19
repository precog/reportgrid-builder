define([],

function() {
  return function(options, preferences) {
    preferences = preferences || {};
    options.push({
      name  : "title",
      event : "options.chart.label.title",
      group : "general",
      weight : -10,
      editors : [{
        type  : "template",
        options : {
          default : "",
          variables : ["axes", "values", "types"],
          placeholder : ""
        }
      }]
    });

    options.push({
      name  : "tooltip",
      event : "options.chart.label.datapointover",
      group : "label",
      weight : -10,
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
      name  : "titleontop",
      label : "title on top",
      event : "options.chart.titleontop",
      group : "label",
      editors : [{
        type  : "boolean",
        options : {
          default : true
        }
      }],
      condition : {
        event   : "options.chart.title",
        visible : function(value) {
          return value !== '';
        }
      }
    });

    options.push({
      name  : "width",
      label : "size",
      group : "general",
      className : "inline first",
      weight : 10,
      event : "options.chart.width",
      editors : [{
        type  : "int",
        options : {
          min     : 0,
          step    : 25,
          default : preferences.width || 500
        }
      }]
    });

    options.push({
      name  : "height",
      label : " x ",
      group : "general",
      className : "inline last",
      weight : 11,
      event : "options.chart.height",
      editors : [{
        type  : "int",
        options : {
          min     : 0,
          step    : 25,
          default : preferences.height || 250
        }
      }]
    });
  };
});