
function handleMessage(request, sender, sendResponse) {
  if(request.action === 'sidebar-weixin-logout') {
    setTimeout(function() {
      var wxPanel = browser.extension.getURL("https://wx.qq.com/?pos=sidebar");
      browser.sidebarAction.setPanel({panel: wxPanel})
    }, 1000);
  }
}

browser.runtime.onMessage.addListener(handleMessage);