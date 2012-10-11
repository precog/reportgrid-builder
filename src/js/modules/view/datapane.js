define([
    "jquery"
  , "lib/util/widget/treepane"
  , "ext/jquery-ui/jquery.ui"
],

function($, createTree) {
  return function(ctx) {
    function init(container, datasources) {
      var tree = createTree(container, datasources, {
            icons : {
                datasource : "images/datasource.png"
              , category   : "images/category.png"
              , continuous : "images/continuous.png"
              , discrete   : "images/discrete.png"
              , time       : "images/time.png"
              , ordinal    : "images/ordinal.png"
            }
          });
      $(tree).on("node.created", function(e, el, node) {{
          $(el).find("a")
            .mousedown(function() {
              $(el).closest(".rg-builder").trigger("view.ui.node.beforedrag", node);
            })
            .draggable({
                delay : 200
              , revert : "invalid"

              , helper : function (e,ui) {
                  var $this = $(this),
                      builder = $this.closest(".rg-builder"),
                      clone = $this.clone(),
                      container = $('<div class="rg-dimension-dragger jstree jstree-default" data-drag=\''+JSON.stringify(node)+'\'></div>');
                  container.append(clone);
                  builder.append(container);
                return container;
              }
              /*
              , start : function(e, ui) {
                console.log("start dragging");
                $(document).trigger("view.ui.node.startdrag", [e, ui]); // dirty hack
                //this._contactContainers(event);
              }
              */
              , connectToSortable : ".dimension-receptor"
  //            , scope : node.type
            });
        }
      });
    }

    $.when(ctx.on("view.data.pane"), ctx.on("data.system.ready")).then(function(viewargs, systemargs) {
      init(viewargs[0].find(".tree"), systemargs[0]);
    });
  };
});