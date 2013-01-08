define([
    "config/chart/geoextractor"
  , "config/chart/geooptions"
],

function(extractor, applyOptions) {
  var chart = {
      type   : "geo"
    , method : "geo"
    , label  : "Geographic Chart"
    , extractOptions : extractor()
    , dimensions : [{
      name   : "feature",
      isaxis : true,
      min    : 1,
      max    : 1
    }, {
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