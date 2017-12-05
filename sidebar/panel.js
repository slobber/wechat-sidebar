var iframe = document.getElementsByTagName('iframe')[0];
iframe.height = window.innerHeight;
var lang = browser.i18n.getUILanguage();
lang = lang.replace('-', '_');
iframe.src = "https://wx.qq.com/?pos=sidebar&lang="+lang;