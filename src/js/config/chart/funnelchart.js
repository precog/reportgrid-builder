define([
    "config/chart/funnelchartextractor"
  , "config/chart/funnelchartoptions"
],

function(extractor, applyOptions) {
  var chart = {
      type  : "funnelchart"
    , method : "funnelChart"
    , label : "Funnel Chart"
    , extractOptions : extractor()
    , dimensions : [{
      name : "slice",
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