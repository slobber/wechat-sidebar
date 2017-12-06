var redirectSite = function() {
  var wxPanel = browser.extension.getURL("https://wx.qq.com/?pos=sidebar");
  browser.sidebarAction.setPanel({panel: wxPanel})
}

var heartTimer;
function handleMessage(request, sender, sendResponse) {
  if(request.action === 'sidebar-weixin-logout') {
    clearTimeout(heartTimer);
    setTimeout(redirectSite, 1000);
  } else if (request.action === 'sidebar-weixin-heartbeat') {
    clearTimeout(heartTimer);
    heartTimer = setTimeout(redirectSite, 10500);
  }
}

browser.runtime.onMessage.addListener(handleMessage);