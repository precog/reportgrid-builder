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
          src : "iris.json",
          fields : [
              { name : "sepalLength", type : "continuous" }
            , { name : "sepalWidth", type : "continuous" }
            , { name : "petalLength", type : "continuous" }
            , { name : "petalWidth", type : "continuous" }
            , { name : "category", type : "category" }
          ]
        }, {
          name : "Boulder Weather 2011",
          src  : "boulder-weather-2011.json",
          fields : [
              { name : "day", field:"time:day", type : "time" }
            , { name : "tMax", type : "continuous" }
            , { name : "tMin", type : "continuous" }
            , { name : "tAverage", type : "continuous" }
            , { name : "precipitation", type : "continuous" }
            , { name : "snow", type : "continuous" }
            , { name : "snowCover", type : "continuous" }
          ]
        }, {
          name : "Boulder Weather 2011 - Q1",
          src  : "boulder-weather-2011-1Q.json",
          fields : [
              { name : "day", field:"time:day", type : "time" }
            , { name : "tMax", type : "continuous" }
            , { name : "tMin", type : "continuous" }
            , { name : "tAverage", type : "continuous" }
            , { name : "precipitation", type : "continuous" }
            , { name : "snow", type : "continuous" }
            , { name : "SnowCover", type : "continuous" }
          ]
        }, {
          name : "Fictional Movie Clips",
          src  : "fic-clips.json",
          fields : [
              { name : "id", type : "category" }
            , { name : "count", type : "discrete" }
            , { name : "head", type : "category" }
            , { name : "tail", type : "category" }
          ]
        }, {
          name : "Fictional Sales",
          src  : "fic-sales.json",
          fields : [
              { name : "model", type : "category" }
            , { name : "market", type : "category" }
            , { name : "quarter", type : "category" }
            , { name : "value", type : "continuous" }
          ]
        }, {
          name : "Twitter Emoticons - Top 10",
          src  : "top10-emoticons-twitter.json",
          fields : [
              { name : "emoticon", type : "category" }
            , { name : "count", type : "discrete" }
          ]
        }, {
          name : "Twitter Emoticons - Top 20",
          src  : "top20-emoticons-twitter.json",
          fields : [
              { name : "emoticon", type : "category" }
            , { name : "count", type : "discrete" }
          ]
        }, {
          name : "USA - Population Age",
          src  : "usa-agestructure.json",
          fields : [
              { name : "age", type : "category" }
            , { name : "gender", type : "category" }
            , { name : "count", type : "discrete" }
          ]
        }, {
          name : "USA - Death Rate by Gender and Race - full",
          src  : "usa-deathrate-by-gender-and-race-full.json",
          fields : [
              { name : "year", type : "discrete" }
            , { name : "gender", type : "category" }
            , { name : "deathRate", type : "continuous" }
            , { name : "race", type : "category" }
          ]
        }, {
          name : "USA - Death Rate by Gender and Race",
          src  : "usa-deathrate-by-gender-and-race.json",
          fields : [
            { name : "year", type : "discrete" }
            , { name : "gender", type : "category" }
            , { name : "deathRate", type : "continuous" }
            , { name : "race", type : "category" }
          ]
        }, {
          name : "USA - Death Rate by Gender",
          src  : "usa-deathrate-by-gender.json",
          fields : [
            { name : "year", type : "discrete" }
            , { name : "gender", type : "category" }
            , { name : "deathRate", type : "continuous" }
          ]
        }, {
          name : "USA - Death Rate by Race",
          src  : "usa-deathrate-by-race.json",
          fields : [
            { name : "year", type : "discrete" }
            , { name : "deathRate", type : "continuous" }
            , { name : "race", type : "category" }
          ]
        }, {
          name : "USA - Debt",
          src  : "usa-debt.json",
          fields : [
              { name : "country", type : "category" }
            , { name : "date", type : "category" }
            , { name : "value", type : "continuous" }
          ]
        }, {
          name : "USA - Gross Public Debt",
          src  : "usa-gross-public-debt.json",
          fields : [
              { name : "year", type : "discrete" }
            , { name : "grossDebt", type : "continuous" }
            , { name : "publicDebt", type : "continuous" }
          ]
        }, {
          name : "USA - Population and Areas 1790-2000",
          src  : "usa-population-and-area-1790-2000.json",
          fields : [
              { name : "year", type : "discrete" }
            , { name : "population", type : "continuous" }
            , { name : "area", type : "continuous" }
          ]
        }

          /*, {
          name : "",
          src  : "",
          fields : [
              { name : "", type : "" }
            , { name : "", type : "" }
          ]
        }*/]
      root = "",
      datapath = "data";

  function path() {
    return $.makeArray(arguments).join("/");
  }

  return function(ctx) {
    ctx.on("modules.ready", function() {
      $(examples).each(function(i, example) {
//        example.datasource = datasource(path(datapath,example.src));

        example.src  = path(datapath,example.src);
        example.type = example.type || "json";
        example.name = path(root, example.name);
        var fields = example.fields;
        example.fields = { list : fields };
        var o = {};
        for(var i = 0; i < fields.length; i++) {
          var field = fields[i];
          o[field.name] = field;
        }
        example.fields.map = o;
        ctx.trigger("data.source.add", example);
      });
    });
  };
});