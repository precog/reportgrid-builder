define([
    "config/chart/streamgraphextractor"
  , "config/chart/streamgraphoptions"
],

function(extractor, applyOptions) {
  var chart = {
    type  : "streamgraph"
    , method : "streamGraph"
    , label : "Stream Graph"
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
      max  : null
    }, {
      name : "segment",
      min  : 0,
      max  : 1
    }],
    options : []
  };
  applyOptions(chart.options);
  return chart;
});