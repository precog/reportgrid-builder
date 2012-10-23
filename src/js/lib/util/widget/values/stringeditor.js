define([
  "lib/util/widget/values/editor"
],

function(createEditor) {
  return function(el, options) {
    options = $.extend({default : "hello" }, options);

    var $input = $('<input type="text">');
    var params = {
      input : $input,
      validate : options.validate || function(v) { return null; },
      filter : options.filter || function(v) { return v.trim(); }
    };

    return createEditor(el, options, params);
  };
});