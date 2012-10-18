define([],

function() {

  return {
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
    }]
  }
});