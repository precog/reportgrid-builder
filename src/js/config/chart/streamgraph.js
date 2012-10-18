define([

],

  function() {

    return {
      type  : "streamgraph"
      , label : "Stream Graph"
      , requiredAxes : 2
      , dimensions : [{
        name : "x",
        min  : 1,
        max  : 1
      }, {
        name : "y",
        min  : 1,
        max  : null
      }]
    }
  });