define([
    "jquery"
  , "lib/model/datasource"
],

function($, datasource) {
  var examples = [{
          name : "Olympic Medals 2011",
          src  : "olympic-medals-2011.json",
          fields : [{
              name : "country",
              type : "category" // continuous, discrete, category, time
            }
            , { name : "code", type : "category" }
            , { name : "summers", type : "discrete" }
            , { name : "summerGold", type : "discrete" }
            , { name : "summerSilver", type : "discrete" }
            , { name : "summerBronze", type : "discrete" }
            , { name : "summerTotal", type : "discrete" }
            , { name : "winters", type : "discrete" }
            , { name : "winterGold", type : "discrete" }
            , { name : "winterSilver", type : "discrete" }
            , { name : "winterBronze", type : "discrete" }
            , { name : "winterTotal", type : "discrete" }
            , { name : "games", type : "discrete" }
            , { name : "golds", type : "discrete" }
            , { name : "silvers", type : "discrete" }
            , { name : "bronzes", type : "discrete" }
            , { name : "total", type : "discrete" }
          ]
        }, {
          name : "English Speakers",
          src  : "english-speakers.json",
          fields : [
              { name : "country", type : "category" }
            , { name : "count", type : "discrete" }
          ]
        }, {
          name : "Iris",
          srs : "iris.json",
          fields : [
              { name : "sepalLength", type : "continuous" }
            , { name : "sepalWidth", type : "continuous" }
            , { name : "petalLength", type : "continuous" }
            , { name : "petalWidth", type : "continuous" }
            , { name : "category", type : "category" }
          ]
        }]
      root = "",
      datapath = "data";

  function path() {
    return $.makeArray(arguments).join("/");
  }

  return function(ctx) {
    ctx.on("data.system.ready", function(fs) {
      fs.add(root, "folder");
      $(examples).each(function(i, example) {
        var ds = datasource(datapath+"/"+example.src);
//        ds.one("success", function(data) {
          fs.add(path(root, example.name), "datasource");
//        });
        if(example.fields) {
          $(example.fields).each(function(i, field) {
            fs.add(path(root, example.name, field.name), field.type);
          });
        }
//        ds.load();
        // add model
        // define datasource loader
        // wire request datasource loading
        // wire response datasource loading
        // add fields
      });
    });
  };
});