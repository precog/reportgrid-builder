define([
    "jquery"
  , "lib/util/dispatcher"
],
function($, createDispatcher) {
  return function(modules) {
    var ctx = createDispatcher(true);

    ctx.debug = false;
    ctx.log = function() {};
    ctx.addModule = function(module) {
      module(ctx);
    };
    ctx.addModules = function(modules) {
      modules = modules || [];
      $(modules).each(function() {
        this(ctx);
      });
    };

    ctx.addModules(modules);
    return ctx;
  };
});
