define([
    "jquery"
  , "lib/util/same"
],

function($, same) {
  function extractNodeData(node)
  {
    var data = $(node).attr("data-drag");
    if(!data)
      return null;
    else
      return JSON.parse(data);
  }

  function extractDragData(e, ui) {
    return ($(ui.item).attr("data-drag") && extractNodeData($(ui.item))) || ($(e.srcElement).closest("[data-drag]") && extractNodeData($(e.srcElement).closest("[data-drag]")));
  }

  var trashbin = (function() {
    var bin, el, $trash, visible, context;

     function init(target) {
       if(el) return;
       el = $('<div class="rg-dimension-trashbin"><ul style="background-color: transparent; border: 0;" class="dimension-receptor dimension-trash ui-state-default"></ul></div>');
       $trash = el.find("ul").sortable({
           placeholder: "dimension-placeholder ui-state-error"
         , connectWith : ".dimension-receptor"
       });
       $trash.disableSelection();
       el.css("visibility", "hidden");
       target.closest(".editor").append(el);
     }

     return bin = {
       associateTo : function($target) {
         var pos   = $target.position(),
         width = $target.outerWidth();
         el.css({
           left : (pos.left + 10 + width) +"px",
           top  : pos.top + "px"
         });
         el.css("visibility", "visible");
         visible = true;
         $trash.sortable("refresh");
       },
       remove : function() {
         if(!visible) return;
           visible = false;
         el.css("visibility", "hidden");
       },
       init : function(el) {
         init(el);
       }
     };
   })();

  return function (el, o) {
    trashbin.init(el);

    o = $.extend({
      accept   : function(data) { return true },
      multiple : false,
      compare  : same
    }, o);

    var receptor,
        $dimension = $('<div class="dimension ui-widget"><ul class="dimension-receptor ui-state-default"></ul></div>'),
        $receptor  = $dimension.find(".dimension-receptor");
        $receptor.sortable({
          placeholder: "dimension-placeholder ui-state-focus"
        , revert : false
        , stop : function(e, ui) {
          var data;
          if(!o.multiple) {
            $(ui.placeholder).parent().children("li").each(function() {
              data = extractDragData($(this));
              $(receptor).trigger("remove", data);
              $(this).remove();
            });
          }
          data = extractDragData(e, ui);
          var helper = $('<li data-drag=\''+JSON.stringify(data)+'\'>'+ui.item.text()+'</li>');
          ui.item.replaceWith(helper);
        }
        , remove: function(e, ui) {
            var data = extractDragData(e, ui);
            $(receptor).trigger("remove", data);
        }
        , receive: function(e, ui) {
            var data = extractDragData(e, ui);
            $(receptor).trigger("add", data);
        }
        , activate: function(e, ui) {
          if(ui.placeholder)
          {
            trashbin.associateTo($receptor);
          }
        }
        , deactivate: function(e, ui) {
          trashbin.remove();
        }
        , sort: function(e, ui) {
          if(!o.multiple) {
            var sibblings = $(ui.placeholder).parent().children("li");
            sibblings.each(function() {
 //             console.log(this, ui);
              if(ui.placeholder[0] !== this)
                $(this).hide();
            });
          }
        }
  //        , stop : function() {
  //          console.log("stop");
  //        }
        , out: function(e, ui) {
          if(!o.multiple) {
            $(ui.placeholder).parent().children("li").show();
          }
        }
        , connectWith : ".dimension-trash"
      });

    $(el).closest(".rg-builder").on("view.ui.node.beforedrag", function(e, ndata) {
      if(!o.accept(ndata)) {
        $receptor.sortable("disable");
      } else {
        var sibblings = $receptor.find("li");
        sibblings.each(function() {
          var data = extractNodeData(this);
          if(o.compare(ndata, data)) {
            $receptor.sortable("disable");
            return false;
          }
        });
      }
      $(this).mouseup(function() {
        setTimeout(function() {
          $receptor.sortable("enable");
        }, 20);
      });
    });
    $dimension.appendTo(el);
    $receptor.disableSelection();
    return receptor = {
    };
  };
});

// + replace existing
// + limit number
// + uniqueness
// - pass template function
// + discriminate drop using a function
// - method add
// - method remove
// + events trigger