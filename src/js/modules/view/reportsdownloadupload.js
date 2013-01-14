define([
    "jquery"
  , "lib/util/localdownload"
  , "lib/util/localupload"
],

function($, download, upload) {

  return function(ctx) {
    ctx.on("reports.report.export", function(report, path) {
      download(JSON.stringify(report), path.split("/").pop()+".json")
    });

    ctx.on("reports.report.importpath", function(path) {
      upload(
        function(file) {
          // TODO check it works fine for filenames with no extensions
          var name = file.name.split(".").slice(0, -1).join(".");
          var reader = new FileReader();
          reader.onload = function(e) {
            var json = JSON.parse(e.target.result);
            ctx.trigger("reports.report.import", path, name, json);
          };
          reader.readAsBinaryString(file);
        },
        "upload a report",
        "please select a report file",
        function(file) {
          var reader = new FileReader(),
              deferred = new $.Deferred();
          reader.onload = function(e) {
            var content = e.target.result;
            try {
              var json = JSON.parse(content);
              if(!json.chart || "undefined" === typeof json.datasource || !json.dimensions || !json.options) {
                deferred.resolve("the file does not contain the properties required for a report")
              } else {
                deferred.resolve(null);
              }
            } catch(e) {
              deferred.resolve("wrong file format")
            }
          };
          reader.readAsBinaryString(file);
          return deferred;
        });
    });

    ctx.on("reports.report.import", function(opath, name, content) {
      var path = opath;
      if(path.substr(-1) !== "/") path += "/";
      path += name;

      ctx.request("report.path.validate", path, function(response) {
        if(response.valid) {
          ctx.trigger("reports.report.add", path, content);
        } else {
          var result = window.prompt("A report with name '"+name+"' already exists, please try a different name:", name);
          if(!result || !(result = result.trim()))
            return;
          ctx.trigger("reports.report.import", opath, result, content);
        }
      });
    });
  };
});