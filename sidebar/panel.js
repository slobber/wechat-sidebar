document.body.style.height = window.innerHeight + 'px';
var lang = browser.i18n.getUILanguage();
lang = lang.replace('-', '_');
window.location.href = "https://wx.qq.com/?pos=sidebar&lang="+lang;