define([
  "jquery"
],

function() {
  return function(ctx) {
    $(function() {
      var container = $("body");
      ctx.provide("view.container.ready", container);
    });
  };
});