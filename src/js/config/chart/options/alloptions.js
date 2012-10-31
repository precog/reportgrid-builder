define([],

function() {
  return function(options, preferences) {
    preferences = preferences || {};

    options.push({
      name  : "rgcss",
      group : "general",
      event : "options.chart.rgcss",
      editors : [{
        type  : "rgcss",
        options : {
          default : ""
        }
      }]
    });
  };
});