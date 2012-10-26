define([
    "jquery"
  , "config/chart/barchart"
  , "config/chart/linechart"
  , "config/chart/streamgraph"
  , "config/chart/funnelchart"
  , "config/chart/heatgrid"
  , "config/chart/leaderboard"
  , "config/chart/pivottable"
  , "config/chart/scattergraph"
  , "config/chart/piechart"
],

  // geo
  // sankey
  // dimensions for pivottable

function($) {
  var charts = $.makeArray(arguments).slice(1);

  var map = {},
      groups = {},
      counter = 0;
  $.each(charts, function() {
    map[this.type] = this;
    this.index = counter++;
  });

  return {
    map : map,
    list : charts
  }
});