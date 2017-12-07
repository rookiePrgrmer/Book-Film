function convertToStarArray(stars) {
  stars = Math.floor(parseInt(stars) / 10);

  let result = new Array(5).fill(0);

  for (let i = 0; i < stars; i++) {
    result[i] = 1;
  }

  return result;
}

function http(url, callback) {
  wx.request({
    url,
    method: 'GET',
    header: {
      "Content-Type": "json"
    },
    success: (res) => {
      callback(res.data);
    },
    fail: (err) => {
      console.log(err);
    }
  });
}

module.exports = {
  convertToStarArray,
  http
};