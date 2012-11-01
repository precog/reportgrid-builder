define([],

function() {
  return function(options, preferences) {
    preferences = preferences || {};

    options.push({
      name : "color",
      group : "general",
      weight : -1000,
      editors : [{
        type : "colorslist",
        options : {
          default : ""
        }
      }]
    })
  };
});