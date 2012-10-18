define([],

function() {

  return {
      type  : "heatgrid"
    , label : "Heat Map"
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