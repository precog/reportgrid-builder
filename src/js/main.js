requirejs.config({
  shim : {
      'lib/jquery-ui/jquery.ui'         : ['jquery']
    , 'lib/jquery-layout/jquery.layout' : ['lib/jquery-ui/jquery.ui']
  }
});
require([
    "jquery"
  , "model/config"
  , "view/theme"
  , "view/layout"
],
function($, config, theme, layout) {
  var modules = $(arguments).slice(1);

  function createContext() {
    return $({});
  }

  function builder() {
    var ctx = createContext();

    $(modules).each(function() {
      this(ctx);
    });

    ctx.trigger("modules.loaded");
    ctx.trigger("view.container.ready", $(this));
    ctx.trigger("app.ready");
  }

  $(function() {
    var selection = $("body");
    selection.each(builder);
  });
});