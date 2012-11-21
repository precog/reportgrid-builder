define([
  "lib/util/widget/values/editor"
],

function(createEditor) {
  return function(el, options) {
    options = $.extend({default : null }, options);
console.log("text", JSON.stringify(options));
    var $input = $('<textarea class="text"></textarea>');
    if(options.className)
      $input.addClass(options.className);
    var params = {
      input : $input,
      validate : options.validate || function(v) { return null; },
      filter : options.filter || function(v) { return v.trim(); }
    };

    return createEditor(el, options, params);
  };
});