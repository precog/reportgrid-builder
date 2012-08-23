define([
    "jquery"
  , "util/ui"
],

function($, ui) {
  return function(ctx) {
    ctx.on("view.main.toolbar-main", function(e, el) {

    });
    ctx.on("view.main.toolbar-context", function(e, el) {
      ui.button(el, {
        icon : "ui-icon-gear",
        description : "about me"
      });
    });

    ctx.on("view.data.toolbar-description", function(e, el) {

    });
    ctx.on("view.data.toolbar-main", function(e, el) {
      ui.button(el, {
        icon : "ui-icon-disk",
        description : "about me"
      });
    });
    ctx.on("view.data.toolbar-context", function(e, el) {
      ui.button(el, {
        icon : "ui-icon-mail-closed",
        description : "about me"
      });
    });

    ctx.on("view.reports.toolbar-description", function(e, el) {

    });
    ctx.on("view.reports.toolbar-main", function(e, el) {
      ui.button(el, {
        icon : "ui-icon-plus",
        description : "about me"
      });
    });
    ctx.on("view.reports.toolbar-context", function(e, el) {
      ui.button(el, {
        icon : "ui-icon-minus",
        description : "about me"
      });
    });
  }
});