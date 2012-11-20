define([
    "jquery"
  , "lib/util/grid"
],

function($, createGrid) {
  return function(ctx) {
    function init(el) {

    }

    ctx.on("theme.changing", function(theme) {
      menu.find('li[data-theme]').each(function() {
        if($(this).attr("data-theme") === theme) {
          $(this).addClass('ui-state-active');
        } else {
          $(this).removeClass('ui-state-active');
        }
      });
    });
  }
});