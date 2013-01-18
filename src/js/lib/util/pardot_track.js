define([
    "jquery"
  , "lib/util/iframesubmit"
  , "lib/util/view/widgets/dialog_support"
  , "ext/jquery-cookie/jquery.cookie"
],

function($, submit, displaySupport) {
  var COOKIE_EMAIL = "Precog_eMail",
      PAGE_ACTION = "actions/",
      FORM_ACTION = "http://www2.precog.com/l/",
      wrapper,
      queue = [],
      email = $.cookie(COOKIE_EMAIL),
      action_map = {
        "quirrel_failure_default" : "17892/2013-01-14/29k3q",
        "quirrel_failure_custom"  : "17892/2013-01-14/29k52",
        "generic_error"           : "17892/2013-01-14/29k5d"
      };


  return wrapper = {
    track_page : function(action) {
      submit({
        action : (action_map[action] || action),
        method : "get",
        complete : function() {
          console.log("Page Action: " + action);
        }
      });
    },
    track_error : function(action, params, user_message) {
      params = params || {};
      if(!email) {
        displaySupport("report error", user_message, null, params.error_message, false, function(e, r) {
          email = e;
          $.cookie(COOKIE_EMAIL, email);
          params.error_message = r;
          wrapper.track_error(action, params, user_message);
        });
      } else {
        params.email = email;
        submit({
          action : FORM_ACTION + (action_map[action] || action),
          method : "post",
          data : params,
          complete : function() {
            console.log("Form Submit: " + action);
          }
        });
      }
    }
  };
});
