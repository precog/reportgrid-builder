define([
    "jquery"
  , "lib/util/ui"
  , "lib/util/widget/values/editor"
  , "config/rgcolors"
],

function($, ui, createEditor, rgcolors) {
  return function(el, options) {
    options = $.extend({default : "" }, options);

    var menu = ui.selectmenu(el, {
      data : rgcolors,
      format : function(item) {
        var label = item.name.substr(10).split(".").shift() + "&nbsp;";
        $.each(item.colors, function() {
          label += '<span class="minipalette" style="background-color: '+this+'"></span>';
        });
        return '<span class="text" data-css="'+item.name+'">'+label+'</span>';
      },
      width : 320
    });
    var $input = $('<input type="text" class="string">');

    $(menu).on("select", function(e, data, c) {
console.log("EDITOR", data.name);
      $input.val(data.name);
      $input.change();
    });

    if(options.className)
      $input.addClass(options.className);
    var params = {
      input : $input,
      validate : options.validate || function(v) { return null; },
      filter : options.filter || function(v) { return v.trim(); }
    };

    return createEditor(el, options, params);
  };
});