define([

],

function() {
  var chart = {
      type  : "leaderboard"
    , label : "Leaderboard"
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
    }],
    options : []
  };

  return chart;
});