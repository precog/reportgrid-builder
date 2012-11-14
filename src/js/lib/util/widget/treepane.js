define([
    "jquery"
  , "lib/util/compare"
  , 'ext/jstree/vakata'
  , 'ext/jstree/jstree'
  , 'ext/jstree/jstree.sort'
  , 'ext/jstree/jstree.ui'
  , 'ext/jstree/jstree.themes'
  , 'ext/jstree/jstree.dnd'
],

function($, compare) {

  return function(el, fs, o) {
    o = o || {};
    o.icons = o.icons || {};
    var types = { },
        treepane = {
          toggle : function(node) {
            node = findNode(node.path, node.type);
            if(!node) return;
            tree.jstree("toggle_node", node);
          },
          getParent : function(node) {
            node = findNode(node.path, node.type);
            if(!node) return null;
            var el = tree.jstree("get_parent", node.get(0));
            if(!el) return null;
            if(-1 === el) return { type : "folder", path : "/" };
            return getNodeFromElement(el);
          }
        },
        names = fs.typeNames();
    for(var i = 0; i < names.length; i++) {
      var name = names[i],
          children = fs.typeChildren(name);
      types[name] = { valid_children : children ? children : "none" };
      if(o.icons[name])
        types[name].icon = o.icons[name];
      else
        types[name].icon = 'tree-icon tree-icon-' + name;
    }

    var tree = el
          .jstree({
            plugins : [
              "themes", "ui", "sort"
            ],
            sort : function (a, b) {
              var comp = compare(fs.typeOrder($(a).attr("rel")), fs.typeOrder($(b).attr("rel")));
              return comp !== 0 ? comp : compare($(a).attr("data-path").toLowerCase(), $(b).attr("data-path").toLowerCase());
            },
            ui : {
                select_limit : 1
              , selected_parent_close : "deselect"
              , select_multiple_modifier : false
              , select_range_modifier : false
            },
            types : types
          })
          .addClass("ui-widget-content"),
        root
      ;

    tree.bind("create_node.jstree", function(e, data) {
      var r = data.rslt,
          el = $(r.obj[0]),
          path = el.attr("data-path"),
          type = el.attr("rel");

      if(type !== "folder")
        result = tree.jstree("set_icon", el, types[type].icon);
      $(treepane).trigger("node.created", [el, { type : type, path : path }]);
    });

    function getNodeFromElement(el) {
      return { type : el.attr("rel"), path : el.attr("data-path") };
    }

    var selected;
    tree.bind("click.jstree", function() {
      var el = tree.jstree("get_selected"),
          current = getNodeFromElement(el);
      if(selected && selected.type === current.type && selected.path === current.path)
        return;
      if(selected)
        $(treepane).trigger("node.deactivated", selected);
      selected = current;
      $(treepane).trigger("node.activated", selected);
    });
    tree.bind("create_node.jstree", function(e, data) {
      var el = $(data.rslt.obj[0]);
      el.dblclick(function(e) {
        var node = { type : el.attr("rel"), path : el.attr("data-path") };
        $(treepane).trigger("node.trigger", node);
        e.preventDefault(); return false;
      });
    });

    function pollInit() {
      if(!el.find("ul").length) {
        setTimeout(pollInit, 15);
        return;
      }
      init();
    }

    pollInit();

    function createNode(title, path, type, parent, callback)
    {
      return tree.jstree("create_node"
        , parent || -1
        , {
            title : title
          , a_attr : {
              rel : type
            , "data-path" : path
          }
          , li_attr : {
              rel : type
            , "data-path" : path
          }
        }
        , "last"
        , function(el) {
          if(path === "/") {
            el.addClass("root-node");
            el.find("ul").addClass("root-container");
            setTimeout(function() {
              tree.jstree("select_node", el);
              tree.jstree("toggle_node", el);
              el.children("ins").hide();
              initFileSystem();
            }, 0);
          }
          if(callback)
            callback(el);
        }
      )
    }

    function createNodeByPath(path, type, callback) {
      var parts = path.substr(1).split("/"),
          name = parts.pop(),
          parent = parts.length === 0 ? -1 : findNode("/" + parts.join("/"), fs.typeContainerFor(type));
      createNode(name, path, type, parent, callback);
    }

    function removeNodeByPath(path, type) {
      var node = findNode(path, type);
      if(node === null)
        return;
      tree.jstree("delete_node", node);
    }

    function findNode(path, type) {
      return tree.find('li[data-path="'+path+'"][rel="'+type+'"]');
    }

    function initFileSystem() {
      var queue = fs.all();

      function dequeue() {
        if(queue.length === 0)
          return;
        var next = queue.shift();
        createNodeByPath(next.path, next.type, dequeue);
      }

      // wire events
      $(fs).on("added", function(e, path, type) {
        queue.push({ path : path, type : type });
        if(queue.length > 1) return;
        dequeue()
      });

      $(fs).on("removed", function(e, path, type) {
        removeNodeByPath(path, type);
      });

      dequeue();
    }

    $(treepane).on("node.trigger", function(e, node) {
      if(fs.typeIsContainer(node.type))
        treepane.toggle(node);
    });

    function init()
    {
      root = createNode("/", "/", "folder");
    }
    
    return treepane;
  };
});