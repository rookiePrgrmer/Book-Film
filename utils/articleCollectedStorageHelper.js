const KEY_ARTICLE_COLLECTION = 'article_collection';

const getCollection = function() {
  let collection = wx.getStorageSync(KEY_ARTICLE_COLLECTION);
  if (!collection) {
    collection = {};
    wx.setStorageSync(KEY_ARTICLE_COLLECTION, collection);
  }
  return collection;
};

const setCollection = function(collection) {
  wx.setStorageSync(KEY_ARTICLE_COLLECTION, collection);
};

const get = function(key) {
  let collection = getCollection();
  return collection[key];
};

const set = function(key, collected) {
  let collection = getCollection();
  collection[key] = collected;
  setCollection(collection);
};

module.exports = {
  get,
  set
};

