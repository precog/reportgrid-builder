define([
],

function() {
  function generate_function_name() {
    var fname;
    do {
      fname = "script_" + Math.floor(Math.random() * 10000000);
    } while(window[fname]);
    return fname;
  }
  function create_scoped_function(script) {
    var fname = generate_function_name(),
        tag = document.createElement("script");
    tag.type = "text/javascript";

    var lines = script.split(";"); // poorman statement parser
    lines[lines.length-1] = "return " + lines[lines.length-1];
    script = lines.join(";");

    var text = 'function ' + fname + '(){ return function(scope){with(scope) {'+script+'}} }';
    tag.text = text;
    document.body.appendChild(tag);

    var f = window[fname]();

    try {
      delete window[fname];
    } catch(_) {
      window[fname] = null;
    }
    document.body.removeChild(tag);

    return f;
  }


  var fcache = {},
      helpers = {
        indent : {
          handler : function(text, size, space, skip_first){
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
          },
          normalize_arguments : true
        },
        "if" : {
          handler : function(condition, iftrue, iffalse) {
            condition = ""+condition;
            iftrue = ""+iftrue;
            if("undefined" !== typeof iffalse)
              iffalse = ""+iffalse;
            var fcondition = fcache[condition] || (fcache[condition] = create_scoped_function(condition));
            if(fcondition(this)) {
              var fiftrue = fcache[iftrue] || (fcache[iftrue] = create_scoped_function(iftrue));
              return fiftrue(this)
            } else if(iffalse) {
              var fiffalse = fcache[fiffalse] || (fcache[fiffalse] = create_scoped_function(fiffalse));
              return fiffalse(this)
            } else {
              return "";
            }
          },
          normalize_arguments : false
        }
      };

  var patterns = {},
      helper_pattern = /\$([a-z_]+[0-1a-z_]*)\(([^)]*)\)/gi;

  function helper_replacer(params){
    return function(match, f, args) {
      args = args.split(",");
      if(helpers[f].normalize_arguments) {
        args = args.map(function(s) { return s.trim(); }).map(function(s) {
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
      }
      return helpers[f].handler.apply(params, args);
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