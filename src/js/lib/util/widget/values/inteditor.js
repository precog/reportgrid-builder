define([
  "lib/util/widget/values/editor"
],

function(createEditor) {
  return function(el, options) {
    var defaults = {
      default : 0
    };

    var $input = $('<input type="number" step="1">');
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

    $input.val(options.default);
    if("undefined" !== typeof options.min) {
      $input.attr("min", options.min);
    }
    if("undefined" !== typeof options.max) {
      $input.attr("max", options.max);
    }

    $input.on("change", function() {
      params.onchange();
    });

    return createEditor(el, options, params);
  };
});