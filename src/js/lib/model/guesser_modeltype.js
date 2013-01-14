define([
  "lib/model/guesser_valuetype"
],
function(type) {
  function appendField(ob, key, value) {
    var t = type.guess(value);
    if(false === value) return;
    ob[key] = t;
  }
  return {
    object : function(ob) {
      var map  = {};
      for(var key in ob) {
        if(!ob.hasOwnProperty(key)) continue;
        appendField(map, key, ob[key]);
      }
      return map;
    },
    increment : function(result, src) {
      for(var key in src) {
        if(!src.hasOwnProperty(key) || "undefined" !== typeof result[key]) continue;
        appendField(result, key, src[key])
      }
    },
    list : function(arr) {
      var len = arr.length;
      if(len === 0) return [];
      var result = this.object(arr[0]);
      for(var i = 1; i < len; i++) {
        this.increment(result, arr[i]);
      }

      var out = [];
      for(var key in result) {
        if(!result.hasOwnProperty(key)) continue;
        out.push({
          name  : key,
          field : key,
          type  : result[key]
        });
      }
      return out;
    }
  };
});

//{ name : "day", field:"time:day", type : "time" }