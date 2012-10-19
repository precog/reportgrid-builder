define([],

function() {
  return function(options, preferences) {
    preferences = preferences || {};
    options.push({
      name  : "title",
      type  : "string",
      event : "options.chart.title",
      options : {
        default : ""
      }
    });
    options.push({
      name  : "titleontop",
      label : "title on top",
      type  : "bool",
      event : "options.chart.titleontop",
      options : {
        default : true
      }
    });
  };
});