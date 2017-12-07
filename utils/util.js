function convertToStarArray(stars) {
  stars = Math.floor(parseInt(stars) / 10);

  let result = new Array(5).fill(0);

  for (let i = 0; i < stars; i++) {
    result[i] = 1;
  }

  return result;
}

module.exports = {
  convertToStarArray
};