define([

],

function() {

  return {
      type  : "pivottable"
    , label : "Pivot Table"
    , requiredAxes : 3
    , dimensions : [{
        name : "columns",
        min  : 1,
        max  : null
      }, {
        name : "rows",
        min  : 1,
        max  : null
      }, {
        name : "value",
        min  : 1,
        max  : null
      }]
  }
});

// TODO ignoring column/row position