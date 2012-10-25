define([
    "jquery"
  , "lib/util/widget/values/editor"
],

function($, createEditor) {
//console.log("EDITORS", editors, arguments);
  function createOptionElement(value, label, index) {
    if(!label) label = value;
    var $el = $('<option>'+label+'</option>');
    if(value) {
      $el.attr("value", value);
    } else {
      $el.addClass("selection-text");
    }
    if("undefined" !== typeof index)
      $el.attr("data-index", index);
    return $el;
  }
/*
  function createSubEditor(el, info) {
    editors.create(el, info.type, info.options);
  }
*/
  return function(el, options) {
    options = $.extend({ default : null, selectiontext : false, values : [] }, options);

    var subeditor,
        $subeditor = $('<div style="position:absolute;right:0;top:0"></div>'),
        $input = $('<select></select>'),
        params = {
      input : $input,
      validate : options.validate || function(v) { return null; },
      filter : options.filter || function(v) { return v.trim(); }
    };

    function removeSelectText() {
      if(!$input.val()) return;
      $input.find('option.selection-text').remove();
      $input.off("change", removeSelectText);
    }

    if(options.selectiontext) {
      var $el = createOptionElement(null, options.selectiontext);
      $input.append($el);
      $input.on("change", removeSelectText);
    }

    $(options.values).each(function(i) {
      var $el = createOptionElement(this.value, this.label, i);
      $input.append($el);
    });

    var lastIndex;
    $input.on("change", function() {
      var index = $(this).find('[value="'+$(this).val()+'"]').attr("data-index"),
          einfo;
      if(index === lastIndex) return;
      lastIndex = index;
      require(["lib/util/widget/values/editors"], function (editors) {
        if(subeditor) {
          subeditor.destroy();
          $subeditor.children("*").remove();
        }
        if("undefined" === typeof index || !(einfo = options.values[index].editor)) {
          $input.removeClass("with-editor");
          return;
        }
        $input.addClass("with-editor");
        subeditor = editors.create($subeditor, einfo.type, einfo.options);
        subeditor.value.on("value.change", function() {
          var $o = $input.find('option[data-index="'+index+'"]'),
              value = $o.attr("value");
          value = value.substr(0, value.lastIndexOf(":")+1);
          $o.attr("value", value + subeditor.value.get());
          $input.trigger("change");
        });
      });
    });

    params.set = function(v) {
      params.input.val(v);
    };
    params.get = function() {
      return params.input.val();
    };
    params.validate = function() {
      return null;
    };
    params.filter = function(v) {
      return v;
    };


    if(!params.destroy) {
      params.destroy = function() {
        params.input.off("change", params.onchange);
        params.onchange = null;
      };
    }

    var ed = createEditor(el, options, params);
    el.append($subeditor);
    return ed;
  };
});