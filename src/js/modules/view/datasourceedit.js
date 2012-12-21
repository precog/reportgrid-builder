define([
    "jquery"
  , "lib/util/view/editors/editors"
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
      });

      var ename = editors.create($el.find("dd.name"), "string", {
            placeholder : "Data Source Name",
            validate : function(value) {
              if(!value) return "name cannot be empty";
              var deferred = $.Deferred(),
                path = $path.text();
              if(path.substr(-1) !== "/") path += "/";
              path += value;

              ctx.request("datasource.path.validate", path, function(response) {
                if(response.valid) {
                  deferred.resolve(null);
                  nameready = true;
                  change_save_state();
                } else {
                  deferred.resolve(response.reason);
                }
              });

              return deferred;
            }
          }),
          etype = editors.create($('<div class="type"></div>').appendTo($el.find("dd.type")), "selection", {
              default : "",
              values : [{
                value : "url",
                label : "remote service"
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
        change_save_state();
      });

      function change_save_state() {
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
          nameready = false;
          change_save_state();
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
        change_save_state();
      }

      function error(msg) {
        dataready = false;
        change_save_state();
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
        change_save_state();
        if(loader) {
          loader.abort();
        }
        $error.hide();
        $fields.html("-");
        change_save_state();
      }

      function validate_json_string(s) {
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
              validate : validate_json_string
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
            break;
          case "file":
            stype = editors.create($stype, "file", {

            });
            stype.value.on("value.change", function(file) {
              var reader = new FileReader();
              reader.onload = function(e) {
                var data = e.target.result,
                    validation = validate_json_string(data);
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

    }
    ctx.on("data.folder.select", function(path) {
      $path.text(path);
    });

    ctx.one("view.data.datasource", init);
  }
});