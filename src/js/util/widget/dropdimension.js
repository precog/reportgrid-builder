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

  return function (el, o) {
    o = $.extend({
      accept   : [],
      maxitems : 1
    }, o);

    var $dimension = $('<div class="dimension ui-widget"><ul class="dimension-receptor ui-state-default"></ul></div>'),
        $receptor  = $dimension.find(".dimension-receptor"),
        firstout = true,
        isout = false;
        $receptor.sortable({
          placeholder: "ui-state-highlight"
        , revert : false
        , stop : function(e, ui) {
          var helper = $('<li>'+ui.item.text()+'</li>');
          ui.item.replaceWith(helper);
        }
        , over: function(e, ui) {
          isout = false;
        }
        , out: function(e, ui) {
          if(firstout) {
            $receptor.sortable("option", "connectWith", ".dimension-receptor");
            firstout = false;
          }
          isout = true;
        }
        , update: function(e, ui) {

        }
        , remove: function(e, ui) {
          isout = false;
        }
        , receive: function(e, ui) {
          isout = false;
        }
        , activate: function(e, ui) {
          isout = false;
        }
        , deactivate: function(e, ui) {
          $receptor.sortable("option", "connectWith", false);
        }
        , beforeStop: function(e, ui) {
            firstout = true;
            if (isout) {
              isout = false;
              ui.item.remove();
            }
        }
        , connectWith : ".dimension-receptor"
      });
      $dimension.appendTo(el);

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