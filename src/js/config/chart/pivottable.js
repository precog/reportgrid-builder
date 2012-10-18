define([

],

function() {

  return {
      type  : "pivottable"
    , label : "Pivot Table"
    , extractOptions : function(o, dimensions) {

    }
    , dimensions : [{
        name : "columns",
        isaxis : true,
        min  : 1,
        max  : null
      }, {
        name : "rows",
        isaxis : true,
        min  : 1,
        max  : null
      }, {
        name : "value",
        isaxis : true,
        min  : 1,
        max  : null
      }]
  }
});

// TODO ignoring column/row position