define([],

function() {

  return function(o, dimensions) {
    if(dimensions.segment) {
      var segment = o.segment || (o.segment = {});
      segment.on = dimensions.segment[0].name;
    }
  }
});