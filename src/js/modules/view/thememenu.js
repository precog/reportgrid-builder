define([
    "jquery"
  , "config/themes"
  , "lib/util/ui"
],

function($, themes, ui) {

  function build_items(ctx, menu, groups) {
    $.each(groups, function(key) {
      menu.append('<li class="ui-state-disabled ui-menu-item" role="presentation"><a href="#">'+key+' themes:</a></li>');
      $.each(this, function() {
        menu.append('<li data-theme="'+this.token+'" class="ui-menu-item" role="presentation"><a href="#">'+this.name+'</a></li>');
      })
    });
    menu.find("li[data-theme] a").each(function() {
      $(this).click(function() {
        var theme = $(this).parent().attr("data-theme");
        ctx.trigger("theme.change", theme);
      });
    });
  }

  return function(ctx) {
    var menu = ui.contextmenu('<div class="rg-widget settings-menu"></div>');
    build_items(ctx, menu.find("ul:first"), themes.groups);

    ctx.one("view.main.toolbar-context", function(el) {
      ui.button(el, {
        icon : "ui-icon-gear",
        description : "change theme"
      }).click(function() {
          var pos = $(this).offset(),
            w = $(this).outerWidth(),
            h = $(this).outerHeight();
          menu.css({
            position : "absolute",
            top : (pos.top + h) + "px",
            left : (pos.left + w - menu.outerWidth()) + "px"
          }).show();
      });
    });

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