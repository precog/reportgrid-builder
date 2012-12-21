define([],

function() {
  var variables = ["category", "continuous", "data", "discrete", "ordinal", "time"];
  return {
    all : function() {
      return variables.slice(0, variables.length);
    }
  }
});