define([

],

function() {
  return function(options, preferences) {
    preferences = preferences || {};

    options.push({
      name : "sort",
      group : "leaderboard",
      weight : 0,
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
      group : "leaderboard",
      weight : 0,
      event : "options.chart.leaderboard.colorscale",
      editors : [{
        type : "bool",
        options : {
          default : false
        }
      }]
    });

    options.push({
      name : "usemax",
      label : "use max",
      group : "leaderboard",
      weight : 0,
      event : "options.chart.leaderboard.usemax",
      editors : [{
        type : "bool",
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
        type : "bool",
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
      name  : "value",
      event : "options.chart.label.value",
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
  }
});