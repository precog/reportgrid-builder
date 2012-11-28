define([
  "lib/util/widget/values/editor"
],

function(createEditor) {
  return function(el, options) {
    options = $.extend({default : null }, options);
    var $input = $('<input type="file" class="string">');
    if(options.className)
      $input.addClass(options.className);
    var params = {
      input : $input,
      validate : options.validate || function(v) { return null; },
      filter : options.filter || function(v) { return v; },
      get : function() {
        var list = params.input[0].files;
        if(list.length === 0)
          return null;
        else
          return list[0];
      },
      set : function(v) {
        // do nothing
      }
    };

    return createEditor(el, options, params);
  };
});