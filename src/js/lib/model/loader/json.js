define([
  "jquery"
],

function() {
  return function(url) {
    return function(success, error, progress) {
      $.ajax({
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
          success(data);
        }
      });
    };
  };
});