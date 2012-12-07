define([
  "jquery"
  , "lib/util/view/widgets/treepane"
  , "ext/jquery-ui/jquery.ui"
],

function($, createTree) {
  return function(ctx) {

    function init(container, fs) {
      var map = {
            folder : "/"
          },
          current;
      function activateNode(data, type, parentType) {
        if(!data) return;
        if(data.type === type) {
          if(data.path === current)
            return;
          if(map[type])
            ctx.trigger("reports."+type+".deselect", map[type]);
          ctx.trigger("reports."+type+".select", data.path);
          ctx.trigger("reports."+type+".current", data.path);
          current = map[type] = data.path;
        } else if(data.type === parentType) {
          if(map[type]) {
            ctx.trigger("reports."+type+".deselect", map[type]);
            map[type] = null;
          }
        } else {
          activateNode(tree.getParent(data), type, parentType);
        }
      }

      var tree = createTree(container, fs, {
        icons : {
            report : "images/report.png"
        }
      });

      $(tree).on("node.created", function(e, el, node) {
        var a = $(el).find("a").first()
              .attr("data-node", JSON.stringify(node));
      });
      $(tree).on("node.selected", function(_, data) { activateNode(data, "folder", null); });
      $(tree).on("node.selected", function(_, data) { activateNode(data, "report", "folder"); });
      $(tree).on("node.trigger", function(_, data)  {
        if(data.type === "report") {
          ctx.trigger("reports.report.openpath", data.path);
        }
      });

      ctx.on("reports.folder.remove", function(path) {
        fs.remove(path, "folder");
      });

      ctx.on("reports.folder.add", function(path) {
        fs.add(path, "folder");
      });
    }

    $.when(ctx.on("view.reports.tree"), ctx.on("reports.system.ready")).then(function(viewargs, systemargs) {
      init(viewargs[0], systemargs[0]);
    });
  };
});