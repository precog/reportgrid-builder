define([
    "lib/util/widget/values/editor"
],

function(createEditor) {
  return function(el, options) {
    options = $.extend({default : "" }, options);

    var $input = $('<input type="text" class="expression">');

    var params = {
      input : $input,
      validate : options.validate || function(v) {
        return (""+v).substr(0, 1) === "=" ? null : "an expression must begin with =";
      },
      filter : options.filter || function(v) {
        if("string" === typeof v)
          return v.trim();
        return "="+v;
      }
    };

    return createEditor(el, options, params);
  };
});