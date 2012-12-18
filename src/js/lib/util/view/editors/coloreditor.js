define([
    "jquery"
  , "lib/util/view/editors/editor"
  , "ext/jquery-minicolors/jquery.miniColors"
],

function($, createEditor) {
  return function(el, options) {
    options = $.extend({default : "" }, options);

    function validateColor(color) {
      return (/^(rgb\s*\(\s*[012]?[0-9]{1,2}\s*,\s*[012]?[0-9]{1,2}\s*,\s*[012]?[0-9]{1,2}\s*\)|#[0-9a-f]{3}([0-9a-f]{3})?)$/i).test(color);
    }

    var $input = $('<input type="text" class="color">'),
        $colors = $('<div class="color-list"></ul>');
    if(options.className)
      $input.addClass(options.className);
    var params = {
      input : $input,
      validate : options.validate || function(v) {
        var values = v.split(",").map(function(v) { return v.trim(); }).filter(function(v) { return v != ""; });
        for(var i = 0; i < values.length; i++) {
          if(!validateColor(values[i]))
            return "color at position " + i + " is invalid";
        }
        return null;
      },
      filter : options.filter || function(v) {
        return v.split(",").map(function(v) { return v.trim(); }).join(",");
      },
      set : function(value) {
        $input.val(value);
        $input.miniColors("value", value);
      }
    };


    var ed = createEditor(el, options, params);

    var timer;
    function delayed_refresh() {
      clearInterval(timer);
      timer = setTimeout(refresh, 500);
    }

    function refresh() {
      clearInterval(timer);
      if(ed.value.get() !== $input.val())
        $input.change();
    }

    $input.miniColors({
      change : delayed_refresh,
      close  : refresh
    });

    if(options.default)
    {
      ed.value.set(options.default);
//console.log("MINI", options.default);
//      $input.miniColors("value", options.default);
    }


    return ed;
  };
});