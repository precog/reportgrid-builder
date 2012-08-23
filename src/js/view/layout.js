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
      refresh();
    }

    function refresh() {
      for(var i = 0; i < layouts.length; i++) {
        layouts[i].resizeAll();
      }
      var res = $container.find(".builder .ui-layout-resizer.ui-layout-resizer-south.ui-layout-resizer-open.ui-layout-resizer-south-open.ui-widget-shadow");
      if(!this.bottom) this.bottom = parseInt(res.css("bottom"));
      res.css("bottom", (this.bottom + 2) + "px");
    }

    function init(e, el) {
      var $el = $(el);
      $el.css({
        position : "relative",
        padding  : 0
      });
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
        north : toolbarDouble
      });

      create($container.find('.reports'), {
        north : toolbarDouble
      });

      create($container.find('.main'), {
        east : {
            size : "20%"
          , initClosed : false
          , minSize : 200
          , maxSize : 600
          , maskIframesOnResize : true
        }
      });

      create($container.find('.builder'), {
        south : {
            size : 200
          , closable : false
        }
      });

      $container.addClass("ui-widget-content")
        .find(".pane")
        .addClass("ui-widget-content");
      $container.find(".ui-layout-toggler")
        .mouseenter(function() { $(this).addClass("ui-state-hover"); })
        .mouseleave(function() { $(this).removeClass("ui-state-hover"); })
        .addClass("ui-widget-header");
      $container.find(".ui-layout-resizer")
        .addClass("ui-widget-shadow");
      $container.find(".ui-layout-resizer-dragging")
        .addClass("ui-state-hover")
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