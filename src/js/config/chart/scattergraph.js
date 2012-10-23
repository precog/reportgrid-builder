define([
    "config/chart/scattergraphextractor"
  , "config/chart/scattergraphoptions"
],

function(extractor, applyOptions) {
  var chart = {
      type  : "scattergraph"
    , label : "Scatter Graph"
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
    }],
    options : []
  };
  applyOptions(chart.options);
  return chart;
});

// missing icon