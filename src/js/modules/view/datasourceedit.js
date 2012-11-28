define([
    "jquery"
  , "lib/util/widget/values/editors"
  , "lib/model/dataloader"
  , "lib/model/modelguesser"
  , "lib/util/ui"
  , "text!templates/form.datasource.html"
],

function($, editors, createLoader, guess, ui, tplForm) {
  return function(ctx) {
    var $el, $error, $fields, $actions, $path, fields, loader;
    function init(container) {
      $el = $('<div class="datasource-form"></div>').append(tplForm).appendTo(container);
      $fields = $el.find("dd.fields");
      $error = $el.find("dd.error").hide();
      $path = $el.find("dd.path");
      $actions = $el.find(".actions");

      var $button = ui.button($actions, {
        label : "save",
        text : true,
//        disabled : true,
        handler : function() {
          ctx.trigger("data.datasource.add", {
            path   : $path.text(),
            name   : ename.value.get(),
            type   : "json",
            src    : stype.value.get(),
            fields : fields
          });
        }
      });

      var ename = editors.create($el.find("dd.name"), "string", {
            placeholder : "Data Source Name"
          }),
          etype = editors.create($('<div class="type"></div>').appendTo($el.find("dd.type")), "selection", {
              default : "",
              values : [{
                value : "url",
                label : "reference url"
              }, {
                value : "text",
                label : "paste data"
              }, {
                value : "file",
                label : "upload file"
              }]
            }),
          $stype = $('<div class="stype"></div>').appendTo($el.find("dd.type")),
          stype;
      etype.value.on("value.change", function(value) {
        if(stype) {
          stype.destroy();
        }
        switch(value) {
          case "text":
            stype = editors.create($stype, "text", {
              placeholder : '[{"country:"USA",value:1000}]'
            });
            break;
          case "url":
            stype = editors.create($stype, "string", {
              placeholder : "http://www.example.com/data.json"
            });
            stype.value.on("value.change", function(value) {
              $error.hide();
              $fields.html("loading ...");
              if(loader) {
                loader.abort();
              }
              loader = createLoader({
                type : "json",
                src  : value
              });
              loader.on("success", function(data) {
                fields = guess.list(data);
                $fields.html(fields.map(function(field) {
                  return field.name;
                }).join(", "));
                ctx.trigger("data.datasource.preview.render", {
                  type : "json",
                  src  : value,
                  fields : fields
                });
              });
              loader.on("error", function(error) {
                $fields.html("-");
                $error.html("error loading the data: " + error);
                $error.show();
              });
              loader.load();
            });
            // TO DO REMOVE ME
            stype.value.set("http://beta.precog.com/analytics/v1/fs/0000000828/?apiKey=907C4B1E-A00D-4B1D-A191-90D4DE00EEB6&q=import%20std%3A%3Atime%3A%3A*%20data%20%3A%3D%20%2F%2FbyAccount%20solve%20'email%20data'%20%3A%3D%20data%20where%20data.email%20%3D%20'email%20data'%20where%20getMillis(data'.timestamp)%20%3D%20max(getMillis(data'.timestamp))");
            break;
          case "file":
            stype = editors.create($stype, "file", {

            });
            break;
        }
      });
      etype.value.set("url");

//      editor = editors.create($option, info.editors[index].type, info.editors[index].options);
///      editor.value.on("value.change", ctx_trigger_handler);
    }
    ctx.on("data.folder.select", function(path) {
      $path.text(path);
    });
    ctx.on("data.datasource.preview.render", function(datasource) {
/*
      var loader = createLoader(datasource);
      loader.on("success", createLoadedHandler(datasource));
      loader.on("error", dataError);
      loader.load();
*/
    });

    ctx.on("data.datasource.preview.clear", function() {
/*
      if(grid) {
        grid.destroy();
        grid = null;
      }
*/
    });

    ctx.on("data.datasource.selected", function(datasource) {
//      ctx.trigger("data.datasource.preview.render", datasource);
    });

    ctx.on("data.datasource.deselected", function(datasource) {
//      ctx.trigger("data.datasource.preview.clear");
    });

    ctx.on("view.data.datasource", init);
  }
});