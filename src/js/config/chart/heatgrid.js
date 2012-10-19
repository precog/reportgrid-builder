define([
  "config/chart/options/svgoptions"
],

function(osvg) {
  var chart = {
      type  : "heatgrid"
    , label : "Heat Map"
    , extractOptions : function(o, dimensions) {

    }
    , dimensions : [{
      name : "x",
      isaxis : true,
      min  : 1,
      max  : 1
    }, {
      name : "y",
      isaxis : true,
      min  : 1,
      max  : 1
    }],
    options : []
  };

  osvg(chart.options);

  return chart;
});