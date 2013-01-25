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
      };
      function activate_node(data, type, parentType) {
        if(!data) return;
        if(data.type === type) {
          if(data.path === map[type])
            return;
          if(map[type])
            ctx.trigger("data."+type+".deselect", map[type]);
          ctx.trigger("data."+type+".select", data.path);
          ctx.trigger("data."+type+".current", data.path);
          map[type] = data.path;
        } else if(data.type === parentType) {
          if(map[type]) {
            ctx.trigger("data."+type+".deselect", map[type]);
            map[type] = null;
          }
        } else {
          activate_node(tree.getParent(data), type, parentType);
        }
      }

      var tree = createTree(container, fs, {
        icons : {
            datasource : "images/datasource.png"
          , continuous : "images/continuous.png"
          , time       : "images/time.png"
          , discrete   : "images/discrete.png"
          , ordinal    : "images/ordinal.png"
          , category   : "images/category.png"
          , data       : "images/data.png"
        }
      });

      $(tree).on("node.created", function(e, el, node) {
        var a = $(el).find("a").first()
              .attr("data-node", JSON.stringify(node));
      });
      $(tree).on("node.selected", function(_, data) { activate_node(data, "folder", null); });
      $(tree).on("node.selected", function(_, data) { activate_node(data, "datasource", "folder"); });

      ctx.on("data.folder.remove", function(path) {
        fs.remove(path, "folder");
      });

      ctx.on("data.folder.add", function(path) {
        fs.add(path, "folder");
      });
    }

    ctx.one("view.data.tree", function(view){
      container = view;
      init();
    });

    ctx.one("data.system.ready", function(filesystem){
      fs = filesystem;
      init();
    });

  };
});