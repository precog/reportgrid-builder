define([],

function() {

  return {
      type  : "scattergraph"
    , label : "Scatter Graph"
    , requiredAxes : 2
    , dimensions : [{
      name : "x",
      min  : 1,
      max  : 1
    }, {
      name : "y",
      min  : 1,
      max  : 1
    }]
  }
});

// missing icon