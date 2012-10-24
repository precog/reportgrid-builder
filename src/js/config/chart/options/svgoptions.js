define([],

function() {
  return function(options, preferences) {
    preferences = preferences || {};
    options.push({
      name  : "title",
      event : "options.chart.title",
      editors : [{
        type  : "string",
        options : {
          default : ""
        }
      }]
    });
    options.push({
      name  : "titleontop",
      label : "title on top",
      event : "options.chart.titleontop",
      editors : [{
        type  : "bool",
        options : {
          default : true
        }
      }]
    });
    options.push({
      name  : "width",
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