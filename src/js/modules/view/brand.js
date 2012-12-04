define([
  "jquery"
],

function () {
  return function(ctx) {
    function init(el) {
        el.append($('<img src="images/logo.png" alt="ReportGrid - Builder (beta)">'));
    }

    ctx.one("view.main.toolbar-main", init);
  }
});