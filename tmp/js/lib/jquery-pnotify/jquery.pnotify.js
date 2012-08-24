/*
 * jQuery Pines Notify (pnotify) Plugin 1.2.0
 *
 * http://pinesframework.org/pnotify/
 * Copyright (c) 2009-2012 Hunter Perrin
 *
 * Triple license under the GPL, LGPL, and MPL:
 *	  http://www.gnu.org/licenses/gpl.html
 *	  http://www.gnu.org/licenses/lgpl.html
 *	  http://www.mozilla.org/MPL/MPL-1.1.html
 */

(function(e){var t,n,r,i=e(window),s={jqueryui:{container:"ui-widget ui-widget-content ui-corner-all",notice:"ui-state-highlight",notice_icon:"ui-icon ui-icon-info",info:"",info_icon:"ui-icon ui-icon-info",success:"ui-state-default",success_icon:"ui-icon ui-icon-circle-check",error:"ui-state-error",error_icon:"ui-icon ui-icon-alert",closer:"ui-icon ui-icon-close",pin_up:"ui-icon ui-icon-pin-w",pin_down:"ui-icon ui-icon-pin-s",hi_menu:"ui-state-default ui-corner-bottom",hi_btn:"ui-state-default ui-corner-all",hi_btnhov:"ui-state-hover",hi_hnd:"ui-icon ui-icon-grip-dotted-horizontal"},bootstrap:{container:"alert",notice:"",notice_icon:"icon-exclamation-sign",info:"alert-info",info_icon:"icon-info-sign",success:"alert-success",success_icon:"icon-ok-sign",error:"alert-error",error_icon:"icon-warning-sign",closer:"icon-remove",pin_up:"icon-pause",pin_down:"icon-play",hi_menu:"well",hi_btn:"btn",hi_btnhov:"",hi_hnd:"icon-chevron-down"}},o=function(){r=e("body"),i=e(window),i.bind("resize",function(){n&&clearTimeout(n),n=setTimeout(e.pnotify_position_all,10)})};document.body?o():e(o),e.extend({pnotify_remove_all:function(){var t=i.data("pnotify");t&&t.length&&e.each(t,function(){this.pnotify_remove&&this.pnotify_remove()})},pnotify_position_all:function(){n&&clearTimeout(n),n=null;var t=i.data("pnotify");if(!t||!t.length)return;e.each(t,function(){var e=this.opts.stack;if(!e)return;e.nextpos1=e.firstpos1,e.nextpos2=e.firstpos2,e.addpos2=0,e.animation=!0}),e.each(t,function(){this.pnotify_position()})},pnotify:function(o){var u,a;typeof o!="object"?(a=e.extend({},e.pnotify.defaults),a.text=o):a=e.extend({},e.pnotify.defaults,o);for(var f in a)typeof f=="string"&&f.match(/^pnotify_/)&&(a[f.replace(/^pnotify_/,"")]=a[f]);if(a.before_init&&a.before_init(a)===!1)return null;var l,h=function(t,n){d.css("display","none");var r=document.elementFromPoint(t.clientX,t.clientY);d.css("display","block");var i=e(r),s=i.css("cursor");d.css("cursor",s!="auto"?s:"default");if(!l||l.get(0)!=r)l&&(c.call(l.get(0),"mouseleave",t.originalEvent),c.call(l.get(0),"mouseout",t.originalEvent)),c.call(r,"mouseenter",t.originalEvent),c.call(r,"mouseover",t.originalEvent);c.call(r,n,t.originalEvent),l=i},p=s[a.styling],d=e("<div />",{"class":"ui-pnotify "+a.addclass,css:{display:"none"},mouseenter:function(e){a.nonblock&&e.stopPropagation(),a.mouse_reset&&u=="out"&&(d.stop(!0),u="in",d.css("height","auto").animate({width:a.width,opacity:a.nonblock?a.nonblock_opacity:a.opacity},"fast")),a.nonblock&&d.animate({opacity:a.nonblock_opacity},"fast"),a.hide&&a.mouse_reset&&d.pnotify_cancel_remove(),a.sticker&&!a.nonblock&&d.sticker.trigger("pnotify_icon").css("visibility","visible"),a.closer&&!a.nonblock&&d.closer.css("visibility","visible")},mouseleave:function(t){a.nonblock&&t.stopPropagation(),l=null,d.css("cursor","auto"),a.nonblock&&u!="out"&&d.animate({opacity:a.opacity},"fast"),a.hide&&a.mouse_reset&&d.pnotify_queue_remove(),a.sticker_hover&&d.sticker.css("visibility","hidden"),a.closer_hover&&d.closer.css("visibility","hidden"),e.pnotify_position_all()},mouseover:function(e){a.nonblock&&e.stopPropagation()},mouseout:function(e){a.nonblock&&e.stopPropagation()},mousemove:function(e){a.nonblock&&(e.stopPropagation(),h(e,"onmousemove"))},mousedown:function(e){a.nonblock&&(e.stopPropagation(),e.preventDefault(),h(e,"onmousedown"))},mouseup:function(e){a.nonblock&&(e.stopPropagation(),e.preventDefault(),h(e,"onmouseup"))},click:function(e){a.nonblock&&(e.stopPropagation(),h(e,"onclick"))},dblclick:function(e){a.nonblock&&(e.stopPropagation(),h(e,"ondblclick"))}});d.opts=a,d.container=e("<div />",{"class":p.container+" ui-pnotify-container "+(a.type=="error"?p.error:a.type=="info"?p.info:a.type=="success"?p.success:p.notice)}).appendTo(d),a.cornerclass!=""&&d.container.removeClass("ui-corner-all").addClass(a.cornerclass),a.shadow&&d.container.addClass("ui-pnotify-shadow"),d.pnotify_version="1.2.0",d.pnotify=function(t){var n=a;typeof t=="string"?a.text=t:a=e.extend({},a,t);for(var r in a)typeof r=="string"&&r.match(/^pnotify_/)&&(a[r.replace(/^pnotify_/,"")]=a[r]);d.opts=a,a.cornerclass!=n.cornerclass&&d.container.removeClass("ui-corner-all").addClass(a.cornerclass),a.shadow!=n.shadow&&(a.shadow?d.container.addClass("ui-pnotify-shadow"):d.container.removeClass("ui-pnotify-shadow")),a.addclass===!1?d.removeClass(n.addclass):a.addclass!==n.addclass&&d.removeClass(n.addclass).addClass(a.addclass),a.title===!1?d.title_container.slideUp("fast"):a.title!==n.title&&(a.title_escape?d.title_container.text(a.title).slideDown(200):d.title_container.html(a.title).slideDown(200)),a.text===!1?d.text_container.slideUp("fast"):a.text!==n.text&&(a.text_escape?d.text_container.text(a.text).slideDown(200):d.text_container.html(a.insert_brs?String(a.text).replace(/\n/g,"<br />"):a.text).slideDown(200)),d.pnotify_history=a.history,d.pnotify_hide=a.hide,a.type!=n.type&&d.container.removeClass(p.error+" "+p.notice+" "+p.success+" "+p.info).addClass(a.type=="error"?p.error:a.type=="info"?p.info:a.type=="success"?p.success:p.notice);if(a.icon!==n.icon||a.icon===!0&&a.type!=n.type)d.container.find("div.ui-pnotify-icon").remove(),a.icon!==!1&&e("<div />",{"class":"ui-pnotify-icon"}).append(e("<span />",{"class":a.icon===!0?a.type=="error"?p.error_icon:a.type=="info"?p.info_icon:a.type=="success"?p.success_icon:p.notice_icon:a.icon})).prependTo(d.container);return a.width!==n.width&&d.animate({width:a.width}),a.min_height!==n.min_height&&d.container.animate({minHeight:a.min_height}),a.opacity!==n.opacity&&d.fadeTo(a.animate_speed,a.opacity),!a.closer||a.nonblock?d.closer.css("display","none"):d.closer.css("display","block"),!a.sticker||a.nonblock?d.sticker.css("display","none"):d.sticker.css("display","block"),d.sticker.trigger("pnotify_icon"),a.sticker_hover?d.sticker.css("visibility","hidden"):a.nonblock||d.sticker.css("visibility","visible"),a.closer_hover?d.closer.css("visibility","hidden"):a.nonblock||d.closer.css("visibility","visible"),a.hide?n.hide||d.pnotify_queue_remove():d.pnotify_cancel_remove(),d.pnotify_queue_position(),d},d.pnotify_position=function(e){var t=d.opts.stack;if(!t)return;t.nextpos1||(t.nextpos1=t.firstpos1),t.nextpos2||(t.nextpos2=t.firstpos2),t.addpos2||(t.addpos2=0);var n=d.css("display")=="none";if(!n||e){var r,s,o={},u;switch(t.dir1){case"down":u="top";break;case"up":u="bottom";break;case"left":u="right";break;case"right":u="left"}r=parseInt(d.css(u)),isNaN(r)&&(r=0),typeof t.firstpos1=="undefined"&&!n&&(t.firstpos1=r,t.nextpos1=t.firstpos1);var a;switch(t.dir2){case"down":a="top";break;case"up":a="bottom";break;case"left":a="right";break;case"right":a="left"}s=parseInt(d.css(a)),isNaN(s)&&(s=0),typeof t.firstpos2=="undefined"&&!n&&(t.firstpos2=s,t.nextpos2=t.firstpos2);if(t.dir1=="down"&&t.nextpos1+d.height()>i.height()||t.dir1=="up"&&t.nextpos1+d.height()>i.height()||t.dir1=="left"&&t.nextpos1+d.width()>i.width()||t.dir1=="right"&&t.nextpos1+d.width()>i.width())t.nextpos1=t.firstpos1,t.nextpos2+=t.addpos2+(typeof t.spacing2=="undefined"?25:t.spacing2),t.addpos2=0;if(t.animation&&t.nextpos2<s)switch(t.dir2){case"down":o.top=t.nextpos2+"px";break;case"up":o.bottom=t.nextpos2+"px";break;case"left":o.right=t.nextpos2+"px";break;case"right":o.left=t.nextpos2+"px"}else d.css(a,t.nextpos2+"px");switch(t.dir2){case"down":case"up":d.outerHeight(!0)>t.addpos2&&(t.addpos2=d.height());break;case"left":case"right":d.outerWidth(!0)>t.addpos2&&(t.addpos2=d.width())}if(t.nextpos1)if(t.animation&&(r>t.nextpos1||o.top||o.bottom||o.right||o.left))switch(t.dir1){case"down":o.top=t.nextpos1+"px";break;case"up":o.bottom=t.nextpos1+"px";break;case"left":o.right=t.nextpos1+"px";break;case"right":o.left=t.nextpos1+"px"}else d.css(u,t.nextpos1+"px");(o.top||o.bottom||o.right||o.left)&&d.animate(o,{duration:500,queue:!1});switch(t.dir1){case"down":case"up":t.nextpos1+=d.height()+(typeof t.spacing1=="undefined"?25:t.spacing1);break;case"left":case"right":t.nextpos1+=d.width()+(typeof t.spacing1=="undefined"?25:t.spacing1)}}},d.pnotify_queue_position=function(t){n&&clearTimeout(n),t||(t=10),n=setTimeout(e.pnotify_position_all,t)},d.pnotify_display=function(){d.parent().length||d.appendTo(r);if(a.before_open&&a.before_open(d)===!1)return;a.stack.push!="top"&&d.pnotify_position(!0),a.animation=="fade"||a.animation.effect_in=="fade"?d.show().fadeTo(0,0).hide():a.opacity!=1&&d.show().fadeTo(0,a.opacity).hide(),d.animate_in(function(){a.after_open&&a.after_open(d),d.pnotify_queue_position(),a.hide&&d.pnotify_queue_remove()})},d.pnotify_remove=function(){d.timer&&(window.clearTimeout(d.timer),d.timer=null);if(a.before_close&&a.before_close(d)===!1)return;d.animate_out(function(){if(a.after_close&&a.after_close(d)===!1)return;d.pnotify_queue_position(),a.remove&&d.detach()})},d.animate_in=function(e){u="in";var t;typeof a.animation.effect_in!="undefined"?t=a.animation.effect_in:t=a.animation,t=="none"?(d.show(),e()):t=="show"?d.show(a.animate_speed,e):t=="fade"?d.show().fadeTo(a.animate_speed,a.opacity,e):t=="slide"?d.slideDown(a.animate_speed,e):typeof t=="function"?t("in",e,d):d.show(t,typeof a.animation.options_in=="object"?a.animation.options_in:{},a.animate_speed,e)},d.animate_out=function(e){u="out";var t;typeof a.animation.effect_out!="undefined"?t=a.animation.effect_out:t=a.animation,t=="none"?(d.hide(),e()):t=="show"?d.hide(a.animate_speed,e):t=="fade"?d.fadeOut(a.animate_speed,e):t=="slide"?d.slideUp(a.animate_speed,e):typeof t=="function"?t("out",e,d):d.hide(t,typeof a.animation.options_out=="object"?a.animation.options_out:{},a.animate_speed,e)},d.pnotify_cancel_remove=function(){d.timer&&window.clearTimeout(d.timer)},d.pnotify_queue_remove=function(){d.pnotify_cancel_remove(),d.timer=window.setTimeout(function(){d.pnotify_remove()},isNaN(a.delay)?0:a.delay)},d.closer=e("<div />",{"class":"ui-pnotify-closer",css:{cursor:"pointer",visibility:a.closer_hover?"hidden":"visible"},click:function(){d.pnotify_remove(),d.sticker.css("visibility","hidden"),d.closer.css("visibility","hidden")}}).append(e("<span />",{"class":p.closer})).appendTo(d.container),(!a.closer||a.nonblock)&&d.closer.css("display","none"),d.sticker=e("<div />",{"class":"ui-pnotify-sticker",css:{cursor:"pointer",visibility:a.sticker_hover?"hidden":"visible"},click:function(){a.hide=!a.hide,a.hide?d.pnotify_queue_remove():d.pnotify_cancel_remove(),e(this).trigger("pnotify_icon")}}).bind("pnotify_icon",function(){e(this).children().removeClass(p.pin_up+" "+p.pin_down).addClass(a.hide?p.pin_up:p.pin_down)}).append(e("<span />",{"class":p.pin_up})).appendTo(d.container),(!a.sticker||a.nonblock)&&d.sticker.css("display","none"),a.icon!==!1&&e("<div />",{"class":"ui-pnotify-icon"}).append(e("<span />",{"class":a.icon===!0?a.type=="error"?p.error_icon:a.type=="info"?p.info_icon:a.type=="success"?p.success_icon:p.notice_icon:a.icon})).prependTo(d.container),d.title_container=e("<h4 />",{"class":"ui-pnotify-title"}).appendTo(d.container),a.title===!1?d.title_container.hide():a.title_escape?d.title_container.text(a.title):d.title_container.html(a.title),d.text_container=e("<div />",{"class":"ui-pnotify-text"}).appendTo(d.container),a.text===!1?d.text_container.hide():a.text_escape?d.text_container.text(a.text):d.text_container.html(a.insert_brs?String(a.text).replace(/\n/g,"<br />"):a.text),typeof a.width=="string"&&d.css("width",a.width),typeof a.min_height=="string"&&d.container.css("min-height",a.min_height),d.pnotify_history=a.history,d.pnotify_hide=a.hide;var v=i.data("pnotify");if(v==null||typeof v!="object")v=[];a.stack.push=="top"?v=e.merge([d],v):v=e.merge(v,[d]),i.data("pnotify",v),a.stack.push=="top"&&d.pnotify_queue_position(1),a.after_init&&a.after_init(d);if(a.history){var m=i.data("pnotify_history");if(typeof m=="undefined"){m=e("<div />",{"class":"ui-pnotify-history-container "+p.hi_menu,mouseleave:function(){m.animate({top:"-"+t+"px"},{duration:100,queue:!1})}}).append(e("<div />",{"class":"ui-pnotify-history-header",text:"Redisplay"})).append(e("<button />",{"class":"ui-pnotify-history-all "+p.hi_btn,text:"All",mouseenter:function(){e(this).addClass(p.hi_btnhov)},mouseleave:function(){e(this).removeClass(p.hi_btnhov)},click:function(){return e.each(v,function(){this.pnotify_history&&(this.is(":visible")?this.pnotify_hide&&this.pnotify_queue_remove():this.pnotify_display&&this.pnotify_display())}),!1}})).append(e("<button />",{"class":"ui-pnotify-history-last "+p.hi_btn,text:"Last",mouseenter:function(){e(this).addClass(p.hi_btnhov)},mouseleave:function(){e(this).removeClass(p.hi_btnhov)},click:function(){var e=-1,t;do{e==-1?t=v.slice(e):t=v.slice(e,e+1);if(!t[0])break;e--}while(!t[0].pnotify_history||t[0].is(":visible"));return t[0]?(t[0].pnotify_display&&t[0].pnotify_display(),!1):!1}})).appendTo(r);var g=e("<span />",{"class":"ui-pnotify-history-pulldown "+p.hi_hnd,mouseenter:function(){m.animate({top:"0"},{duration:100,queue:!1})}}).appendTo(m);t=g.offset().top+2,m.css({top:"-"+t+"px"}),i.data("pnotify_history",m)}}return a.stack.animation=!1,d.pnotify_display(),d}});var u=/^on/,a=/^(dbl)?click$|^mouse(move|down|up|over|out|enter|leave)$|^contextmenu$/,f=/^(focus|blur|select|change|reset)$|^key(press|down|up)$/,l=/^(scroll|resize|(un)?load|abort|error)$/,c=function(t,n){var r;t=t.toLowerCase();if(document.createEvent&&this.dispatchEvent){t=t.replace(u,""),t.match(a)?(e(this).offset(),r=document.createEvent("MouseEvents"),r.initMouseEvent(t,n.bubbles,n.cancelable,n.view,n.detail,n.screenX,n.screenY,n.clientX,n.clientY,n.ctrlKey,n.altKey,n.shiftKey,n.metaKey,n.button,n.relatedTarget)):t.match(f)?(r=document.createEvent("UIEvents"),r.initUIEvent(t,n.bubbles,n.cancelable,n.view,n.detail)):t.match(l)&&(r=document.createEvent("HTMLEvents"),r.initEvent(t,n.bubbles,n.cancelable));if(!r)return;this.dispatchEvent(r)}else t.match(u)||(t="on"+t),r=document.createEventObject(n),this.fireEvent(t,r)};e.pnotify.defaults={title:!1,title_escape:!1,text:!1,text_escape:!1,styling:"bootstrap",addclass:"",cornerclass:"",nonblock:!1,nonblock_opacity:.2,history:!0,width:"300px",min_height:"16px",type:"notice",icon:!0,animation:"fade",animate_speed:"slow",opacity:1,shadow:!0,closer:!0,closer_hover:!0,sticker:!0,sticker_hover:!0,hide:!0,delay:8e3,mouse_reset:!0,remove:!0,insert_brs:!0,stack:{dir1:"down",dir2:"left",push:"bottom",spacing1:25,spacing2:25}}})(jQuery)