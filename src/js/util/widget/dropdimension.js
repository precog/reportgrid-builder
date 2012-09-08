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

  return function(el, o) {
    
    o = $.extend({
      accept   : [],
      maxitems : 1
    }, o);
    var dimension = o.dimension,
        drop,
        accept = o.accept.length === 0 ? null : acceptsSelector(o.accept),
        html = $('<div class="dimension"></div>'),
        receptor = createReceptor("&nbsp;", accept).appendTo(html),
        count = 0,
        items = [];

    function createReceptor(content, accept) {
      var receptor = $('<div class="receptor">'+(content ? content : "")+'</div>');
      return receptor.droppable({
        activeClass: "ui-state-hover"
        , hoverClass: "ui-state-active"
        , accept :accept
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

    return drop = {
      set : function(pos, info) {
        var receptor = html.find(".receptor:eq("+(pos)+")")
console.log(pos);
        receptor.html("");
        receptor.append(receptorContent(info));
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
});