define([
    "config/chart/heatgridextractor"
  , "config/chart/heatgridoptions"
],

function(extractor, applyOptions) {
  var chart = {
      type  : "heatgrid"
    , method : "heatGrid"
    , label : "Heat Map"
    , extractOptions : extractor()
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
    }, {
      name : "value",
      isaxis : true,
      min  : 1,
      max  : 1
    }],
    options : []
  };
  applyOptions(chart.options);
  return chart;
});