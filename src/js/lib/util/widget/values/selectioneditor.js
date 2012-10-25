define([
    "jquery"
  , "lib/util/widget/values/editor"
],

function($, createEditor) {
  function createOptionElement(value, label) {
    var $el = $('<option>'+item.label+'</option>');
    if(value) {
      $el.attr("value", value);
    }
    return $el;
  }

  return function(el, options) {
    options = $.extend({ default : null, selecttext : "- select a value -", options : [] }, options);

    var $input = $('<select></select>');
    var params = {
      input : $input,
      validate : options.validate || function(v) { return null; },
      filter : options.filter || function(v) { return v.trim(); }
    };



    if(options.selecttext) {
      var $el = createOptionElement(null, options.selecttext);
      $input.append($el);
    }

    for(var i = 0; i < options.options.length; i++) {
      var item = options.options[i];
      var $el = createOptionElement(item.value, item.label);
      $input.append($el);
    }

    function removeSelectText() {
      if(!$input.val()) return;
      $input.not('option[value]').remove();
      $input.off("change", removeSelectText);
    }

    $input.on("change", removeSelectText);

    return createEditor(el, options, params);
  };
});