define([

],

function() {
  return {
    diff : function(a1, a2) {
      return a1.filter(function(i) {return !(a2.indexOf(i) > -1);});
    },
    remove : function(arr, el) {
      var index = arr.indexOf(el);
      if(index < 0) return false;
      arr.splice(index, 1);
      return true;
    }
  }
});