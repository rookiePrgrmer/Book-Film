Page({
  toHome: (e) => {
    wx.switchTab({
      url: '../posts/post',
    });
  }
});