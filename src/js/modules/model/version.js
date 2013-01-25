define([],

function() {
  var VERSION = "0.9.1";
  return function(ctx) {
    ctx.provide("builder.version", VERSION);
  };
});