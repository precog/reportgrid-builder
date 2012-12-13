define([

],

function() {

  return function(datasource) {
    var src = datasource.src,
        hasprotocol = false;
    ["http://", "https://", "file:"].forEach(function(v) { if(src.substr(0, v.length) === v) hasprotocol = true; })
    if(!hasprotocol) {
      var base = window.location.href.split("/").slice(0,-1).join("/");
      if(base.substr(-1) !== "/" && src.substr(0, 1) !== "/")
        base += "/";
      src = base + src;
    }
    return 'ReportGrid.query.request("'+src+'")';
  };
});