define([
    "jquery"
  , "lib/util/widget/dropdimension"
  , "lib/util/ui"
],

function($, createDrop, ui) {

  return function(ctx) {
    var el;
    function init(container) {
      el = container;
      ctx.on("chart.type.change", update);
      ctx.on("chart.dimension.add", appendDimension);
    };

    function update(type) {
      console.log("update " + type);
      // cleanup pane
      // request dimensions
      el.children("*").remove()
    }

    function appendDimension(info) {
      $(el).append('<div>'+info.name+'</div>');
      var drop = createDrop(el, info);
      $(drop).on("add", function(e, data) {
        var event = {
          dimension : info.name,
          data : data
        };
        console.log("add", JSON.stringify(event));
      });

      $(drop).on("remove", function(e, data) {
        var event = {
          dimension : info.name,
          data : data
        };
        console.log("remove", JSON.stringify(event));
      });

//      el.append(drop);
    }

    ctx.on("view.editor.dimensions", init);
  };
});
/*

 var dimensions = [{
 multiple  : true,
 dimension : "/a/d1",
 name : "x"
 }, {
 multiple  : false,
 dimension : "/a/d2",
 name : "y"
 }, {
 multiple  : true,
 dimension : "/a/d3",
 name : "segment-on"
 }, {
 multiple  : true,
 dimension : "/a/d3",
 name : "line-color"
 }, {
 multiple  : false,
 dimension : "/a/d4",
 name : "something-else"
 }];

 */


/*
 $(dimensions).each(function() {
 var dimension = this;
 $(el).append('<div>'+dimension.name+'</div>');
 var drop = createDrop(el, dimension);
 $(drop).on("add", function(e, data) {
 var event = {
 dimension : dimension.name,
 data : data
 };
 console.log("add", JSON.stringify(event));
 });

 $(drop).on("remove", function(e, data) {
 var event = {
 dimension : dimension.name,
 data : data
 };
 console.log("remove", JSON.stringify(event));
 });
 });
 */