define([
  "jquery"
],

function($) {
  var SPLITTER = ":",
      PATTERN_NAME = /^[a-z]+[a-z0-9 _-]*$/i;

  function validateName(name) {
    return PATTERN_NAME.test(name);
  }

  function normalize(node) {
    node = node.substr(0, 1) == "/" ? node.substr(1) : node;
    node = node.substr(-1) == "/" ? node.substr(0, node.length - 1) : node;
    return "/" + node;
  }
  
  function key(node, type) {
    return type + SPLITTER + node;
  }

  function extractNode(key, type) {
    return key.substr(type.length + SPLITTER.length);
  }

  function extractPathType(key) {
    var parts = key.split(SPLITTER);
    return { path : parts[1], type : parts[0] };
  }

  return function(o) {
    o = o || { };
    var types       = o.types || { "folder" : { "container" : ["folder"] } },
        defaultType = o.defaultType || "folder", 
        map         = { },
        containers  = { };

    for(var type in types) {
      if(types.hasOwnProperty(type)) {
        var contents = types[type].container;
        if(contents) {
          for(var i = 0; i < contents.length; i++) {
            var content = contents[i];
            if(!containers[content]) {
              containers[content] = type;
            }
          }
        }
      }
    }

    function _isRoot(node, type) {
      return type === defaultType && "/" === node;
    }
    
    function _has(node, type) {
      return !!map[key(node, type)];
    }

    function applyToSub(node, f) {
      for(var mkey in map) {
        if(map.hasOwnProperty(mkey)) {
          for(var type in types) {
            if(types.hasOwnProperty(type)) {
              var nnode = key(node, type);
              if(mkey.substr(0, nnode.length) === nnode) {
                f(extractNode(mkey, type), type);
              }
            }
          }
        }
      }
    }

    var fs = {
      has : function(node, type) {
        type = type || defaultType;
        return _has(node = normalize(node), type) || _isRoot(node, type);
      },
      add : function(node, type, recursive) {
        type = type || defaultType;
        recursive = !!recursive;
        if(_has(node = normalize(node)) || _isRoot(node, type))
            return false;
        var parts = node.substr(1).split("/"),
            path = "",
            added = false,
            name = parts[parts.length-1];
        if(!validateName(name)) throw "invalid path name '"+name+"'";
        if(recursive) {
          for(var i = 0; i < parts.length - 1; i++) {
            path += "/" + parts[i];
            if(_has(path))
              continue;
            this.add(path, this.typeContainerFor(type), false);
//            map[key(path, parentType)] = true;
//            $(fs).trigger("added", [path, parentType]);
          }
        } else {
          path = "/" + parts.slice(0, parts.length - 1).join("/");
          if(!this.has(path))
            return false;
        }
        map[key(node, type)] = true;
        $(fs).trigger("added", [node, type]);
        return true;
      },
      remove : function(node, type) {
        type = type || defaultType;
        if(!_has(node = normalize(node), type) || _isRoot(node, type))
          return false;
        if(types[type].container) {
          applyToSub(node, function(cnode, ctype) {
            delete map[key(cnode, ctype)];
            $(fs).trigger("removed", [cnode, ctype]);
          });
        } else {
          delete map[key(node, type)];
          $(fs).trigger("removed", [node, type]);
        }
        return true;
      },
      typeIsContainer : function(type) {
        return !!(types[type] && types[type].container);
      },
      typeCanContain : function(parent, child) {
        return (types[parent] && types[parent].indexOf(child) >= 0);
      },
      typeContainerFor : function(type) {
        return containers[type];
      },
      list : function(node, type) {
        type = type || defaultType;
        if(!_has(node = normalize(node), type) && !_isRoot(node, type))
          return [];
        var r = [],
          len = node.length;
        applyToSub(node, function(cnode, ctype) {
          // skip nested paths
          var path = cnode.substr(len+(node === "/" ? 0 : 1));
          if(path !== "" && (path.indexOf("/") < 0))
            r.push({ path : path, type : ctype });
        });
        return r;
      },
      all : function() {
        type = type || defaultType;
        var r = [];
        for(var key in map) {
          r.push(extractPathType(key));
        }
        return r;
      }
    };
    return fs;
  }
});