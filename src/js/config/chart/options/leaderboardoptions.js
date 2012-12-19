define([

],

function() {
  return function(options, preferences) {
    preferences = preferences || {};

    options.push({
      name : "sort",
      group : "leaderboard",
      weight : 2,
      event : "options.chart.leaderboard.sort",
      editors : [{
        type : "expression",
        options : {
          default : ""
        }
      }]
    });

    options.push({
      name : "colorscale",
      label : "use colors",
      group : "aesthetic",
      weight : 0,
      event : "options.chart.leaderboard.colorscale",
      editors : [{
        type : "boolean",
        options : {
          default : false
        }
      }]
    });

    options.push({
      name : "usemax",
      label : "use max",
      group : "leaderboard",
      weight : 1,
      event : "options.chart.leaderboard.usemax",
      condition : {
        event   : "options.chart.leaderboard.displaybar",
        visible : function(value) {
          return !!value;
        }
      },
      editors : [{
        type : "boolean",
        options : {
          default : false
        }
      }]
    });

    options.push({
      name : "displaybar",
      label : "display meter",
      group : "leaderboard",
      weight : 0,
      event : "options.chart.leaderboard.displaybar",
      editors : [{
        type : "boolean",
        options : {
          default : true
        }
      }]
    });

    options.push({
      name  : "rank",
      event : "options.chart.label.rank",
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
      name  : "value",
      event : "options.chart.label.value",
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
  }
});