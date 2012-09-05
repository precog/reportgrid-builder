define([
    "jquery"
  , 'lib/jstree/vakata'
  , 'lib/jstree/jstree'
  , 'lib/jstree/jstree.sort'
  , 'lib/jstree/jstree.ui'
  , 'lib/jstree/jstree.themes'
],

function($) {

  return function(el, fs) {
    var tree = el
          .bind("after.jstree", function() { console.log("CREATED"); })
          .jstree({
            plugins : [
              "themes", "sort", "ui"
            ],
            ui : {
                select_limit : 1
              , selected_parent_close : "deselect"
              , select_multiple_modifier : false
              , select_range_modifier : false
              , initially_open : true
            }
          })
          .addClass("ui-widget-content"),
        root
      ;

    function pollInit() {
      if(!el.find("ul").length) {
        setTimeout(pollInit, 15);
        return;
      }
      init();
    }

    setTimeout(init, 200);

    function createNode(title, path, type, parent, callback)
    {
      return tree.jstree("create_node"
        , parent || -1
        , {
            title : title
          , data  : path
          , attr : {
            rel : type
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

    function findNode(path, type) {
      throw "to implement";
    }

    function initFileSystem() {
      var children = fs.all();
      // wire events
      // build tree using children
console.log(JSON.stringify(children));
    }

    function init()
    {
      root = createNode("/", "/", "folder");
      /*
      tree.jstree("open_node", "folder", root);
      createNode("[a]", "/a", "file", root);
      var a = createNode("[b]", "/b", "folder", root);
      createNode("[c]", "/c", "folder", a);
      createNode("[d]", "/d", "folder", a);
      */
    }

    // TODO
    // - iterate all nodes
    // - build tree
    // - differentiate node types
    // - pair fs create / node create
    // - pair fs remove / node remove
    // - manage node type
    // - event: select node
    // - event: select node -> select container
    // - event: unselect node
    // - event: unselect container
    // - event: activate (dblclick) nodes
    // - listen: activate folder to toggle
  };
});