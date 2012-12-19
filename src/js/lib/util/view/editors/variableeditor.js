define([
    "jquery"
  , "lib/model/variables"
  , "lib/util/view/editors/editor"
],

function($, variables, createEditor) {
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

  function clearOptions($input) {
    var value = $input.val();
    $input.children().remove();
    return value;
  }

  return function(el, options, ctx) {
    options = $.extend({ default : null, selectiontext : false, values : [] }, options);

    var accept = options.accept || variables.all(),
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

    function chart_datasource_change(datasource) {
      ctx.off("response.chart.datasource", chart_datasource_change);
      clearOptions($input);
      if(!datasource) return;
      createOptionElement("", "-").appendTo($input);
      var fields = datasource.fields || [];
      for(var i = 0; i < fields.length; i++) {
        var field = fields[i];
        if(accept.indexOf(field.type) < 0) continue;
        createOptionElement(field.field, field.name).appendTo($input);
      }
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
      var value = $(this).val(),
          index = $(this).find('[value="'+value+'"]').attr("data-index");
      if(index === lastIndex) return;
      lastIndex = index;
    });

    params.set = function(v) {
      if(v === params.input.val()) return;
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
        ctx.off("chart.datasource.change", chart_datasource_change);
        ctx.off("response.chart.datasource", chart_datasource_change);
      };
    }

    var ed = createEditor(el, options, params);
    $input.trigger("change");


    ctx.on("chart.datasource.change", chart_datasource_change);
    ctx.on("response.chart.datasource", chart_datasource_change);
    ctx.trigger("request.chart.datasource");

    return ed;
  };
});