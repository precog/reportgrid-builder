define([
    "config/chart/options/applier"
  , "config/chart/options/alloptions"
  , "config/chart/options/rgcssoptions"
  , "config/chart/options/cartesianoptions"
  , "config/chart/options/svgoptions"
  , "config/chart/options/scattergraphoptions"
],

function(applier) {
  var toapply = $.makeArray(arguments).slice(1);
  return function(options) {
    applier(toapply, options);
  };
});