define([
    "jquery"
  , "text!templates/layout.full.html"

  , 'ext/jquery-ui/jquery.ui'
  , "ext/jquery-layout/jquery.layout"
],

function($, tplLayout) {
  var toolbarMainHeight = 38,
      toolbar = {
          resizable : false
        , closable : false
        , slidable : false
        , size: 36
        , spacing_open: 0
        , spacing_closed: 0
      },
      toolbarDouble = {
          resizable : false
        , closable : false
        , slidable : false
        , size: 50
        , spacing_open: 0
        , spacing_closed: 0
      };

  return function(ctx) {
    var layouts = [],
        $container;

    function create(el, o) {
      layouts.push(el.layout(o, {
        defaults : {
            initClosed : false
          , resizable : true
          , slidable : true
        }
      }));
    }

    function resize() {
      var $parent = $container.parent();
      $container.css({
        position : "absolute",
        width : $parent.innerWidth() + "px",
        height : $parent.innerHeight() + "px"
      });
    }

    function refresh() {
      for(var i = 0; i < layouts.length; i++) {
        layouts[i].resizeAll();
      }
    }

    function themechanged() {
      if(!$container) {
        clearInterval(this.killTimer);
        killTimer = setTimeout(init, 20);
        return;
      }
      refresh();
    }

    function init(el) {
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
            size : 240
          , initClosed : false
        }
      });

      create($container.find('.reports'), {
        north : toolbarDouble
      });

      create($container.find('.main'));



      create($container.find('.builder'), {
        north : toolbar
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

      // trigger events
      ctx.trigger("view.main.toolbar-main", $container.find(".mainbar .toolbar-main"));
      ctx.trigger("view.main.toolbar-context", $container.find(".mainbar .toolbar-context"));

      ctx.trigger("view.reports.pane", $container.find(".reports"));
      ctx.trigger("view.reports.toolbar-description", $container.find(".reports .toolbar-description"));
      ctx.trigger("view.reports.toolbar-main", $container.find(".reports .toolbar-main"));
      ctx.trigger("view.reports.toolbar-context", $container.find(".reports .toolbar-context"));

      ctx.trigger("view.support.pane", $container.find(".main .support"));

      ctx.trigger("view.editor.pane", $container.find(".main .editor"));
      ctx.trigger("view.editor.tabs", $container.find(".builder .tabs-container"));
      ctx.trigger("view.editor.toolbar-context", $container.find(".builder .toolbar-context:first"));

      $(window).resize(resize);

      setTimeout(refresh, 100);

      var $overlay = $('<div class="overlay"></div>');
      $el.append($overlay);
      $overlay.css({
        display : "block",
        position : "absolute",
        width : $el.outerWidth() + "px",
        height : $el.outerHeight() + "px",
        backgroundColor : "rgba(50,50,50,0.75)",
        zIndex : 100000
      });
      setTimeout(function() {
        $overlay.remove();
      }, 1000);
    }

    ctx.on("view.container.ready", init);
    ctx.on("theme.changed", themechanged);
  };
});