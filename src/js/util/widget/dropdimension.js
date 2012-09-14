define([
  "jquery"
],

function($) {
  // TODO remove and delegate
  function acceptsSelector(rels) {
    return '[rel="'+rels.join('"],[rel="')+'"]';
  }

  function receptorContent(info){
    return $('<div>'+info.path+'</div>');
  }

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
           top  : pos.top + "px"//,
           //            zIndex : 10000
         });
         el.css("visibility", "visible");
         visible = true;
         //          $el.parent().append(el);
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
      accept   : [],
      maxitems : 1
    }, o);

    var $dimension = $('<div class="dimension ui-widget"><ul class="dimension-receptor ui-state-default"></ul></div>'),
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
    var receptor = {

    };

    return receptor;
  };
/*
  return function(el, o) {
     function inContainer(target) {
      var tpos = target.offset(),
          cpos = el.offset(),
          rect = { w : el.outerWidth(), h : el.outerHeight() };
console.log(tpos, cpos);
      return tpos.x >= cpos.x && tpos.x <= (cpos.x + rect.w) && tpos.y >= cpos.y && tpos.y <= (cpos.y + rect.h);
    }

    o = $.extend({
      accept   : [],
      maxitems : 1
    }, o);
    var dimension = o.dimension,
        drop,
        accept = o.accept.length === 0 ? null : acceptsSelector(o.accept),
        html = $('<div class="dimension ui-widget"></div>'),
        receptor = createReceptor("&nbsp;", accept).appendTo(html),
        count = 0,
        items = [];

    function createReceptor(content, accept) {
      var receptor = $('<div class="dimension-receptor ui-state-default">'+(content ? content : "")+'</div>');
      return receptor.sortable({
          activeClass: "ui-state-hover"
        , hoverClass: "ui-state-active"
        , accept : accept
        , drop : function(e, ui) {
          var info = extractInfo($(ui.helper[0]));
          $(drop).trigger("view.dimension.setrequest", [info, $(this).index()]);
        }
      });
    }

    function extractInfo(el) {
      return { type : el.attr("rel"), path : el.attr("data-path"), dimension : dimension };
    }


    el.append(html);
    var buildercontainer = el.closest(".rg-builder");


    return drop = {
      set : function(pos, info) {
        var receptor = html.find(".dimension-receptor:eq("+(pos)+")")
        receptor.html("");
        receptor.append(receptorContent(info));
        receptor.draggable({
            delay : 200
          , revert : "invalid"

          , helper : function (e,ui) {
            var $this = $(this),
              clone = $this.clone(),
              container = $('<div class=""></div>');
            container.append(clone);
            buildercontainer.append(container);
            return clone;
          }

//            , scope : node.type
        })
          .bind("dragstart", function(e, ui) {
            console.log("START", e, ui);
            buildercontainer.droppable({
                hoverClass: "ui-state-active"
              , drop : function(e, ui) {
                console.log("dropped on body");
              }
              , over : function(e, ui) {

                ui.helper.addClass("rg-remove-draggable");
              }
              , out : function(e, ui) {
                ui.helper.removeClass("rg-remove-draggable");
              }
            });
          })
          .bind("dragstop", function(e, ui) {
            console.log("STOP", e, ui);
            buildercontainer.droppable("destroy");
          });
        var replacement = !!items[pos];
        items[pos] = true;
        if(o.maxitems == 1 || items == o.maxitems)
          return;
        count++;
        if(count == o.maxitems) {
          // TODO remove empty receptors
        } else if(!replacement) {
          // TODO add receptors on both sides
          items.splice(pos + 1, 0, null);
          items.splice(pos, 0, null);
          createReceptor("", accept).insertBefore(receptor);
          createReceptor("", accept).insertAfter(receptor);
        }
      },
      unset : function(pos) {

      }
    };
  };
*/
});

// CHANGE DROPPABLE TO SORTABLE