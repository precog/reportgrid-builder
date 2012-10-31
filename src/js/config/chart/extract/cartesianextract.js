define([
  "config/chart/extract/ensure"
],

function(ensure) {
  return function(o, dimensions, options) {

    if("alternating" !== options["cartesian.yscaleposition"]) {
      o.yscaleposition = options["cartesian.yscaleposition"];
    }

    if("undefined" !== typeof options["labelhorizontal"] && !options["labelhorizontal"])
      o.labelhorizontal = options["labelhorizontal"];



    if("undefined" !== typeof options['label.axis']) {
      if(true === options['label.axis']) {
        ensure('label',o).axis = "@humanize(type)";
      } else if("string" === typeof options['label.axis']) {
        ensure('label',o).axis = options['label.axis'];
      }
    }

    if("undefined" !== typeof options['label.tickmark']) {
      if(false === options['label.tickmark']) {
        ensure('label',o).tickmark = function() {return null;};
      } else if("string" === typeof options['label.tickmark']) {
        ensure('label',o).tickmark = options['label.tickmark'];
      }
    }


    if("undefined" !== typeof options["cartesian.displayruleminor"] && options["cartesian.displayruleminor"]) {
      o.displayruleminor = options["cartesian.displayruleminor"];
    }

    if("undefined" !== typeof options["cartesian.displayrulemajor"] && options["cartesian.displayrulemajor"]) {
      o.displayrulemajor = options["cartesian.displayrulemajor"];
    }

    if("undefined" !== typeof options["cartesian.displaytickminor"] && !options["cartesian.displaytickminor"]) {
      o.displaytickminor = options["cartesian.displaytickminor"];
    }

    if("undefined" !== typeof options["cartesian.displaytickmajor"] && !options["cartesian.displaytickmajor"]) {
      o.displaytickmajor = options["cartesian.displaytickmajor"];
    }

    if("undefined" !== typeof options["cartesian.displayticklabel"] && !options["cartesian.displayticklabel"]) {
      o.displayticklabel = options["cartesian.displayticklabel"];
    }

    if("undefined" !== typeof options["cartesian.displayanchorlinetick"] && options["cartesian.displayanchorlinetick"]) {
      o.displayanchorlinetick = options["cartesian.displayanchorlinetick"];
    }

    if("undefined" !== typeof options["cartesian.displayanchorlinerule"] && options["cartesian.displayanchorlinerule"]) {
      o.displayanchorlinerule = options["cartesian.displayanchorlinerule"];
    }

    if("undefined" !== typeof options["cartesian.lengthtickminor"] && options["cartesian.lengthtickminor"] !== 2) {
      o.lengthtickminor = options["cartesian.lengthtickminor"];
    }

    if("undefined" !== typeof options["cartesian.lengthtickmajor"] && options["cartesian.lengthtickmajor"] !== 5) {
      o.lengthtickmajor = options["cartesian.lengthtickmajor"];
    }

    if("undefined" !== typeof options["cartesian.paddingtickminor"] && options["cartesian.paddingtickminor"] !== 1) {
      o.paddingtickminor = options["cartesian.paddingtickminor"];
    }

    if("undefined" !== typeof options["cartesian.paddingtickmajor"] && options["cartesian.paddingtickmajor"] !== 1) {
      o.paddingtickmajor = options["cartesian.paddingtickmajor"];
    }

    if("undefined" !== typeof options["cartesian.paddingticklabel"] && options["cartesian.paddingticklabel"] !== 10) {
      o.paddingticklabel = options["cartesian.paddingticklabel"];
    }
    // displayruleminor false
    // displayrulemajor false
    // displaytickminor true
    // displaytickmajor true
    // displayticklabel true
    // displayanchorlinetick false
    // displayanchorlinerule false
    // lengthtickminor 2
    // lengthtickmajor 5
    // paddingtickminor 1
    // paddingtickmajor 1
    // paddingticklabel 10
  };
});