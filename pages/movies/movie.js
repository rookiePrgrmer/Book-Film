const util = require('../../utils/util');

const app = getApp();

Page({
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {}
  },
  onLoad: function(options) {
    let inTheatersUrl = `${app.globalData.doubanBase}/v2/movie/in_theaters?start=0&count=3`;
    let comingSoonUrl = `${app.globalData.doubanBase}/v2/movie/coming_soon?start=0&count=3`;
    let top250Url = `${app.globalData.doubanBase}/v2/movie/top250?start=0&count=3`;

    this.getMovieListData(inTheatersUrl, 'inTheaters', '正在上映');
    this.getMovieListData(comingSoonUrl, 'comingSoon', '即将上映');
    this.getMovieListData(top250Url, 'top250', '豆瓣Top250');
  },
  getMovieListData(url, key, title) {
    wx.request({
      url,
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: res => {
        this.processDoubanData(res.data, key, title);
      },
      fail: err => {
        console.log(err);
      }
    });
  },
  /**
   * 处理服务端返回的数据，使其符合模板的解析需求
   */
  processDoubanData(moviesDouban, key, title) {
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
      [key]: {movies, title}
    });
  },
  // 点击“更多”回调函数
  onMoreTap(e) {
    let category = e.currentTarget.dataset.category;
    wx.navigateTo({
      url: `./more-movie/more-movie?category=${category}`
    });
  }
});