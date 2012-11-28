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
    var $el, $error, $fields, $actions, $path, fields, loader, dataready = false, nameready = false;
    function init(container) {
      $el = $('<div class="datasource-form"></div>').append(tplForm).appendTo(container);
      $fields = $el.find("dd.fields");
      $error = $el.find("dd.error").hide();
      $path = $el.find("dd.path");
      $actions = $el.find(".actions");

      var $save = ui.button($actions, {
        label : "save",
        text : true,
        disabled : true
        /*
        ,
        handler : function() {
          ctx.trigger("data.datasource.add", {
            path   : $path.text(),
            name   : ename.value.get(),
            type   : "url",
            src    : stype.value.get(),
            fields : fields
          });
        }
        */
      });

      var ename = editors.create($el.find("dd.name"), "string", {
            placeholder : "Data Source Name",
            // TODO add validate function that checks if the path is already taken
          validate : function(value) {
            if(!value) return "name cannot be empty";
            var deferred = $.Deferred(),
              path = $path.text();
            if(path.substr(-1) !== "/") path += "/";
            path += value;

            ctx.on("data.datasource.path.validated", function(vpath, valid, reason) {
              if(path !== vpath) return;
              if(valid) {
                deferred.resolve(null);
                nameready = true;
                changeSaveState();
              }
              else
                deferred.resolve(reason);
            });

            ctx.trigger("data.datasource.path.validate", path);

            return deferred;
          }
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


      ename.value.on("value.validationError", function() {
        ename.el.find("div.error").addClass("ui-state-error ui-corner-all");
        nameready = false;
        changeSaveState();
      });

      function changeSaveState() {
        if(dataready && nameready) {
          $save.button("enable");
        } else {
          $save.button("disable");
        }
      }

      function success(data, type, opt) {
        fields = guess.list(data);
        $fields.html(fields.map(function(field) {
          return field.name;
        }).join(", "));
        ctx.trigger("data.datasource.preview.render", $.extend({ type : type, fields : fields }, opt));
        $save.off("click");
        $save.on("click", function() {
          var path = $path.text();
          if(path.substr(-1) !== "/") path += "/";
          var name = ename.value.get();
          ctx.trigger("data.datasource.add", $.extend({
            path   : path + name,
            name   : name,
            type   : type,
            src    : stype.value.get(),
            fields : fields
          }, opt));
        });
        dataready = true;
        changeSaveState();
      }

      function error(msg) {
        dataready = false;
        changeSaveState();
        ctx.trigger("data.datasource.preview.clear");
        $fields.html("-");
        if(msg) {
          $error.html("error loading the data: " + msg);
          $error.show();
        } else {
          $error.hide();
        }
      }

      function clear() {
        dataready = false;
        changeSaveState();
        if(loader) {
          loader.abort();
        }
        $error.hide();
        $fields.html("-");
        changeSaveState();
      }

      function validateJsonString(s) {
        try {
          var json = JSON.parse(s);
          if(!json instanceof Array || "object" !== typeof json[0])
            return "the json string must be an array of objects";
          else
            return null;
        } catch(e) {
          return "invalid json format: " + e;
        }
      }

      etype.value.on("value.change", function(value) {
        clear();
        if(stype) {
          stype.destroy();
        }
        switch(value) {
          case "text":
            stype = editors.create($stype, "text", {
              placeholder : '[{"country:"USA",value:1000}]',
              validate : validateJsonString
            });
            stype.value.on("value.change", function(data) {
              success(JSON.parse(data), "text", { data : data });
            });
            stype.value.on("value.validationError", function() {
              error(null);
            });
            break;
          case "url":
            stype = editors.create($stype, "string", {
              placeholder : "http://www.example.com/data.json"
            });
            stype.value.on("value.change", function(value) {
              clear();
              $fields.html("loading ...");
              if(loader) {
                loader.abort();
              }
              loader = createLoader({
                type : "url",
                src  : value
              });
              loader.on("success", function(data) {
                success(data, "url", { src : value });
                loader = null;
              });
              loader.on("error", function(msg) {
                error(msg);
                loader = null;
              });
              loader.load();
            });
            // TO DO REMOVE ME
            //stype.value.set("http://beta.precog.com/analytics/v1/fs/0000000828/?apiKey=907C4B1E-A00D-4B1D-A191-90D4DE00EEB6&q=import%20std%3A%3Atime%3A%3A*%20data%20%3A%3D%20%2F%2FbyAccount%20solve%20'email%20data'%20%3A%3D%20data%20where%20data.email%20%3D%20'email%20data'%20where%20getMillis(data'.timestamp)%20%3D%20max(getMillis(data'.timestamp))");
            break;
          case "file":
            stype = editors.create($stype, "file", {

            });
            stype.value.on("value.change", function(file) {
              var reader = new FileReader();
              reader.onload = function(e) {
                var data = e.target.result,
                    validation = validateJsonString(data);
                if(validation) {
                  error(validation);
                } else {
                  success(JSON.parse(data), "text", { data : data });
                }
              };
              reader.readAsText(file);
            });
            break;
        }
        stype.value.on("value.validationError", function() {
          stype.el.find("div.error").addClass("ui-state-error ui-corner-all");
        });
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