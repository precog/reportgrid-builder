define([],

function() {
  return function(options, preferences) {
    preferences = preferences || {};

    options.push({
      name  : "css",
      group : "aesthetic",
//      event : "chart.rgcss.load",
      event : "options.chart.css.palette.set",
      editors : [{
        type  : "rgcss",
        options : {
          default : ""
        }
      }]
    });
  };
});