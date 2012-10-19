define([
  "config/chart/options/svgoptions"
],

function(osvg) {
  var chart = {
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
    }],
    options : []
  };

  osvg(chart.options);

  return chart;
});