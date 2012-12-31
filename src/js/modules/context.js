define([
    "jquery"
  , "lib/util/dispatcher"
],
function($, createDispatcher) {
  return function() {
    var ctx = createDispatcher(true);

    ctx.debug = false;
    ctx.log = function() {};

    return ctx;
  };
});
