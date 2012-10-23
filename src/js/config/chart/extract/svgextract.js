define([],

  function() {

    function ensureLabel(o) {
      return o.label || (o.label = {});
    }

    return function(o, dimensions, options) {
      if("undefined" !== typeof options["title"] && options["title"]) {
        ensureLabel(o).title = options["title"];
        if("undefined" !== typeof options.titleontop && !options.titleontop)
          o.titleontop = options.titleontop;
      }
    };
  });