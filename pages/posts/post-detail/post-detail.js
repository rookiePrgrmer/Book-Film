let postList = require('../../../data/posts-data.js').postList;
let storageHelper = require('../../../utils/articleCollectedStorageHelper.js');

Page({
  data: {},
  onLoad(option) {
    let postId = option.id;
    let postData = postList[postId];
    this.data.KEY_POST = `postId_${postId}`;
    this.setData(Object.assign({}, postData, {
      postId: postId,
      collected: storageHelper.get(this.data.KEY_POST) // 获取当前文章是否被收藏
    }));
  },
  // 当用户点击收藏按钮时
  onTapCollect(event) {
    let collected = !this.data.collected;
    this.setData({ collected });
    storageHelper.set(this.data.KEY_POST, collected);
  },
  onShare(event) {
    console.log('分享');
  }
});