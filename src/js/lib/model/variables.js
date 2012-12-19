define([],

function() {
  var variables = ["discrete", "continuous", "category", "time"];
  return {
    all : function() {
      return variables.slice(0, variables.length);
    }
  }
});