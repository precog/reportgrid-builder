define([
  "jquery"
],

function() {
  return function(url) {
    var xhr,
      f = function(success, error, progress) {
        xhr = $.ajax({
          url : url,
          beforeSend : function(xhr) {
            if(xhr.addEventListener && progress) {
              xhr.addEventListener("progress", function(evt) {
                if(evt.lengthComputable) {
                  progress(evt.loaded, evt.total);
                }
              });
            }
          },
          success : function(data, textStatus, xhr) {
            success(data);
          },
          error : function(xhr, textStatus, errorThrown) {
            error(errorThrown || textStatus);
          }
        });
      };
    f.abort = function() {
      if(xhr && xhr.abort) xhr.abort();
    }
    return f;
  };
});