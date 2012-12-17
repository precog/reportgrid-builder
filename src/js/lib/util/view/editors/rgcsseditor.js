define([
    "jquery"
  , "lib/util/ui"
  , "lib/util/view/editors/editor"
  , "config/rgcolors"
],

function($, ui, createEditor, rgcolors) {
  return function(el, options) {
    options = $.extend({default : "" }, options);

    var menu = ui.selectmenu(el, {
      id : function(a, b) {
        return a === b.data.name;
      },
      data : rgcolors,
      format : function(item) {
        var label = '<span class="tiny">' + item.name.substr(10).split(".").shift() + "</span>&nbsp;";
        $.each(item.colors, function() {
          label += '<span class="minipalette" style="background-color: '+this+'"></span>';
        });
        return '<span class="text" data-css="'+item.name+'">'+label+'</span>';
      },
      width : 320
    });
    var $input = $('<input type="hidden" class="string">');

    function menu_select(e, data) {
      $input.val(data.name);
      $input.change();
    }

    $(menu).on("select", menu_select);

    if(options.className)
      $input.addClass(options.className);
    var params = {
          input : $input,
          validate : options.validate || function(v) { return null; },
          filter : options.filter || function(v) { return v.trim(); },
          set : function(v) {
            params.input.val(v);
            menu.selectValue(v);
          }
        };

    var ed = createEditor(el, options, params);
    el.find(".control-container").hide();
    return ed;
  };
});