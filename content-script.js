
var matchClass = function(el, selector) {
  var items = selector.split(',');
  for(var i = 0; i < items.length; i++) {
    var item = items[i].trim();
    if(el.classList.contains(item)) return true;
  }
  return false;
}

var closestParent = function(el, selector, includeSelf) {
  var parent = el.parentNode;

  if (includeSelf && matchClass(el, selector)) {
      return el;
  }

  while (parent && parent !== document.body) {
      if (parent.matches && matchClass(parent, selector)) {
          return parent;
      } else if (parent.parentNode) {
          parent = parent.parentNode;
      } else {
          return null;
      }
  }

  return null;
};

var css = `@keyframes slide-left {0%{left:0px;}100%{left:-999px}}
@keyframes slide-right {0%{left:-999px;}100%{left:0px;}}
body{overflow:hidden;}
body *{text-align:unset;box-sizing:content-box;}
.login{min-width:100%;}
.login_box{width:310px;margin-left:-155px;}
.login .copyright{bottom:40px;}
.header .info .nickname .opt{float:right;}
.panel{position:absolute;z-index:3092;left:0px;top:0px;width:100%;min-width:275px;animation:slide-right .3s linear;}
#chatArea,.reader{position:absolute;left:0px;top:0px;width:100%}
.panel.hide{animation:slide-left .5s ease-in;left:-999px}
.search_bar{width:80%}
.search_bar .frm_search {width:100%;box-sizing:border-box;}
.message_empty{width:100%}
.reader .box_bd{padding-left:0px;padding-right:0px;}
.exp_cont {margin:10px;}
.qq_face,.emoji_face {width:100%;height:auto}
.main{min-width:275px;}
.main_inner{min-width:100%}
@media(min-width:275px)and(max-width:370px){.profile .meta_area{padding-left:102px;}}
@media(min-width:430px){.profile .meta_area{padding-left:160px;}}
.back_btn{ border:none;position:absolute;left:6px;width:30px;z-index:3091;top:13px;height:30px;background-size:390px 370px;background-position:-157px -267px;}`;

var head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

style.type = 'text/css';
if (style.styleSheet){
  style.styleSheet.cssText = css;
} else {
  style.appendChild(document.createTextNode(css));
}
head.appendChild(style);

var injectScript = `$(document).on('click', '.read_item', function(e) {
  var readItem = window.angular.element(e.target).scope().readItem;
  if(readItem && readItem.Url) {
    window.open(readItem.Url, '_blank');
  }
})`;
var body = document.body || document.getElementsByTagName('body')[0], script = document.createElement('script');
script.type = 'text/javascript';
script.appendChild(document.createTextNode(injectScript));
body.appendChild(script);

var backButton = document.createElement('button');
backButton.classList.add('back_btn', 'web_wechat_left', 'web_wechat_left_disable');
backButton.addEventListener('click', function() {
  document.getElementsByClassName('panel')[0].classList.remove('hide');
})
document.getElementsByClassName('main')[0].prepend(backButton);

document.addEventListener('click', function(e) {
  var el = e.target;
  var item = closestParent(el, 'chat_item, contact_item', true);
  if(item) {
    document.getElementsByClassName('panel')[0].classList.add('hide');
  } else {
    var sysMenu = closestParent(el, 'system_menu');
    var logoutItem = closestParent(el, 'last_child', true);
    if(sysMenu && logoutItem) {
      browser.runtime.sendMessage({
        action: 'sidebar-weixin-logout'
      });
    }
  }
}, true)

setInterval(function() {
  browser.runtime.sendMessage({
    action: 'sidebar-weixin-heartbeat'
  });
}, 10000)
