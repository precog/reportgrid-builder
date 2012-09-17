define([

],
function() {

  return function(o) {
    var fields = [];
    for(var field in o)
      if(o.hasOwnProperty(field))
        fields.push(field);
    return fields;
  };
});