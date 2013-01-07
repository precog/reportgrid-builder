define([
    "config/chart/sankeyextractor"
  , "config/chart/sankeyoptions"
],

function(extractor, applyOptions) {
  var chart = {
      type   : "sankey"
    , method : "sankey"
    , label  : "Sankey"
    , extractOptions : extractor()
    , dimensions : [{
      name   : "value",
      isaxis : true,
      min    : 1,
      max    : 1
    }],
    options : []
  };
  applyOptions(chart.options);
  return chart;
});