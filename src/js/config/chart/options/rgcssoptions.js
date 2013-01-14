define([],

function() {
  return function(options, preferences) {
    preferences = preferences || {};

    options.push({
      label : "css",
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