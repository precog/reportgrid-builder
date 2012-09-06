define([
    "jquery"
  , "util/compare"
  , 'lib/jstree/vakata'
  , 'lib/jstree/jstree'
  , 'lib/jstree/jstree.sort'
  , 'lib/jstree/jstree.ui'
  , 'lib/jstree/jstree.themes'
  , 'lib/jstree/jstree.dnd'
],

function($, compare) {

  return function(el, fs, o) {
    o = o || {};
    o.icons = o.icons || {};
    var types = { };
    var names = fs.typeNames();
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

    function updateIcon(e, data) {
      var r = data.rslt,
          el = $(r.obj[0]),
          type = $(el).attr("rel");
      if(type !== "folder")
        result = tree.jstree("set_icon", el, types[type].icon);
    }
    tree.bind("create_node.jstree", updateIcon);

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
//          , data  : path
//          , attr : {
//            rel : type
//          }
          , li_attr : {
              rel : type
            , "data-path"  : path
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
          } else if(fs.typeIsContainer(type)) {
            el.find("a:first").dblclick(function(e) {
              tree.jstree("toggle_node", el);
              e.preventDefault(); return false;
            });
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

    function init()
    {
      root = createNode("/", "/", "folder");
    }

    // TODO
    // + iterate all nodes
    // + build tree
    // + differentiate node types
    // + pair fs create / node create
    // + pair fs remove / node remove
    // + manage node type
    // - event: select node
    // - event: select node -> select container
    // - event: unselect node
    // - event: unselect container
    // - event: activate (dblclick) nodes
    // - listen: activate folder to toggle
  };
});