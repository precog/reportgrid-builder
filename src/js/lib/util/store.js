define([

],

function() {
  return function(name, defaults, engine) {
    var data,
        storage = engine || window.localStorage,
        timer;
    var api = {
      has : function(key) {
        return "undefined" !== typeof data[key];
      },
      getData : function() {
        var s = storage.getItem(name);
        if(s)
          return JSON.parse(s);
        else
          return defaults || {};
      },
      setData : function(newdata) {
        data = newdata;
      },
      get : function(key) {
        return data[key];
      },
      set : function(key, value) {
        data[key] = value;
      },
      remove : function(key) {
        delete data[key];
      },
      keys : function() {
        var result = [];
        for(key in data) {
          if(data.hasOwnProperty(key))
            result.push(key);
        }
        return result;
      },
      empty : function() {
        return this.keys().length > 0;
      },
      restore : function() {
        data = this.getData();
      },
      commit : function() {
        try {
          storage.setItem(name, JSON.stringify(data));
        } catch(e) {
          ctx.log("error", "failed to commit to localStorage for " + name, data);
        }
      },
      delayedCommit : function(delay) {
        delay = delay || 0;
        clearTimeout(timer);
        timer = setTimeout(this.commit, delay);
      },
      destroy : function() {
        storage.removeItem(name);
      },
      destroyAll : function() {
        storage.clear();
      }
    };
    api.restore();
    return api;
  };
});