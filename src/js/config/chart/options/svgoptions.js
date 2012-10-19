define([],

function() {
  return function(options, preferences) {
    preferences = preferences || {};
    options.push({
      name  : "width",
      type  : "int",
      event : "options.chart.width",
      options : {
        min     : 0,
        max     : 3840,
        unit    : "px",
        default : preferences.width || 500
      }
    }, {
      name  : "height",
      type  : "int",
      event : "options.chart.height",
      options : {
        min     : 0,
        max     : 2400,
        unit    : "px",
        default : preferences.height || 250
      }
    });
  };
});