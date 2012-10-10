define([
    "jquery"
  , "util/widget/dropdimension"
  , "util/ui"
],

function($, createDrop, ui) {
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
      // create containers
      // chart selection
      var $chartSelection = $('<div class="chart-selection-container"></div>');
      // dimensions container
      var $dimensions = $('<div class="dimensions-container"></div>');
      // options container
      var $options = $('<div class="options-container"></div>');
      // chart container
      var $chart = $('<div class="chart-container"></div>');

      el.append($chartSelection);
      el.append($dimensions);
      el.append($options);
      el.append($chart);

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
      ctx.trigger("view.editor.chartselector", $chartSelection);
      ctx.trigger("view.editor.dimensions", $dimensions);
      ctx.trigger("view.editor.options", $options);
      ctx.trigger("view.editor.chart", $chart);
    }

    ctx.on("view.editor.pane", init);
  }
});