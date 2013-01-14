define([

],

function() {
  return function(options, preferences) {
    preferences = preferences || {};

    options.push({
      label : "sort",
      group : "leaderboard",
      weight : 2,
      event : "options.chart.leaderboard.sort",
      editors : [{
        type : "expression",
        options : {
          default : "",
          variables : ["a", "b"],
          useDimensions : false,
          placeholder : "=compare(a.value,b.value)"
        }
      }]
    });

    options.push({
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
      label : "rank",
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
          variables : ["index", "stats"],
          useDimensions : true
        }
      }]
    });

    options.push({
      label : "value",
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
  };
});