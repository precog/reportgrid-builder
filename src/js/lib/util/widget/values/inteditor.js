define([
  "jquery",
  "lib/model/value"
],

function($, createValue) {
  return function(el, options) {
    var editor;

console.log(JSON.stringify(options));
    options = $.extend({
      default : 0
    }, options);
console.log(JSON.stringify(options));


    $('<div></dvi><span class="control"></span><span class="unit"></span></div><div class="error" style="display:none;">error goes here</div>').appendTo(el);
    var input = $('<input type="number" step="1">').appendTo(el.find(".control")),
        error = el.find(".error");
    input.val(options.default);
    if("undefined" !== typeof options.min) {
      input.attr("min", options.min);
    }
    if("undefined" !== typeof options.max) {
      input.attr("max", options.max);
    }
    if(options.unit) {
      el.find(".unit").html(options.unit);
    }

    var value = createValue(options.default,
      function(v) {
console.log("VALIDATE", v, options.min, ("undefined" !== typeof options.min), options.min > v);
        if(""+parseInt(v) !== ""+v)
          return "must be an integer value";
        v = parseInt(v);
        if(("undefined" !== typeof options.min) && options.min > v)
          return "must be at least " + options.min;
        if(("undefined" !== typeof options.max) && options.max < v)
          return "must be no more than " + options.max;
        return null;
      },
      function(v) {

console.log("FILTER", v);
        return parseInt(v);
      }
    );

    function input_change() {
      value.set(input.val());
    }

    function value_change(value) {
      input.val(value);
      error.hide();
    }

    function value_validationError(err) {
console.log("VALIDATION ERROR", err);
      error.html(err);
      error.show();
    }

    input.on("change", input_change);
    value.on("value.change", value_change);
    value.on("value.validationError", value_validationError);

    return editor = {
      value : value,
      el    : el,
      input : input,
      destroy : function() {
        input.off("change", input_change);
        value.off("value.change", value_change);
        value.off("value.validationError", value_validationError);
        el.children("*").remove();
      }
    };
  };
});