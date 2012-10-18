define([],

function() {

  return {
      type  : "funnelchart"
    , label : "Funnel Chart"
    , requiredAxes : 2
    , dimensions : [{
      name : "label",
      min  : 1,
      max  : 1
    }, {
      name : "slice",
      min  : 1,
      max  : 1
    }]
  }
});