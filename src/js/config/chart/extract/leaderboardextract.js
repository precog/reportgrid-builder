define([
  "config/chart/extract/ensure"
],

function(ensure) {
  return function(o, dimensions, options) {
    if("undefined" !== typeof options["leaderboard.sort"] && options["leaderboard.sort"])
      o.sort = options["leaderboard.sort"];

    if("undefined" !== typeof options["leaderboard.colorscale"] && options["leaderboard.colorscale"])
      o.colorscale = options["leaderboard.colorscale"];

    if("undefined" !== typeof options["leaderboard.usemax"] && options["leaderboard.usemax"])
      o.usemax = options["leaderboard.usemax"];

    if("undefined" !== typeof options["leaderboard.displaybar"] && !options["leaderboard.displaybar"])
      o.displaybar = options["leaderboard.displaybar"];

    if("undefined" !== typeof options['label.rank']) {
      if(false === options['label.rank']) {
        ensure('label',o).rank = function() {return null;};
      } else if("string" === typeof options['label.rank']) {
        ensure('label',o).rank = options['label.rank'];
      }
    }

    if("undefined" !== typeof options['label.value']) {
      if(false === options['label.value']) {
        ensure('label',o).value = function() {return null;};
      } else if("string" === typeof options['label.value']) {
        ensure('label',o).value = options['label.value'];
      }
    }
  }
});