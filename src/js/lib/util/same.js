define([
  "lib/util/fields"
],

function(fields) {
  var same = function(a, b) {
    // array
    if(a instanceof Array) {
      if(!b instanceof Array) return false;
      if(a.length != b.length) return false;
      for(var i = 0; i < a.length; i++) {
        if(!same(a[i], b[i]))
          return false;
      }
      return true;
    }
    // object
    if("object" === typeof a) {
      if("object" !== typeof b) return false;
      var fa = fields(a),
          fb = fields(b);
      if(!same(fa, fb))
        return false;
      for(var i = 0; i < fa.length; i++) {
        if(!same(a[fa[i]], b[fb[i]]))
          return false;
      }
      return true;
    }
    // primitve
    return a === b;
  };
    return same;
})