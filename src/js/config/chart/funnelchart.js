define([],

function() {

  return {
      type  : "funnelchart"
    , label : "Funnel Chart"
    , extractOptions : function(o, dimensions) {

    }
    , dimensions : [{
      name : "label",
      isaxis : true,
      min  : 1,
      max  : 1
    }, {
      name : "slice",
      isaxis : true,
      min  : 1,
      max  : 1
    }]
  }
});