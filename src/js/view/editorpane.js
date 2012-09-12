define([
    "jquery"
  , "util/widget/dropdimension"
],

function($, createDrop) {
  var dimensions = [{
    accept    : ["folder", "datasource"],
    maxitems  : 0,
    dimension : "/a/d1"
  }, {
    accept    : ["column"],
    maxitems  : 0,
    dimension : "/a/d2"
  }, {
    accept    : ["folder", "datasource"],
    maxitems  : 0,
    dimension : "/a/d3"
  }, {
    accept    : ["folder"],
    maxitems  : 0,
    dimension : "/a/d4"
  }, {
    accept    : ["datasource"],
    maxitems  : 0,
    dimension : "/a/d5"
  }, {
    accept    : ["false"],
    maxitems  : 0,
    dimension : "/a/d6"
  }, {
    accept    : ["datasource"],
    maxitems  : 0,
    dimension : "/a/d7"
  }, {
    accept    : ["column"],
    maxitems  : 0,
    dimension : "/a/d8"
  }];

  return function(ctx) {
    var map = {};
    function init(el) {

      for(var i = 0; i < dimensions.length; i++) {
        $(el).append('<div>dimension</div>');
        var drop = createDrop(el, dimensions[i]);
        map[dimensions[i].dimension] = drop;
        $(drop).on("view.dimension.setrequest", function(e, info, pos) {
          console.log(info, pos);
          map[info.dimension].set(pos, info);
        });
      }
    }

    ctx.on("view.editor.pane", init);
  }
});

/* TODO

- remove dimension
- deal with uniqueness
- drag and drop dimension from inside dimension drop area

*/