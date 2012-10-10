define([

],

function() {
  return function(a, b) {
      return a < b ? -1 : (a > b) ? 1 : 0;
  }
});