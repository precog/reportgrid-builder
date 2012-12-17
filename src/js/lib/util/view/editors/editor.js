define([
  "jquery",
  "lib/model/value"
],

function($, createValue) {
  return function(el, options, params) {
    var editor;

    if(!params.set) {
      params.set = function(v) {
        params.input.val(v);
      };
    }

    if(!params.get) {
      params.get = function() { return params.input.val(); };
    }

    if(!params.validate) {
      params.validate = function() { return null; };
    }

    if(!params.filter) {
      params.filter = function(v) { return v; };
    }

    if(!params.destroy) {
      params.destroy = function() {
        params.input.off("change", params.onchange);
        params.onchange = null;
      };
    }

    if(!params.wireChange) {
      params.wireChange = function() {
        params.input.on("change", params.onchange);
      };
    }

    if(options.placeholder) {
      params.input.attr("placeholder", options.placeholder);
    }

    $('<div class="control-container"><span class="control"></span><span class="unit"></span></div><div class="error" style="display:none;">error goes here</div>').appendTo(el);
    params.input.appendTo(el.find(".control"));
    if(options.title)
      params.input.attr("title", options.title);
    var error = el.find(".error");
    if(options.unit) {
      el.find(".unit").html(options.unit);
      if(options.title)
        el.find(".unit").attr("title", options.title);
    }

    var value = createValue(options.default, params.validate, params.filter);
    function input_change() {
      value.set(params.get());
    }

    function value_change(value) {
      params.set(value);
      error.hide();
    }

    function value_validationError(err) {
      error.html(err);
      error.show();
    }

    params.onchange = input_change;
    value.on("value.change", value_change);
    value.on("value.validationError", value_validationError);

    params.wireChange();

    params.set(options.default);

    return editor = {
      value   : value,
      el      : el,
      params  : params,
      destroy : function() {
        params.destroy();
        value.destroy();
//        value.off("value.change", value_change);
//        value.off("value.validationError", value_validationError);
        el.children("*").remove();
      }
    };
  };
});