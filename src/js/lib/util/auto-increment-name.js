define([],

function() {
  var trailing_pattern = "(\\d+)$";
  return function(s, prefix) {
    prefix = prefix || " ";

    var m = new RegExp(prefix + trailing_pattern, "").exec(s);
    if(null !== m) {
      return s.replace(new RegExp(prefix + m[1] + "$"), prefix + (parseInt(m[1]) + 1));
    } else {
      return s + prefix + "1";
    }
  }
});