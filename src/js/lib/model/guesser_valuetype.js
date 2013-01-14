define([],
/*
 continuous
 time
 discrete
 ordinal ?
 category
 data
*/
function() {

  return {
    guess : function(value) {
      if(null === value || "undefined" === typeof value)
        return false;
      if("string" === typeof value) {
        // time, category
        return "category";
      } else if("number" === typeof value) {
        // time, continuous, discrete
        if(Math.round(value) == value)
          return "discrete";
        else
          return "continuous";
      } else if("boolean" === typeof value) {
        return "category";
      } else {
        return "data";
      }
    }
  };
});