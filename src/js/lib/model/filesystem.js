define([
    "jquery"
  , "lib/util/compare"
],

function($, compare) {
  var SPLITTER = ":",
      PATTERN_NAME = /^[a-z]+[a-z0-9 _.-]*$/i;

  function validateName(name) {
    return PATTERN_NAME.test(name);
  }

  function normalize(path) {
    path = path.substr(0, 1) == "/" ? path.substr(1) : path;
    path = path.substr(-1) == "/" ? path.substr(0, path.length - 1) : path;
    return "/" + path;
  }

  function key(path, type) {
    return type + SPLITTER + path;
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
    var types         = o.types || { "folder" : { "container" : ["folder"] } },
        defaultType   = o.defaultType || "folder",
        caseSensitive = "undefined" !== typeof o.caseSensitive ? !!o.caseSensitive : false,
        map           = { },
        cimap         = { }, // case insensitive
        containers    = { };

    var order = 0;
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
        if("undefined" === typeof types[type].order)
          types[type].order = order++;
      }
    }

    function _isRoot(path, type) {
      return type === defaultType && "/" === path;
    }

    function _has(path, type) {
      if(caseSensitive)
        return !!map[key(path, type)];
      else
        return !!cimap[key(path, type).toLowerCase()];
    }

    function applyToSub(path, f) {
      for(var type in types) {
        if(types.hasOwnProperty(type)) {
          for(var mkey in map) {
            if(map.hasOwnProperty(mkey)) {
              var npath = key(path, type);
              if(path != '/')
                npath += '/';
              if(mkey.substr(0, npath.length) === npath) {
                f(extractNode(mkey, type), type);
              }
            }
          }
        }
      }
    }

    var fs = {
      has : function(path, type) {
        type = type || defaultType;
        return _has(path = normalize(path), type) || _isRoot(path, type);
      },
      validate : function(path, type) {
        type = type || defaultType;
        path = normalize(path)
        if(_has(path, type) || _isRoot(path, type))
          return "node already exists";
        var parts = path.substr(1).split("/"),
            name = parts[parts.length-1];
        if(!validateName(name))
          return "invalid characters in name";
        var parentPath = "/" + parts.slice(0, parts.length - 1).join("/"),
            parentType = this.typeContainerFor(type);
        if(!this.has(parentPath, parentType))
          return "parent node does not exist";
        return null;
      },
      add : function(path, type, recursive) {
        type = type || defaultType;
        recursive = !!recursive;
        if(_has(path = normalize(path), type) || _isRoot(path, type))
            return false;
        var parts = path.substr(1).split("/"),
            name = parts[parts.length-1];
        if(!validateName(name)) throw "invalid path name '"+name+"'";
        var parentPath = "/" + parts.slice(0, parts.length - 1).join("/"),
            parentType = this.typeContainerFor(type);
        if(recursive) {
          this.add(parentPath, parentType, true);
        } else {
          if(!this.has(parentPath, parentType))
            return false;
        }
        map[key(path, type)] = true;
        cimap[key(path, type).toLowerCase()] = true;
        $(fs).trigger("added", [path, type]);
        return true;
      },
      remove : function(path, type) {
        var k;
        type = type || defaultType;
        if(!_has(path = normalize(path), type) || _isRoot(path, type))
          return false;
        if(types[type].container) {
          applyToSub(path, function(cpath, ctype) {
            k = key(cpath, ctype);
            delete map[k];
            delete cimap[k.toLowerCase()];
            $(fs).trigger("removed", [cpath, ctype]);
          });
        }
        k = key(path, type);
        delete map[k];
        delete cimap[k.toLowerCase()];
        $(fs).trigger("removed", [path, type]);
        return true;
      },
      typeIsContainer : function(type) {
        return !!(types[type] && types[type].container);
      },
      typeCanContain : function(parent, child) {
        var t = types[parent];
        return (t && t.container && t.container.indexOf(child) >= 0);
      },
      typeContainerFor : function(type) {
        return containers[type];
      },
      typeOrder : function(type) {
        return types[type].order;
      },
      typeNames : function() {
        var r = [];
        for(var key in types) {
          if(types.hasOwnProperty(key)) {
            r.push(key);
          }
        }
        return r;
      },
      typeChildren : function(type) {
        return types[type].container;
      },
      list : function(path, type) {
        type = type || defaultType;
        if(!_has(path = normalize(path), type) && !_isRoot(path, type))
          return [];
        var r = [],
          len = path.length;
        applyToSub(path, function(cpath, ctype) {
          // skip nested paths
          var p = cpath.substr(len+(path === "/" ? 0 : 1));
          if(p !== "" && (p.indexOf("/") < 0))
            r.push({ path : p, type : ctype });
        });
        return r;
      },
      all : function() {
        type = type || defaultType;
        var r = [];
        for(var key in map) {
          if(map.hasOwnProperty(key)) {
            r.push(extractPathType(key));
          }
        }
        r.sort(function(a, b) {
          var comp = compare(types[a.type].order, types[b.type].order);
          return comp !== 0 ? comp : compare(a.path, b.path);
        });
        return r;
      }
    };
    return fs;
  }
});