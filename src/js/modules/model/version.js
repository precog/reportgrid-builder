define([],

function() {
  var VERSION = "0.9.3";
  return function(ctx) {
    ctx.provide("builder.version", VERSION);
  };
});