define([
    "lib/model/exports/exportarray"
  , "lib/model/exports/exporttext"
  , "lib/model/exports/exporturl"
],

function(earray, etext, eurl){
  var converters = {
    array : earray,
    text  : etext,
    url   : eurl
  };
  return function(datasource) {
    var type = datasource.type.toLowerCase();
    if(!converters[type])
      throw "a datasource of type '" + datasource.type + "' is not supported (yet)";
    return converters[type](datasource);
  };
});