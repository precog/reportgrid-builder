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
      }
    };


    var ed = createEditor(el, options, params);
    /*
    $('<div class="colors-container"></div>').insertAfter(el.find('.control-container')).append($colors);
    ed.value.on("value.change", function(colors) {
      $colors.children("*").remove();
      $.each(colors.split(","), function() {
        var color = this,
            $cin = $('<input type="hidden">');
        $colors.append($cin);
        $cin.miniColors({
          close : function(hex, rgb) {
            var s = [];
            $colors.find("input").each(function() {
              var val = $(this).val();
              if(val.substr(1,3) === val.substr(4))
                val = val.substr(0, 4);
              s.push(val);
            });
            ed.value.set(s.join(","));
          }
        }).miniColors("value", color);
      });
    });
    */

    $input.miniColors();

    if(options.default)
      ed.value.set(options.default);

    return ed;
  };
});