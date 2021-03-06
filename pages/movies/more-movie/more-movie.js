const app = getApp();
const util = require('../../../utils/util.js');

Page({
  data: {
    movies: [],
    requestUrl: '',
    totalCount: 0,
    loadBusy: false
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

    // 记录当前页面请求的
    this.data.requestUrl = dataUrl;
    util.http(dataUrl, this.processDoubanData);
  },
  /**
   * 处理服务端返回的数据，使其符合模板的解析需求
   */
  processDoubanData(moviesDouban) {
    let movies = [], rawMovies = moviesDouban.subjects;
    if (rawMovies && rawMovies.length) {
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

      // 每次都累加
      this.data.totalCount += 20;
      // 重置状态位
      this.data.loadBusy = false;

      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    }

    this.setData({
      movies: this.data.refresh ? [] : this.data.movies.concat(movies)
    });
  },
  onReady() {
    wx.setNavigationBarTitle({
      title: this.data.category
    });
  },
  onScrollLower(e) {
    this.data.refresh = false;
    let self = this;

    if (!self.data.loadBusy) {
      self.data.loadBusy = true;
      console.log('loadBusy = false');

      let nextUrl = `${self.data.requestUrl}?start=${self.data.totalCount}&count=${20}`;
      wx.showNavigationBarLoading();
      util.http(nextUrl, self.processDoubanData);
    }
  },
  onPullDownRefresh(event) {
    this.data.refresh = true;
    let nextUrl = `${self.data.requestUrl}?start=0&count=20`;
    util.http(nextUrl, self.processDoubanData);
  }
});