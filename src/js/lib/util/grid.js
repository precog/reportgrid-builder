define([
    "jquery"
  , "ext/jquery-slickgrid/jquery.event.drag-2.0.min"
  , "ext/jquery-slickgrid/slick.core"
  , "ext/jquery-slickgrid/slick.grid"
],

function($) {
  return function(selector, data, columns, options) {
    return new Slick.Grid(selector, data, columns, options);
  }
});