define([
    "jquery"
  , "util/widget/dropdimension"
],

function($, createDrop) {
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

  return function(ctx) {
    var map = {};
    function init(el) {

      $(dimensions).each(function() {
        var dimension = this;
        $(el).append('<div>'+dimension.name+'</div>');
        var drop = createDrop(el, dimension);
//        map[dimension.dimension] = drop;
        $(drop).on("add", function(e, data) {
          var event = {
            dimension : dimension.name,
            data : data
          };
          console.log("add", JSON.stringify(event));
//          map[info.dimension].set(pos, info);
        });
        $(drop).on("remove", function(e, data) {
          var event = {
            dimension : dimension.name,
            data : data
          };
          console.log("remove", JSON.stringify(event));
//          map[info.dimension].set(pos, info);
        });
      });
    }

    ctx.on("view.editor.pane", init);
  }
});

/* TODO

- remove dimension
- deal with uniqueness
- drag and drop dimension from inside dimension drop area

*/