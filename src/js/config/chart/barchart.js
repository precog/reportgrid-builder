define([
  "config/chart/extract/extractsegment"
],

function(esegment) {

  return {
      type  : "barchart"
    , label : "Bar Chart"
    , extractOptions : function(o, dimensions) {
      esegment(o, dimensions);
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
    }]
  }
});