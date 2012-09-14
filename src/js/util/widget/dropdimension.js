define([
  "jquery"
],

function($) {
  function extractData(e, ui) {
    var data = $(ui.item).attr("data-drag") || $(e.srcElement).closest("[data-drag]").attr("data-drag");
    return JSON.parse(data);
  }

   var trashbin = (function() {
     var bin, el, $trash, visible, context;

     function init(target) {
       if(el) return;
       el = $('<div class="rg-dimension-trashbin"><ul style="background-color: transparent; border: 0;" class="dimension-receptor dimension-trash ui-state-default"></ul></div>');
       $trash = el.find("ul").sortable({
           placeholder: "dimension-placeholder ui-state-error"
         , connectWith : ".dimension-receptor"
         , receive: function(e, ui) {
           var data = extractData(e, ui);
           console.log("receive delete", JSON.stringify(data));
           setTimeout(function() {
             $trash.children("li").remove();
           }, 0);
         }
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
      maxitems : 1
    }, o);

    var receptor,
        $dimension = $('<div class="dimension ui-widget"><ul class="dimension-receptor ui-state-default"></ul></div>'),
        $receptor  = $dimension.find(".dimension-receptor");
        $receptor.sortable({
          placeholder: "dimension-placeholder ui-state-focus"
        , revert : false
        , stop : function(e, ui) {
          var data = extractData(e, ui);
          var helper = $('<li data-drag=\''+JSON.stringify(data)+'\'>'+ui.item.text()+'</li>');
          ui.item.replaceWith(helper);
        }
        , remove: function(e, ui) {
            var data = extractData(e, ui);
            console.log("remove dimension", JSON.stringify(data));
        }
        , receive: function(e, ui) {
            var data = extractData(e, ui);
            console.log("receive dimension", JSON.stringify(data));
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
        , connectWith : ".dimension-receptor"
      });
      $dimension.appendTo(el);
    $receptor.disableSelection();
    return receptor = {

    };
  };
});

// - replace existing
// - limit number
// - uniqueness
// - pass template function
// - pass identification
// - discriminate drop using a function
// - method add
// - method remove
// - events trigger
// - respond to events