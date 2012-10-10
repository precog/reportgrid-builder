define([
    "jquery"
  , "config/themes"
],

function ($, themes) {
  var UI_BASE_THEME_URL = "css/jquery-ui/";

  function themeUrl(name) {
    return UI_BASE_THEME_URL + name + "/jquery-ui.css";
  }

  function pollCSS(url, callback) {
    function poll() {
      try {
        var sheets = document.styleSheets;
        for(var j=0, k=sheets.length; j<k; j++) {
          if(sheets[j].href == url) {
            sheets[j].cssRules;
          }
        }
        // If you made it here, success!
        setTimeout(callback, 0);
      } catch(e) {
        // Keep polling
        setTimeout(poll, 20);
      }
    };
    poll();
  }

  function setUITheme(name, callback) {
    var url = themeUrl(name),
      cssLink = $('<link href="'+url+'" type="text/css" rel="stylesheet" class="ui-theme" />');
    if($.browser.safari) {
      // no onload event
      pollCSS(url, callback);
    } else {
      cssLink.on("load", callback);
    }
    $("head").append(cssLink);

    if( $("link.ui-theme").size() > 3){
      $("link.ui-theme:first").remove();
    }
  }

  return function(ctx) {
    var current;
    ctx.on("theme.change", function(theme) {
      if(current === theme) return;
      current = theme;
      ctx.trigger("theme.changing", theme);
      setUITheme(themes.map[theme].ui, function() {
        ctx.trigger('view.theme.changed', theme);
      });
    });
  }
})