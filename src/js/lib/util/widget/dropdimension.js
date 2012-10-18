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
    var el = ui && $(ui.helper);
    if(el && el.length === 0 && ui) {
      el = $(ui.item).find("*").andSelf().filter('[data-drag]');
    }
    if(el && el.length === 0){
      el = $(e.srcElement).find('a[data-drag]');
    }
    var data = extractNodeData(el);
    return data;
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
       init : init
     };
   })();

  return function (el, o) {
    trashbin.init(el);

    o = $.extend({
      accept   : function(data) { return true },
      multiple : false,
      compare  : same,
      format   : function(data) { return JSON.stringify(data); }
    }, o);

    function createDimension(data, placeholder) {
      if(!o.multiple) {
        $receptor.find("li").each(function() {
          var d = extractNodeData($(this));
          $(receptor).trigger("removed", d);
          $(this).remove();
        });
      }
      var helper = $('<li data-drag=\''+JSON.stringify(data)+'\'>'+ o.format(data)+'</li>');
      if(placeholder)
        placeholder.replaceWith(helper);
      else
        $receptor.append(helper);
    }

    var receptor,
        $dimension = $('<div class="dimension ui-widget"><ul class="dimension-receptor ui-state-default"></ul></div>'),
        $receptor  = $dimension.find(".dimension-receptor");
        $receptor.sortable({
          placeholder: "dimension-placeholder ui-state-focus"
        , revert : false
        , stop : function(e, ui) {
            var data = extractDragData(e, ui);
  //            console.log(data, e, ui);
            createDimension(data, ui.item);
        }
        , receive: function(e, ui) {
            var data = extractDragData(e, ui);
//            $(receptor).trigger("added", data);
//            console.log(data, e, ui);
//            createDimension(data, ui.item);
            setTimeout(function() { // dirty trick to make remove happen before add
              $(receptor).trigger("added", data);
            }, 0);
        }
        , remove: function(e, ui) {
            var data = extractDragData(e, ui);
            $(receptor).trigger("removed", data);
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
//              if(ui.placeholder[0] !== this)
//                $(this).hide();
            });
          }
        }
        , out: function(e, ui) {
          if(!o.multiple) {
            $(ui.placeholder).parent().children("li").show();
          }
        }
        , connectWith : ".dimension-trash"
      });

    function receptorMouseUp() {
      setTimeout(function() {
        $receptor.sortable("enable");
      }, 20);
    }

    function beforeDrag(e, ndata) {
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
      $(this).on("mouseup", receptorMouseUp);
    }

    $(el).closest(".rg-builder").on("view.ui.node.beforedrag", beforeDrag);

    $dimension.appendTo(el);
    $receptor.disableSelection();
    return receptor = {
      destroy : function() {
        $(el).closest(".rg-builder")
          .off("view.ui.node.beforedrag", beforeDrag)
          .off("mouseup", receptorMouseUp);
        $receptor.sortable("destroy");
        $dimension.remove();
      },
      add : function(data) {
        createDimension(data);
      }
    };
  };
});

// TODO
// + remove should occur before add when replacing an existing value
// - hide current value when dragging on a non multiple dimension