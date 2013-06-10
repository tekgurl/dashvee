/*!
 * fancyBox - jQuery Plugin
 * version: 2.0.3 (29/11/2011)
 * @requires jQuery v1.6 or later
 *
 * Examples at http://fancyapps.com/fancybox/
 * License: www.fancyapps.com/fancybox/#license
 *
 * Copyright 2011 Janis Skarnelis - janis@fancyapps.com
 *
 */
(function(e,t,n){var r=n(e),i=n(t),s=n.fancybox=function(){s.open.apply(this,arguments)},o=!1,u=null;n.extend(s,{version:"2.0.3",defaults:{padding:15,margin:20,width:800,height:600,minWidth:200,minHeight:200,maxWidth:9999,maxHeight:9999,autoSize:!0,fitToView:!0,aspectRatio:!1,topRatio:.5,fixed:!n.browser.msie||n.browser.version>6,scrolling:"auto",wrapCSS:"fancybox-default",arrows:!0,closeBtn:!0,closeClick:!1,nextClick:!1,mouseWheel:!0,autoPlay:!1,playSpeed:3e3,modal:!1,loop:!0,ajax:{},keys:{next:[13,32,34,39,40],prev:[8,33,37,38],close:[27]},index:0,type:null,href:null,content:null,title:null,tpl:{wrap:'<div class="fancybox-wrap"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div>',image:'<img class="fancybox-image" src="{href}" alt="" />',iframe:'<iframe class="fancybox-iframe" name="fancybox-frame{rnd}" frameborder="0" hspace="0" '+(n.browser.msie?'allowtransparency="true""':"")+' scrolling="{scrolling}" src="{href}"></iframe>',swf:'<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="wmode" value="transparent" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{href}" /><embed src="{href}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="100%" height="100%" wmode="transparent"></embed></object>',error:'<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',closeBtn:'<div title="Close" class="fancybox-item fancybox-close"></div>',next:'<a title="Next" class="fancybox-item fancybox-next"><span></span></a>',prev:'<a title="Previous" class="fancybox-item fancybox-prev"><span></span></a>'},openEffect:"fade",openSpeed:500,openEasing:"swing",openOpacity:!0,openMethod:"zoomIn",closeEffect:"fade",closeSpeed:500,closeEasing:"swing",closeOpacity:!0,closeMethod:"zoomOut",nextEffect:"elastic",nextSpeed:300,nextEasing:"swing",nextMethod:"changeIn",prevEffect:"elastic",prevSpeed:300,prevEasing:"swing",prevMethod:"changeOut",helpers:{overlay:{speedIn:0,speedOut:0,opacity:.85,css:{cursor:"pointer","background-color":"rgba(0, 0, 0, 0.85)"},closeClick:!0},title:{type:"float"}},onCancel:n.noop,beforeLoad:n.noop,afterLoad:n.noop,beforeShow:n.noop,afterShow:n.noop,beforeClose:n.noop,afterClose:n.noop},group:{},opts:{},coming:null,current:null,isOpen:!1,isOpened:!1,wrap:null,outer:null,inner:null,player:{timer:null,isActive:!1},ajaxLoad:null,imgPreload:null,transitions:{},helpers:{},open:function(e,t){n.isArray(e)||(e=[e]);if(!e.length)return;s.close(!0),s.opts=n.extend(!0,{},s.defaults,t),s.group=e,s._start(s.opts.index||0)},cancel:function(){if(s.coming&&!1===s.trigger("onCancel"))return;s.coming=null,s.hideLoading(),s.ajaxLoad&&s.ajaxLoad.abort(),s.ajaxLoad=null,s.imgPreload&&(s.imgPreload.onload=s.imgPreload.onabort=s.imgPreload.onerror=null)},close:function(e){s.cancel();if(!s.current||!1===s.trigger("beforeClose"))return;s.unbindEvents(),!s.isOpen||e&&e[0]===!0?(n(".fancybox-wrap").stop().trigger("onReset").remove(),s._afterZoomOut()):(s.isOpen=s.isOpened=!1,n(".fancybox-item").remove(),s.wrap.stop(!0).removeClass("fancybox-opened"),s.inner.css("overflow","hidden"),s.transitions[s.current.closeMethod]())},play:function(e){var t=function(){clearTimeout(s.player.timer)},r=function(){t(),s.current&&s.player.isActive&&(s.player.timer=setTimeout(s.next,s.current.playSpeed))},i=function(){t(),n("body").unbind(".player"),s.player.isActive=!1,s.trigger("onPlayEnd")},o=function(){s.current&&(s.current.loop||s.current.index<s.group.length-1)&&(s.player.isActive=!0,r(),n("body").bind({"onCancel.player afterShow.player onUpdate.player":r,"beforeClose.player":i,"beforeLoad.player":t}),s.trigger("onPlayStart"))};s.player.isActive||e&&e[0]===!1?i():o()},next:function(){s.current&&s.jumpto(s.current.index+1)},prev:function(){s.current&&s.jumpto(s.current.index-1)},jumpto:function(e){if(!s.current)return;e=parseInt(e,10),s.group.length>1&&s.current.loop&&(e>=s.group.length?e=0:e<0&&(e=s.group.length-1)),typeof s.group[e]!="undefined"&&(s.cancel(),s._start(e))},reposition:function(e){s.isOpen&&s.wrap.css(s._getPosition(e))},update:function(){s.isOpen&&(o||(u=setInterval(function(){o&&(o=!1,clearTimeout(u),s.current&&(s.current.autoSize&&(s.inner.height("auto"),s.current.height=s.inner.height()),s._setDimension(),s.current.canGrow&&s.inner.height("auto"),s.reposition(),s.trigger("onUpdate")))},100)),o=!0)},toggle:function(){s.isOpen&&(s.current.fitToView=!s.current.fitToView,s.update())},hideLoading:function(){n("#fancybox-loading").remove()},showLoading:function(){s.hideLoading(),n('<div id="fancybox-loading"></div>').click(s.cancel).appendTo("body")},getViewport:function(){return{x:r.scrollLeft(),y:r.scrollTop(),w:r.width(),h:r.height()}},unbindEvents:function(){s.wrap&&s.wrap.unbind(".fb"),i.unbind(".fb"),r.unbind(".fb")},bindEvents:function(){var e=s.current,t=e.keys;if(!e)return;r.bind("resize.fb, orientationchange.fb",s.update),t&&i.bind("keydown.fb",function(e){if(n.inArray(e.target.tagName.toLowerCase(),["input","textarea","select","button"])>-1)return;n.inArray(e.keyCode,t.close)>-1?(s.close(),e.preventDefault()):n.inArray(e.keyCode,t.next)>-1?(s.next(),e.preventDefault()):n.inArray(e.keyCode,t.prev)>-1&&(s.prev(),e.preventDefault())}),n.fn.mousewheel&&e.mouseWheel&&s.group.length>1&&s.wrap.bind("mousewheel.fb",function(e,t){if(n(e.target).get(0).clientHeight===0||n(e.target).get(0).scrollHeight===n(e.target).get(0).clientHeight)e.preventDefault(),s[t>0?"prev":"next"]()})},trigger:function(e){var t,r=n.inArray(e,["onCancel","beforeLoad","afterLoad"])>-1?"coming":"current";if(!s[r])return;n.isFunction(s[r][e])&&(t=s[r][e].apply(s[r],Array.prototype.slice.call(arguments,1)));if(t===!1)return!1;s[r].helpers&&n.each(s[r].helpers,function(t,r){r&&typeof s.helpers[t]!="undefined"&&n.isFunction(s.helpers[t][e])&&s.helpers[t][e](r)}),n.event.trigger(e+".fb")},isImage:function(e){return e&&e.match(/\.(jpg|gif|png|bmp|jpeg)(.*)?$/i)},isSWF:function(e){return e&&e.match(/\.(swf)(.*)?$/i)},_start:function(e){var t=s.group[e]||null,r,i,o,u,a=n.extend(!0,{},s.opts,n.isPlainObject(t)?t:{},{index:e,element:t});typeof a.margin=="number"&&(a.margin=[a.margin,a.margin,a.margin,a.margin]),a.modal&&n.extend(!0,a,{closeBtn:!1,closeClick:!1,nextClick:!1,arrows:!1,mouseWheel:!1,keys:null,helpers:{overlay:{css:{cursor:"auto"},closeClick:!1}}}),s.coming=a;if(!1===s.trigger("beforeLoad")){s.coming=null;return}typeof t=="object"&&(t.nodeType||t instanceof n)&&(r=!0,a.href=n(t).attr("href")||a.href,a.title=n(t).attr("title")||a.title,n.metadata&&n.extend(a,n(t).metadata())),o=a.type,i=a.href,o||(r&&(u=n(t).data("fancybox-type"),!u&&t.className&&(u=t.className.match(/fancybox\.(\w+)/),u=u?u[1]:!1)),u?o=u:i&&(s.isImage(i)?o="image":s.isSWF(i)?o="swf":i.match(/^#/)&&(o="inline")),o||(o=r?"inline":"html"),a.type=o),o==="inline"||o==="html"?(a.content||(a.content=o==="inline"&&i?n(i):t),a.content.length||(o=null)):(a.href=i||t,a.href||(o=null)),a.group=s.group,o==="image"?s._loadImage():o==="ajax"?s._loadAjax():o?s._afterLoad():s._error()},_error:function(){s.coming.type="html",s.coming.minHeight=0,s.coming.autoSize=!0,s.coming.content=s.coming.tpl.error,s._afterLoad()},_loadImage:function(){s.imgPreload=new Image,s.imgPreload.onload=function(){this.onload=this.onerror=null,s.coming.width=this.width,s.coming.height=this.height,s._afterLoad()},s.imgPreload.onerror=function(){this.onload=this.onerror=null,s._error()},s.imgPreload.src=s.coming.href,s.imgPreload.complete||s.showLoading()},_loadAjax:function(){s.showLoading(),s.ajaxLoad=n.ajax(n.extend({},s.coming.ajax,{url:s.coming.href,error:function(e,t,n){t!=="abort"?(s.coming.content=n,s._error()):s.hideLoading()},success:function(e,t,n){t==="success"&&(s.coming.content=e,s._afterLoad())}}))},_afterLoad:function(){s.hideLoading();if(!s.coming||!1===s.trigger("afterLoad",s.current)){s.coming=!1;return}s.isOpened?(n(".fancybox-item").remove(),s.wrap.stop(!0).removeClass("fancybox-opened"),s.inner.css("overflow","hidden"),s.transitions[s.current.prevMethod]()):(n(".fancybox-wrap").stop().trigger("onReset").remove(),s.trigger("afterClose")),s.unbindEvents(),s.isOpen=!1,s.current=s.coming,s.coming=!1,s.wrap=n(s.current.tpl.wrap).addClass("fancybox-tmp "+s.current.wrapCSS).appendTo("body"),s.outer=n(".fancybox-outer",s.wrap).css("padding",s.current.padding+"px"),s.inner=n(".fancybox-inner",s.wrap),s._setContent(),s.trigger("beforeShow"),s._setDimension(),s.wrap.hide().removeClass("fancybox-tmp"),s.bindEvents(),s.transitions[s.isOpened?s.current.nextMethod:s.current.openMethod]()},_setContent:function(){var e,t,r=s.current,i=r.type;switch(i){case"inline":case"ajax":case"html":i==="inline"?(e=r.content.show().detach(),e.parent().hasClass("fancybox-inner")&&e.parents(".fancybox-wrap").trigger("onReset").remove(),n(s.wrap).bind("onReset",function(){e.appendTo("body").hide()})):e=r.content,r.autoSize&&(t=n('<div class="fancybox-tmp"></div>').appendTo(n("body")).append(e),r.width=t.outerWidth(),r.height=t.outerHeight(!0),e=t.contents().detach(),t.remove());break;case"image":e=r.tpl.image.replace("{href}",r.href),r.aspectRatio=!0;break;case"swf":e=r.tpl.swf.replace(/\{width\}/g,r.width).replace(/\{height\}/g,r.height).replace(/\{href\}/g,r.href);break;case"iframe":e=r.tpl.iframe.replace("{href}",r.href).replace("{scrolling}",r.scrolling).replace("{rnd}",(new Date).getTime())}n.inArray(i,["image","swf","iframe"])>-1&&(r.autoSize=!1,r.scrolling=!1),s.inner.append(e)},_setDimension:function(){var e=s.current,t=s.getViewport(),r=e.margin,i=e.padding*2,o=e.width+i,u=e.height+i,a=e.width/e.height,f=e.maxWidth,l=e.maxHeight,c=e.minWidth,h=e.minHeight,p,d;t.w-=r[1]+r[3],t.h-=r[0]+r[2],o.toString().indexOf("%")>-1&&(o=t.w*parseFloat(o)/100),u.toString().indexOf("%")>-1&&(u=t.h*parseFloat(u)/100),e.fitToView&&(f=Math.min(t.w,f),l=Math.min(t.h,l)),f=Math.max(c,f),l=Math.max(h,l),e.aspectRatio?(o>f&&(o=f,u=(o-i)/a+i),u>l&&(u=l,o=(u-i)*a+i),o<c&&(o=c,u=(o-i)/a+i),u<h&&(u=h,o=(u-i)*a+i)):(o=Math.max(c,Math.min(o,f)),u=Math.max(h,Math.min(u,l))),o=Math.round(o),u=Math.round(u),n(s.wrap.add(s.outer).add(s.inner)).width("auto").height("auto"),s.inner.width(o-i).height(u-i),s.wrap.width(o),p=s.wrap.height();if(o>f||p>l)while((o>f||p>l)&&o>c&&p>h)u-=10,e.aspectRatio?(o=Math.round((u-i)*a+i),o<c&&(o=c,u=(o-i)/a+i)):o-=10,s.inner.width(o-i).height(u-i),s.wrap.width(o),p=s.wrap.height();e.dim={width:o,height:p},e.canGrow=e.autoSize&&u>h&&u<l,e.canShrink=!1,e.canExpand=!1,o-i<e.width||u-i<e.height?e.canExpand=!0:(o>t.w||p>t.h)&&o>c&&u>h&&(e.canShrink=!0),d=p-i,s.innerSpace=d-s.inner.height(),s.outerSpace=d-s.outer.height()},_getPosition:function(e){var t=s.getViewport(),n=s.current.margin,r=s.wrap.width()+n[1]+n[3],i=s.wrap.height()+n[0]+n[2],o={position:"absolute",top:n[0]+t.y,left:n[3]+t.x};return s.current.fixed&&(!e||e[0]===!1)&&i<=t.h&&r<=t.w&&(o={position:"fixed",top:n[0],left:n[3]}),o.top=Math.ceil(Math.max(o.top,o.top+(t.h-i)*s.current.topRatio))+"px",o.left=Math.ceil(Math.max(o.left,o.left+(t.w-r)*.5))+"px",o},_afterZoomIn:function(){var e=s.current;s.isOpen=s.isOpened=!0,s.wrap.addClass("fancybox-opened").css("overflow","visible"),s.update(),s.inner.css("overflow",e.scrolling==="auto"?"auto":e.scrolling==="yes"?"scroll":"hidden"),(e.closeClick||e.nextClick)&&s.inner.bind("click.fb",e.nextClick?s.next:s.close),e.closeBtn&&n(s.current.tpl.closeBtn).appendTo(s.wrap).bind("click.fb",s.close),e.arrows&&s.group.length>1&&((e.loop||e.index>0)&&n(e.tpl.prev).appendTo(s.wrap).bind("click.fb",s.prev),(e.loop||e.index<s.group.length-1)&&n(e.tpl.next).appendTo(s.wrap).bind("click.fb",s.next)),s.trigger("afterShow"),s.opts.autoPlay&&!s.player.isActive&&(s.opts.autoPlay=!1,s.play())},_afterZoomOut:function(){s.trigger("afterClose"),s.wrap.trigger("onReset").remove(),n.extend(s,{group:{},opts:{},current:null,isOpened:!1,isOpen:!1,wrap:null,outer:null,inner:null})}}),s.transitions={getOrigPosition:function(){var e=s.current.element,t={},r=50,i=50,o,u;return e&&e.nodeName&&n(e).is(":visible")?(o=n(e).find("img:first"),o.length?(t=o.offset(),r=o.outerWidth(),i=o.outerHeight()):t=n(e).offset()):(u=s.getViewport(),t.top=u.y+(u.h-i)*.5,t.left=u.x+(u.w-r)*.5),t={top:Math.ceil(t.top)+"px",left:Math.ceil(t.left)+"px",width:Math.ceil(r)+"px",height:Math.ceil(i)+"px"},t},step:function(e,t){var n,r,i;if(t.prop==="width"||t.prop==="height")r=i=Math.ceil(e-s.current.padding*2),t.prop==="height"&&(n=(e-t.start)/(t.end-t.start),t.start>t.end&&(n=1-n),r-=s.innerSpace*n,i-=s.outerSpace*n),s.inner[t.prop](r),s.outer[t.prop](i)},zoomIn:function(){var e=s.current,t,r,i=e.dim;e.openEffect==="elastic"?(r=n.extend({},i,s._getPosition(!0)),delete r.position,t=this.getOrigPosition(),e.openOpacity&&(t.opacity=0,r.opacity=1),s.wrap.css(t).show().animate(r,{duration:e.openSpeed,easing:e.openEasing,step:this.step,complete:s._afterZoomIn})):(s.wrap.css(n.extend({},i,s._getPosition())),e.openEffect==="fade"?s.wrap.fadeIn(e.openSpeed,s._afterZoomIn):(s.wrap.show(),s._afterZoomIn()))},zoomOut:function(){var e=s.current,t;e.closeEffect==="elastic"?(s.wrap.css("position")==="fixed"&&s.wrap.css(s._getPosition(!0)),t=this.getOrigPosition(),e.closeOpacity&&(t.opacity=0),s.wrap.animate(t,{duration:e.closeSpeed,easing:e.closeEasing,step:this.step,complete:s._afterZoomOut})):s.wrap.fadeOut(e.closeEffect==="fade"?e.closeSpeed:0,s._afterZoomOut)},changeIn:function(){var e=s.current,t;s.current.nextEffect==="elastic"?(t=s._getPosition(!0),t.opacity=0,t.top=parseInt(t.top,10)-200+"px",s.wrap.css(t).show().animate({opacity:1,top:"+=200px"},{duration:e.nextSpeed,complete:s._afterZoomIn})):(s.wrap.css(s._getPosition()),e.nextEffect==="fade"?s.wrap.hide().fadeIn(e.nextSpeed,s._afterZoomIn):(s.wrap.show(),s._afterZoomIn()))},changeOut:function(){function e(){n(this).trigger("onReset").remove()}s.wrap.removeClass("fancybox-opened"),s.current.prevEffect==="elastic"?s.wrap.animate({opacity:0,top:"+=200px"},{duration:s.current.prevSpeed,complete:e}):s.wrap.fadeOut(s.current.prevEffect==="fade"?s.current.prevSpeed:0,e)}},s.helpers.overlay={overlay:null,update:function(){var e,s,o;this.overlay.width(0).height(0),n.browser.msie?(s=Math.max(t.documentElement.scrollWidth,t.body.scrollWidth),o=Math.max(t.documentElement.offsetWidth,t.body.offsetWidth),e=s<o?r.width():s):e=i.width(),this.overlay.width(e).height(i.height())},beforeShow:function(e){if(this.overlay)return;this.overlay=n('<div id="fancybox-overlay"></div>').css(e.css||{background:"black"}).appendTo("body"),this.update(),e.closeClick&&this.overlay.bind("click.fb",s.close),r.bind("resize.fb",n.proxy(this.update,this)),this.overlay.fadeTo(e.speedIn||"fast",e.opacity||1)},onUpdate:function(){this.update()},afterClose:function(e){this.overlay&&this.overlay.fadeOut(e.speedOut||"fast",function(){n(this).remove()}),this.overlay=null}},s.helpers.title={beforeShow:function(e){var t,r=s.current.title;r&&(t=n('<div class="fancybox-title fancybox-title-'+e.type+'-wrap">'+r+"</div>").appendTo("body"),e.type==="float"&&(t.width(t.width()),t.wrapInner('<span class="child"></span>'),s.current.margin[2]+=Math.abs(parseInt(t.css("margin-bottom"),10))),t.appendTo(e.type==="over"?s.inner:e.type==="outside"?s.wrap:s.outer))}},n.fn.fancybox=function(e){function o(e){var i=[],o=!1,u=n(this).data("fancybox-group");return e.preventDefault(),typeof u!="undefined"?o=u?"data-fancybox-group":!1:this.rel&&this.rel!==""&&this.rel!=="nofollow"&&(u=this.rel,o="rel"),o&&(i=r.length?n(r).filter("["+o+'="'+u+'"]'):n("["+o+'="'+u+'"]')),i.length?(t.index=i.index(this),s.open(i.get(),t)):s.open(this,t),!1}var t=e||{},r=this.selector||"";return r?i.undelegate(r,"click.fb-start").delegate(r,"click.fb-start",o):n(this).unbind("click.fb-start").bind("click.fb-start",o),this}})(window,document,jQuery);