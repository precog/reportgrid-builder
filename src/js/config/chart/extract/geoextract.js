define([
  "config/chart/extract/ensure"
],

function(ensure) {
  return function(o, dimensions, options) {
/*
    //BOOL
    //thinbackedges   false
    //stackbackedges  true
    if("undefined" !== typeof options["sankey.thinbackedges"] && options["sankey.thinbackedges"] !== false)
      o.thinbackedges = options["sankey.thinbackedges"];

    if("undefined" !== typeof options["sankey.stackbackedges"] && options["sankey.stackbackedges"] !== true)
      o.stackbackedges = options["sankey.stackbackedges"];

    //FLOAT
    //layerwidth       61
    //nodespacing      28
    //dummyspacing     18
    //backedgespacing   4
    //extraheight       5
    //extraradius       5
    //imagewidth       60
    //imageheight      48
    //imagespacing      0
    //labelnodespacing  4
    if("undefined" !== typeof options["sankey.layerwidth"] && options["sankey.layerwidth"] !== 61)
      o.layerwidth = options["sankey.layerwidth"];
    if("undefined" !== typeof options["sankey.nodespacing"] && options["sankey.nodespacing"] !== 28)
      o.nodespacing = options["sankey.nodespacing"];
    if("undefined" !== typeof options["sankey.dummyspacing"] && options["sankey.dummyspacing"] !== 18)
      o.dummyspacing = options["sankey.dummyspacing"];
    if("undefined" !== typeof options["sankey.backedgespacing"] && options["sankey.backedgespacing"] !== 4)
      o.backedgespacing = options["sankey.backedgespacing"];
    if("undefined" !== typeof options["sankey.extraheight"] && options["sankey.extraheight"] !== 5)
      o.extraheight = options["sankey.extraheight"];
    if("undefined" !== typeof options["sankey.extraradius"] && options["sankey.extraradius"] !== 5)
      o.extraradius = options["sankey.extraradius"];
    if("undefined" !== typeof options["sankey.imagewidth"] && options["sankey.imagewidth"] !== 60)
      o.imagewidth = options["sankey.imagewidth"];
    if("undefined" !== typeof options["sankey.imageheight"] && options["sankey.imageheight"] !== 48)
      o.imageheight = options["sankey.imageheight"];
    if("undefined" !== typeof options["sankey.imagespacing"] && options["sankey.imagespacing"] !== 0)
      o.imagespacing = options["sankey.imagespacing"];
    if("undefined" !== typeof options["sankey.labelnodespacing"] && options["sankey.labelnodespacing"] !== 4)
      o.labelnodespacing = options["sankey.labelnodespacing"];

    if("undefined" !== typeof options["sankey.chunkwidth"] && options["sankey.chunkwidth"] !== 10)
      o.chunkwidth = options["sankey.chunkwidth"];



    //EXPRESSION
    //imagepath
    if(options["sankey.imagepath"])
      o.imagepath = options["sankey.imagepath"];

    //EXPRESSION OR FUNCTION
    //nodeclass
    //edgeclass
    //displayentry
    //displayexit
    if(options["sankey.nodeclass"])
      o.nodeclass = options["sankey.nodeclass"];
    if(options["sankey.edgeclass"])
      o.edgeclass = options["sankey.edgeclass"];
    if("string" === typeof options["sankey.displayentry"] || options["sankey.displayentry"] === false)
      o.displayentry = options["sankey.displayentry"];
    if("string" === typeof options["sankey.displayeexit"] || options["sankey.displayexit"] === false)
      o.displayexit = options["sankey.displayexit"];

    //SELECT
    //layoutmethod   sugiyama  weightbalance
    if(options["sankey.layoutmethod"] !== 'sugiyama')
      o.layoutmethod = options["sankey.layoutmethod"];

    //LAYOUT MAP
    //layoutmap
    if(options["sankey.layoutmap"])
      o.layoutmap = options["sankey.layoutmap"];

    //LABEL
    if("undefined" !== typeof options['label.edge']) {
      if(false === options['label.edge']) {
        ensure('label',o).edge = function() {return null;};
      } else if("string" === typeof options['label.edge']) {
        ensure('label',o).edge = options['label.edge'];
      }
    }

    if("undefined" !== typeof options['label.edgeover']) {
      if(false === options['label.edgeover']) {
        ensure('label',o).edgeover = function() {return null;};
      } else if("string" === typeof options['label.edgeover']) {
        ensure('label',o).edgeover = options['label.edgeover'];
      }
    }

    if("undefined" !== typeof options['label.node']) {
      if(false === options['label.node']) {
        ensure('label',o).node = function() {return null;};
      } else if("string" === typeof options['label.node']) {
        ensure('label',o).node = options['label.node'];
      }
    }
*/
  };
});