define([
    "lib/util/widget/values/editor"
],

function(createEditor) {
  return function(el, options) {
    options = $.extend({default : 0 }, options);

    var $input = $('<input type="number" step="'+(options.step || '1')+'" class="int">');

    var params = {
      input : $input,
      validate : function(v) {
        if(""+parseInt(v) !== ""+v)
          return "must be an integer value";
        v = parseInt(v);
        if(("undefined" !== typeof options.min) && options.min > v)
          return "must be at least " + options.min;
        if(("undefined" !== typeof options.max) && options.max < v)
          return "must be no more than " + options.max;
        return null;
      },
      filter : function(v) {
        return parseInt(v);
      }
    };

    if("undefined" !== typeof options.min) {
      $input.attr("min", options.min);
    }
    if("undefined" !== typeof options.max) {
      $input.attr("max", options.max);
    }

    return createEditor(el, options, params);
  };
});