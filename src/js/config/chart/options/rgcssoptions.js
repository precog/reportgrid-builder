define([],

function() {
  return function(options, preferences) {
    preferences = preferences || {};

    options.push({
      name  : "rgcss",
      group : "general",
      event : "chart.rgcss.load",
      editors : [{
        type  : "rgcss",
        options : {
          default : ""
        }
      }]
    });
  };
});