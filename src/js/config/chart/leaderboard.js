define([
    "config/chart/leaderboardextractor"
  , "config/chart/leaderboardoptions"
],

function(extractor, applyOptions) {
  var chart = {
      type  : "leaderboard"
    , method : "leaderBoard"
    , label : "Leaderboard"
    , extractOptions : extractor()
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
  applyOptions(chart.options);
  return chart;
});