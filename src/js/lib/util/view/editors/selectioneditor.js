define([
    "jquery"
  , "lib/util/view/editors/editor"
],

function($, createEditor) {
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
  return function(el, options, ctx) {
    options = $.extend({ default : null, selectiontext : false, values : [] }, options);

    var subeditor,
        $subeditor = $('<div class="subeditor"></div>'),
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

    var lastIndex, subDefault;
    $input.on("change", function() {
      var value = $(this).val(),
          index = $(this).find('[value="'+value+'"]').attr("data-index"),
          einfo;
      if(index === lastIndex) return;
      lastIndex = index;
      require(["lib/util/view/editors/editors"], function (editors) {
        if(subeditor) {
          subeditor.destroy();
          $subeditor.children("*").remove();
          subeditor = null;
        }
        if("undefined" === typeof index || !(einfo = options.values[index].editor)) {
          $input.removeClass("with-editor");
          return;
        }
        $input.addClass("with-editor");
        var eoptions = $.extend({}, einfo.options, { default : value.split(":").pop() || einfo.options.default });
        subeditor = editors.create($subeditor, einfo.type, eoptions, ctx);
        function setSubValue() {
          var $o = $input.find('option[data-index="'+index+'"]'),
            value = $o.attr("value");
          value = value.substr(0, value.lastIndexOf(":")+1);
          $o.attr("value", value + subeditor.value.get());
          $input.trigger("change");
        }

        subeditor.value.on("value.change", setSubValue);
        setSubValue();
      });
    });

    params.set = function(v) {
      if(v === params.input.val()) return;
      var pos;
      subDefault = null;
      if(v && v.indexOf && (pos = v.indexOf(":")) >= 0) {
        var prefix = v.substr(0, pos+1);
        $input.find("option").each(function() {
          var $option = $(this),
              value = $option.attr("value");
          if(value.substr(0, prefix.length) !== prefix) {
            return true;
          }
          subDefault = v.substr(pos+1);
          $option.attr("value", v);
          params.input.val(v);
          $input.change();
          return false;
        });
      } else {
        params.input.val(v);
      }

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
    $input.trigger("change");
    return ed;
  };
});