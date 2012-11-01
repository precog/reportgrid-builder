define([
    "jquery"
  , "lib/util/widget/values/editor"
  , "ext/jquery-colorpicker/colorpicker"
],

function($, createEditor) {
  return function(el, options) {
    options = $.extend({default : "" }, options);

    function validateColor(color) {
      return (/^(rgb\s*\(\s*[012]?[0-9]{1,2}\s*,\s*[012]?[0-9]{1,2}\s*,\s*[012]?[0-9]{1,2}\s*\)|#[0-9a-f]{3}([0-9a-f]{3})?)$/i).test(color);
    }

    var $input = $('<input type="text" class="string">'),
        $colors = $('<ul class="color-list"></ul>');
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
    $('<div class="colors-container"></div>').insertAfter(el.find('.control-container')).append($colors);
    ed.value.on("value.change", function(colors) {
      $colors.find("li").remove();
console.log(colors);
      $(colors.split(",")).each(function() {
console.log(this);
        var $li = '<li class="color" style="background-color:'+this+'"></li>';
        $colors.append($li);
//        $li.colorPicker();
      });
    });

    return ed;
  };
});