define([
    "config/chart/barchartextractor"
  , "config/chart/barchartoptions"
],

function(extractor, applyOptions) {
  var chart = {
      type  : "barchart"
    , label : "Bar Chart"
    , extractOptions : extractor
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
console.log(applyOptions);
  applyOptions(chart.options);
  /*
  $.each($.makeArray(arguments).slice(0), function() {
    this(chart.options);
  });
*/
  return chart;
});