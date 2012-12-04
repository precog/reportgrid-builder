define([

],
//      window.open("data:Application/octet-stream,"+encodeURIComponent(JSON.stringify(report)));
function() {
  return function(content, filename, contentType) {
    filename = filename || "download";
    contentType = contentType || "application/octet-stream";
    var a = document.createElement("a");
    var blob = new Blob([content], {"type":contentType});
    a.href = window.URL.createObjectURL(blob);
    a.download = filename;
    a.click();
  };
});