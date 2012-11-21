define([
  "lib/util/widget/values/editor"
],

function(createEditor) {
  return function(el, options) {
    options = $.extend({default : null }, options);
    console.log("file", JSON.stringify(options));
    var $input = $('<input type="file" class="string">');
    if(options.className)
      $input.addClass(options.className);
    var params = {
      input : $input,
      validate : options.validate || function(v) { return null; },
      filter : options.filter || function(v) { return v; }
    };

    return createEditor(el, options, params);
  };
});