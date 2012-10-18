define([

],

function() {

  return {
      type  : "piechart"
    , label : "Pie Chart"
    , extractOptions : function(o, dimensions) {

    }
    , dimensions : [{
        name : "label",
        isaxis : true,
        min  : 1,
        max  : 1
      }, {
        name : "measure",
        isaxis : true,
        min  : 1,
        max  : 1
      }]
  }
});