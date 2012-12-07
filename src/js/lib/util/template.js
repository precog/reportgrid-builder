define([
],

function() {
  var helpers = {
    indent : function(text, size, space, skip_first) {
      skip_first = skip_first === false || true;
      size = size || 2;
      space = space || " ";

      var s = "";
      while(size > 0) {
        s += space;
        size--;
      }
      var lines = text.split(/\r\n|\n|\r/);
      for(var i = skip_first ? 1 : 0; i < lines.length; i++) {
        lines[i] = s + lines[i];
      }
      return lines.join("\n");
    }
  };

  var patterns = {},
      helper_pattern = /\$([a-z_]+[0-1a-z_]*)\(([^)]*)\)/gi;

  function helper_replacer(params){
    return function(match, f, args) {
      var args = args.split(",").map(function(s) { return s.trim(); }).map(function(s) {
        var t;
        if(""+(t = parseFloat(s)) === s) {
          return t;
        } else if(s === "true" || s === "false") {
          return s === "true"
        } else if((t = s.substr(0, 1)) === '"' || t === "'") {
          return s;
        } else {
          return params[s];
        }
      });
      return helpers[f].apply(params, args);
    };
  };

  return function(template, params) {
    for(var key in params) {
      if(!params.hasOwnProperty(key)) continue;
      var pattern = patterns[key] || (patterns[key] = new RegExp("\\$"+key+"\\b", "g"));
      template = template.replace(pattern, params[key]);
    }
    template = template.replace(helper_pattern, helper_replacer(params));
    return template;
  };
});