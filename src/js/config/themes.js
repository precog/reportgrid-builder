define([
  "jquery"
],

function($) {
  var themes = [{
    token : "gray",
    name : "gray",
    ui : "gray",
    group : "light"
  }, {
    token : "blue",
    name : "blue",
    ui : "blue",
    group : "light"
  }, {
    token : "dark",
    name : "dark",
    ui : "dark",
    group : "dark"
  }, {
    token : "black",
    name : "black",
    ui : "black",
    group : "dark"
  }];

  var map = {},
      groups = {};
  $.each(themes, function() {
    map[this.token] = this;
    groups[this.group] = groups[this.group] || {};
    groups[this.group][this.token] = this;
  });

  return {
    map : map,
    groups : groups
  }
});