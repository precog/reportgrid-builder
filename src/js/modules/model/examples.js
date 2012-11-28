define([
    "jquery"
],

function($) {
  var examples = [{
          name : "Olympic Medals 2011",
          src  : "olympic-medals-2011.json",
          fields : [{
              name : "country",
              type : "category" // continuous, discrete, category, time
            }
            , { field : "code", type : "category" }
            , { field : "summers", type : "discrete" }
            , { field : "summerGold", type : "discrete" }
            , { field : "summerSilver", type : "discrete" }
            , { field : "summerBronze", type : "discrete" }
            , { field : "summerTotal", type : "discrete" }
            , { field : "winters", type : "discrete" }
            , { field : "winterGold", type : "discrete" }
            , { field : "winterSilver", type : "discrete" }
            , { field : "winterBronze", type : "discrete" }
            , { field : "winterTotal", type : "discrete" }
            , { field : "games", type : "discrete" }
            , { field : "golds", type : "discrete" }
            , { field : "silvers", type : "discrete" }
            , { field : "bronzes", type : "discrete" }
            , { field : "total", type : "discrete" }
          ]
        }, {
          name : "English Speakers",
          src  : "english-speakers.json",
          fields : [
              { field : "country", type : "category" }
            , { field : "count", type : "discrete" }
          ]
        }, {
          name : "Iris",
          src : "iris.json",
          fields : [
              { field : "sepalLength", type : "continuous" }
            , { field : "sepalWidth", type : "continuous" }
            , { field : "petalLength", type : "continuous" }
            , { field : "petalWidth", type : "continuous" }
            , { field : "category", type : "category" }
          ]
        }, {
          name : "Boulder Weather 2011",
          src  : "boulder-weather-2011.json",
          fields : [
              { name : "day", field:"time:day", type : "time" }
            , { field : "tMax", type : "continuous" }
            , { field : "tMin", type : "continuous" }
            , { field : "tAverage", type : "continuous" }
            , { field : "precipitation", type : "continuous" }
            , { field : "snow", type : "continuous" }
            , { field : "snowCover", type : "continuous" }
          ]
        }, {
          name : "Boulder Weather 2011 - Q1",
          src  : "boulder-weather-2011-1Q.json",
          fields : [
              { name : "day", field:"time:day", type : "time" }
            , { field : "tMax", type : "continuous" }
            , { field : "tMin", type : "continuous" }
            , { field : "tAverage", type : "continuous" }
            , { field : "precipitation", type : "continuous" }
            , { field : "snow", type : "continuous" }
            , { field : "snowCover", type : "continuous" }
          ]
        }, {
          name : "Fictional Movie Clips",
          src  : "fic-clips.json",
          fields : [
              { field : "id", type : "category" }
            , { field : "count", type : "discrete" }
            , { field : "head", type : "category" }
            , { field : "tail", type : "category" }
          ]
        }, {
          name : "Fictional Sales",
          src  : "fic-sales.json",
          fields : [
              { field : "model", type : "category" }
            , { field : "market", type : "category" }
            , { field : "quarter", type : "category" }
            , { field : "value", type : "continuous" }
          ]
        }, {
          name : "Twitter Emoticons - Top 10",
          src  : "top10-emoticons-twitter.json",
          fields : [
              { field : "emoticon", type : "category" }
            , { field : "count", type : "discrete" }
          ]
        }, {
          name : "Twitter Emoticons - Top 20",
          src  : "top20-emoticons-twitter.json",
          fields : [
              { field : "emoticon", type : "category" }
            , { field : "count", type : "discrete" }
          ]
        }, {
          name : "USA - Population Age",
          src  : "usa-agestructure.json",
          fields : [
              { field : "age", type : "category" }
            , { field : "gender", type : "category" }
            , { field : "count", type : "discrete" }
          ]
        }, {
          name : "USA - Death Rate by Gender and Race - full",
          src  : "usa-deathrate-by-gender-and-race-full.json",
          fields : [
              { field : "year", type : "discrete" }
            , { field : "gender", type : "category" }
            , { field : "deathRate", type : "continuous" }
            , { field : "race", type : "category" }
          ]
        }, {
          name : "USA - Death Rate by Gender and Race",
          src  : "usa-deathrate-by-gender-and-race.json",
          fields : [
            { field : "year", type : "discrete" }
            , { field : "gender", type : "category" }
            , { field : "deathRate", type : "continuous" }
            , { field : "race", type : "category" }
          ]
        }, {
          name : "USA - Death Rate by Gender",
          src  : "usa-deathrate-by-gender.json",
          fields : [
            { field : "year", type : "discrete" }
            , { field : "gender", type : "category" }
            , { field : "deathRate", type : "continuous" }
          ]
        }, {
          name : "USA - Death Rate by Race",
          src  : "usa-deathrate-by-race.json",
          fields : [
            { field : "year", type : "discrete" }
            , { field : "deathRate", type : "continuous" }
            , { field : "race", type : "category" }
          ]
        }, {
          name : "USA - Debt",
          src  : "usa-debt.json",
          fields : [
              { field : "country", type : "category" }
            , { field : "date", type : "category" }
            , { field : "value", type : "continuous" }
          ]
        }, {
          name : "USA - Gross Public Debt",
          src  : "usa-gross-public-debt.json",
          fields : [
              { field : "year", type : "discrete" }
            , { field : "grossDebt", type : "continuous" }
            , { field : "publicDebt", type : "continuous" }
          ]
        }, {
          name : "USA - Population and Areas 1790-2000",
          src  : "usa-population-and-area-1790-2000.json",
          fields : [
              { field : "year", type : "discrete" }
            , { field : "population", type : "continuous" }
            , { field : "area", type : "continuous" }
          ]
        }

          /*, {
          name : "",
          src  : "",
          fields : [
              { field : "", type : "" }
            , { field : "", type : "" }
          ]
        }*/]
      root = "/examples", // in the form of /path or empty
      datapath = "data";

  function path() {
    return $.makeArray(arguments).join("/");
  }

  return function(ctx) {
    ctx.on("modules.ready", function() {
      $(examples).each(function(i, example) {
        example.src  = path(datapath,example.src);
        example.type = example.type || "url";
        example.path = path(root, example.name);
        for(var i = 0; i < example.fields.length; i++) {
          var field = example.fields[i];
          field.name = field.name || field.field;
        }
        ctx.trigger("data.datasource.add", example);
      });
    });
  };
});