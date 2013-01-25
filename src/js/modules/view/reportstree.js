define([
  "jquery"
  , "lib/util/view/widgets/treepane"
  , "ext/jquery-ui/jquery.ui"
],

function($, createTree) {
  return function(ctx) {
    var container, fs;

    function init() {
      if(!container || !fs)
        return;
      var map = {
            folder : "/"
          },
          current;
      function activate_node(data, type, parentType) {
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
          activate_node(tree.getParent(data), type, parentType);
        }
      }

      function deactivate_node(data, type, parentType) {
        if(!data) return;
        if(data.type === type) {
          if(map[type])
            ctx.trigger("reports."+type+".deselect", map[type]);
          current = map[type] = null;
        } else if(data.type === parentType) {
          if(map[type]) {
            ctx.trigger("reports."+type+".deselect", map[type]);
            map[type] = null;
          }
        } else {
          deactivate_node(tree.getParent(data), type, parentType);
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
      $(tree).on("node.selected", function(_, data) { activate_node(data, "folder", null); });
      $(tree).on("node.selected", function(_, data) { activate_node(data, "report", "folder"); });

      $(tree).on("node.removed", function(_, data) { deactivate_node(data, "folder", null); });
      $(tree).on("node.removed", function(_, data) { deactivate_node(data, "report", "folder"); });

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

    ctx.one("view.reports.tree", function(view) {
      container = view;
      init();
    });

    ctx.one("reports.system.ready", function(filesystem) {
      fs = filesystem;
      init();
    });
  };
});