define([
  "config/chart/extract/ensure"
],

function(ensure) {
  return function(o, dimensions, options) {
    if(dimensions['columns'].length > 1)
      o.columnaxes = dimensions['columns'].length;

    if(false === options["pivottable.displaytotalcolumns"])
      o.displaycolumntotal = options["pivottable.displaytotalcolumns"];

    if(false === options["pivottable.displaytotalrows"])
      o.displayrowtotal = options["pivottable.displaytotalrows"];

    if(false === options["pivottable.displayheatmap"])
      o.displayheatmap = options["pivottable.displayheatmap"];

    if("undefined" !== typeof options["pivottable.cellclass"] && options["pivottable.cellclass"])
      o.cellclass = options["pivottable.cellclass"];

    if("undefined" !== typeof options["pivottable.valueclass"] && options["pivottable.valueclass"])
      o.valueclass = options["pivottable.valueclass"];

    if("undefined" !== typeof options["pivottable.headerclass"] && options["pivottable.headerclass"])
      o.headerclass = options["pivottable.headerclass"];

    if("undefined" !== typeof options["pivottable.totalclass"] && options["pivottable.totalclass"])
      o.totalclass = options["pivottable.totalclass"];

    if("undefined" !== typeof options["label.axisvalue"]) {
      if(false === options["label.axisvalue"]) {
        ensure('label',o).axisvalue = function() {return null;};
      } else if("string" === typeof options["label.axisvalue"]) {
        ensure('label',o).axisvalue = options["label.axisvalue"];
      }
    }

    if("undefined" !== typeof options["label.axis"]) {
      if(false === options["label.axis"]) {
        ensure('label',o).axis = function() {return null;};
      } else if("string" === typeof options["label.axis"]) {
        ensure('label',o).axis = options["label.axis"];
      }
    }

    if("undefined" !== typeof options["label.total"]) {
      if(false === options["label.total"]) {
        ensure('label',o).total = function() {return null;};
      } else if("string" === typeof options["label.total"]) {
        ensure('label',o).total = options["label.total"];
      }
    }

    if("undefined" !== typeof options["label.totalover"]) {
      if(false === options["label.totalover"]) {
        ensure('label',o).totalover = function() {return null;};
      } else if("string" === typeof options["label.totalover"]) {
        ensure('label',o).totalover = options["label.totalover"];
      }
    }

    if(options["pivottable.startcolor"] && "#ffffff" !== options["pivottable.startcolor"]) {
      o.startcolor = options["pivottable.startcolor"];
    }

    if(options["pivottable.endcolor"] && "#007fff" !== options["pivottable.endcolor"]) {
      o.endcolor = options["pivottable.endcolor"];
    }
  };
});