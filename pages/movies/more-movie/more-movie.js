const app = getApp();
const http = require('../../../utils/util.js').http;

Page({
  data: {},
  onLoad: function (options) {
    let category = options.category;
    this.data.category = category;
    let dataUrl = '';
    switch (category) {
      case '正在上映':
        dataUrl = `${app.globalData.doubanBase}/v2/movie/in_theaters`;
        break;
      case '即将上映':
        dataUrl = `${app.globalData.doubanBase}/v2/movie/coming_soon`;
        break;
      case '豆瓣Top250':
        dataUrl = `${app.globalData.doubanBase}/v2/movie/top250`;
        break;
    }

    http(dataUrl, res => {
      console.log(res);
    });
  },
  onReady() {
    wx.setNavigationBarTitle({
      title: this.data.category
    });
  }
});