define([],

function() {
  function normalizeDir(dir) {
    return dir.substr(0, 1) === '/' ? dir : "/" + dir;
  }

  function applyToSubDir(map, dir, f) {
    var len = dir.length;
    for(var key in map) {
      if(map.hasOwnProperty(key)) {
        if(key.substr(0, len) === dir) {
          f(key);
        }
      }
    }
  }

  return function() {
    var map = { };

    function _hasDir(dir) {
      return !!map[dir];
    };
    var fs = {
          hasDir : function(dir) {
            return _hasDir(dir = normalizeDir(dir)) || "/" === dir;
          },
          addDir : function(dir) {
            if(_hasDir(dir = normalizeDir(dir)) || "/" === dir)
                return false;
            var parts = dir.substr(1).split("/"),
                path = "",
                added = false;
            for(var i = 0; i < parts.length; i++) {
              path += "/" + parts[i];
              if(_hasDir(path))
                continue;
              added = map[path] = true;
            }
            return added;
          },
          removeDir : function(dir) {
            if(!_hasDir(dir = normalizeDir(dir)) || "/" === dir)
              return false;
            applyToSubDir(map, dir, function(cdir) {
              delete map[cdir];
            });
            return true;
          },
          listDir : function(dir) {
            if(!_hasDir(dir = normalizeDir(dir)))
              return [];
            var r = [],
                len = dir.length;
            applyToSubDir(map, dir, function(cdir) {
              r.push(cdir.substr(len+1));
            });
            return r;
          }
        };
    return fs;
  }
});