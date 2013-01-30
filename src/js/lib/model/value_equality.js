define([],


function() {
  function fields(o) {
    var r = [];
    for(var key in o) {
      if(!o.hasOwnProperty(key)) continue;
      r.push(key);
    }
    return r;
  }


  var test = function (a, b) {
    try {
      if(a instanceof Date) {
          return a.getTime() === b.getTime();
      } else if(a instanceof Array) {
        if(a.length !== b.length)
          return false;
        for(var i = 0; i < a.length; i++) {
          if(!test(a[i], b[i]))
            return false;
        }
        return true;
      } else if(a instanceof Object) {
        var fa = fields(a),
            fb = fields(b);
        if(!test(fa, fb))
          return false;
        for(var i = 0; i < fa.length; i++) {
          if(test(a[fa[i]], b[fa[i]])) {
            return false;
          }
        }
        return true;
      }
      return a === b;
    // object
    // array
    } catch(e) {
        return false;
    }
  };

  return function(a, b) {
    return test(a, b);
  };
});