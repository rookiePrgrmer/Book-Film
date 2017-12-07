let postData = require('../../data/posts-data.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ posts: postData.postList });
  },
  toDetail: function(event) {
    let postId = event.currentTarget.dataset.postId;
    wx.navigateTo({
      url: '../posts/post-detail/post-detail?id=' + postId,
    });
  }
});