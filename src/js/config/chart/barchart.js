define([
    "config/chart/extract/segmentextract"
  , "config/chart/extract/barchartextract"
  , "config/chart/options/svgoptions"
  , "config/chart/options/barchartoptions"
],

function(esegment, ebarchart, osvg, obarchart) {
  var chart = {
      type  : "barchart"
    , label : "Bar Chart"
    , extractOptions : function(o, dimensions, options) {
      esegment(o, dimensions);
      ebarchart(o, options);
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
      max  : null
    }, {
      name : "segment",
      min  : 0,
      max  : 1
    }],
    options : []
  };

  osvg(chart.options);
  obarchart(chart.options);

  return chart;
});