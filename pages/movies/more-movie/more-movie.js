const app = getApp();
const util = require('../../../utils/util.js');

Page({
  data: {
    movies: []
  },
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

    util.http(dataUrl, this.processDoubanData);
  },
  /**
   * 处理服务端返回的数据，使其符合模板的解析需求
   */
  processDoubanData(moviesDouban) {
    let self = this;

    let movies = [], rawMovies = moviesDouban.subjects;
    for (let i = 0, len = rawMovies.length; i < len; i++) {
      let subject = rawMovies[i];

      let temp = {
        title: subject.title,
        coverage: subject.images.large,
        movieId: subject.id,
        rating: {
          stars: util.convertToStarArray(subject.rating.stars),
          average: subject.rating.average,
        }
      };

      movies.push(temp);
    }

    this.setData({
      movies
    });
  },
  onReady() {
    wx.setNavigationBarTitle({
      title: this.data.category
    });
  }
});