

// +------+
// |S*****|
// |     *|
// | * *  |
// | *  * |
// | ** **|
// | *   F|
// +------+

// +------+
// |S*****|
// |     *|
// | ***  |
// | *  * |
// | ** **|
// | *   F|
// +------+

const matrix = [[false, false, false, false, false, false],
                [ true, false,  true,  true,  true,  true],
                [ true, false, true, false,  true, false],
                [ true,  true,  true, false, false, false],
                [ true, false, false,  true,  true, false],
                [ true,  true, false, false,  true, false]];


// accept 1 parameter that is a matrix-- array of array
const pathfinder = (arr) => {
  arr.forEach((i, v) => {
    // iterate through the  array of arrays using the value and index and create reference for the row
    // let row = i
    arr[i].forEach((j, b) => {
      // iterate through array create reference for column here
      // let col = j
      if (arr[i+1][j] === false) {
        // break loop if open below
        // return row = i+1
      } else if (arr[i][j+1] === false) {
        // return col = j*
      } else {
        return false
      }
    })
  })
  // create a reference for the row we are on example martix[0]
  // if right and below are blocked move up until right block is open
  // update our reference and iterate through again from that point
};

pathfinder(matrix);
