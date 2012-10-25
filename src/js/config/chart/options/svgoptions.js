define([],

function() {
  return function(options, preferences) {
    preferences = preferences || {};
    options.push({
      name  : "title",
      event : "options.chart.title",
      group : "general",
      weight : -10,
      editors : [{
        type  : "template",
        options : {
          default : ""
        }
      }]
    });

    options.push({
      name  : "tooltip",
      event : "options.chart.datapointover",
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
      name  : "titleontop",
      label : "title on top",
      event : "options.chart.titleontop",
      group : "label",
      editors : [{
        type  : "bool",
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
      group : "general",
      weight : 10,
      event : "options.chart.width",
      editors : [{
        type  : "int",
        options : {
          min     : 0,
          max     : 3840,
          unit    : "px",
          default : preferences.width || 500
        }
      }]
    }, {
      name  : "height",
      group : "general",
      weight : 11,
      event : "options.chart.height",
      editors : [{
        type  : "int",
        options : {
          min     : 0,
          max     : 2400,
          unit    : "px",
          default : preferences.height || 250
        }
      }]
    });
  };
});