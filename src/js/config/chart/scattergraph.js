define([],

function() {

  return {
      type  : "scattergraph"
    , label : "Scatter Graph"
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

// missing icon