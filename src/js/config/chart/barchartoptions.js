define([
    "config/chart/options/applier"
  , "config/chart/options/alloptions"
  , "config/chart/options/svgoptions"
  , "config/chart/options/barchartoptions"
],

function(applier) {
  var toapply = $.makeArray(arguments).slice(1);
  return function(options) {
    applier(toapply, options);
  };
});