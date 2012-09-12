define([
    "jquery"
  , "util/widget/treepane"
  , "lib/jquery-ui/jquery.ui"
],

function($, createTree) {
  return function(ctx) {
    function init(container, datasources) {
      var tree = createTree(container, datasources, {
            icons : {
                datasource : "images/datasource.png"
              , column : "images/column.png"
            }
          });
      $(tree).on("node.created", function(e, el, node) {{
          $(el).find("a").draggable({
              delay : 200
            , revert : "invalid"

            , helper : function (e,ui) {
                var $this = $(this),
                    builder = $this.closest(".rg-builder"),
                    clone = $this.clone(),
                    container = $('<li class="jstree jstree-default"></li>');
                container.append(clone);
                builder.append(container);
              return clone;
            }
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

/*
TODO

+ don't drag the hierarchy arrow
+ drag outside the pane
- limit to type (column)
- events:
  - start drag
  - drop
- transition back if dropped on invalid areas
- disappear if dropped on valid areas

*/