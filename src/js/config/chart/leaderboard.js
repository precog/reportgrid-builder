define([

],

function() {

  return {
      type  : "leaderboard"
    , label : "Leaderboard"
    , requiredAxes : 2
    , dimensions : [{
        name : "label",
        min  : 1,
        max  : 1
      }, {
        name : "measure",
        min  : 1,
        max  : 1
      }]
  }
});