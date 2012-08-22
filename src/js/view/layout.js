define([
    "jquery"
  , "text!templates/layout.full.html"
  , "lib/jquery-layout/jquery.layout"
],

function($, tplLayout) {
  var toolbarMainHeight = 38,
      toolbarHeight = 36,
      doubleBar = 50,
      statusbarHeight = 24,
      defaults = {
          initClosed : false
        , resizable : true
        , slidable : true
      },
      toolbar = {
          resizable : false
        , closable : false
        , slidable : false
        , size: toolbarHeight
        , spacing_open: 0
        , spacing_closed: 0
      },
      toolbarDouble = {
          resizable : false
        , closable : false
        , slidable : false
        , size: doubleBar
        , spacing_open: 0
        , spacing_closed: 0
      };

  return function(ctx) {
    var layouts = [],
        $container;

    function create(el, o) {
      layouts.push(el.layout(o, {
        defaults : defaults
      }));
    }

    function resize() {
      var $parent = $container.parent();
      $container.css({
        position : "absolute",
        width : $parent.innerWidth() + "px",
        height : $parent.innerHeight() + "px"
      });
console.log("RESIZE");

    }

    function refresh() {
console.log("...REFRESH");
      for(var i = 0; i < layouts.length; i++) {
        layouts[i].resizeAll();
      }
    }

    function init(e, el) {
      var $el = $(el);
      $el.css({
        position : "relative",
        padding  : 0
      })
//        .addClass("ui-layout-container ui-widget-content")
      ;
      if($el.is("body")) {
        $el.css({
          margin   : 0,
          width    : "100%",
          height   : "100%",
          overflow : "hidden",
          border   : "none"
        });
        $el.parent().css({
          height   : "100%",
          overflow : "hidden"
        });
      }
      $container = $(tplLayout);

console.log("build layout");
      $el.append($container);

      resize();
      create($container, {
        north : $.extend({}, toolbar, { size : toolbarMainHeight }),
        west : {
            size : 200
          , initClosed : false
        }
      });

      create($container.find('.system'), {
        south : {
            size : "50%"
          , initClosed : false
        }
      });

      create($container.find('.data'), {
        south : {
          north : toolbarDouble
        }
      });

      create($container.find('.reports'), {
        south : {
          north : toolbarDouble
        }
      });

      create($container.find('.main'), {
        east : {
            size : "15%"
          , initClosed : false
        }
      });

      create($container.find('.builder'), {
        south : {
            size : "40%"
          , maxSize : 800
          , minSize : 305 // "240px"
          , initClosed : false
          , maskIframesOnResize : true
        }
      });

      /*

       // editor-support separation
       layouts.push($container.find('.builder').layout({
       defaults : defaults,
       east : {
       size : "40%"
       , maxSize : 800
       , minSize : 305 // "240px"
       , initClosed : false
       , maskIframesOnResize : true
       }
       }));

       // editor separation
       layouts.push($container.find('.editor').layout({
       defaults : defaults,
       south : statusbar
       }));
       */

      $container.addClass("ui-widget-content")
        .find(".pane")
        .addClass("ui-widget-content")
        .find(".ui-layout-toggler")
        .mouseenter(function() { $(this).addClass("ui-state-hover"); })
        .mouseleave(function() { $(this).removeClass("ui-state-hover"); })
        .addClass("ui-widget-header")
      ;

      refresh();
      $(window).resize(resize);
    }

    function themechanged() {
      if(!$container) {
        clearInterval(this.killTimer);
        killTimer = setTimeout(init, 20);
        return;
      }
      refresh();
    }

    ctx.on("view.container.ready", init);
    ctx.on("view.theme.changed", themechanged);
  };
});