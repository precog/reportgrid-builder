define([
  "lib/util/widget/values/editor"
],

function(createEditor) {
  return function(el, options) {
    options = $.extend({ default : false }, options);

    var $input = $('<input type="checkbox" value="true">');
    var params = {
      input : $input,
      get : function() {
        return $input.prop("checked");
      },
      set : function(v) {
        $input.prop("checked", v);
      },
      validate : function(v) {
        if("string" === typeof v) {
          v = v.toLowerCase();
          switch(v) {
            case "on", "off", "true", "false":
              return null;
            default:
              return v+" is not an acceptable bool value";
          }
        }
        return null;
      },
      filter : function(v) {
        return v === "true" || v === "on" || v === 1 || !!v;
      }
    };

    return createEditor(el, options, params);
  };
});