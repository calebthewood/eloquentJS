function maxSubArray(numbers) {
  let maxSum = -Infinity;
  let sum = 0;
  let left = 0;
  let right = 0;
  const end = numbers.length;

  while (left < end) {
    let num = numbers[right];
    sum += num;
    right++;

    if (sum > maxSum) {
      maxSum = sum;
    }
    if (right >= end) {
      left++;
      right = left;
      sum = 0;
    }
  }
  return maxSum
}

https://leetcode.com/problems/merge-two-sorted-lists/


/*
2d map of islands and water
1 = land
0 = water
only horizontal and vertical connections count
out of bounds is water
 [[],[],[]] --> island count (Int)

 Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1

Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3

//outter fn
// islandCount
// visited = []
// loop over arrays, call inner fn at each element
  // if 0, or in visited, skip
  // inner fn
  //base case: all nswe are water/undefined
    // islandCount += 1
  // add any adjacent "land" nodes to queue
  // recurse on 1st element in our queue
*/

function islandCounter(arrays) {
  let islandCount = 0;
  const visited = [];
  const lenY = arrays.length;
  const lenX = arrays[0].length;

  function landCounter(y, x) {
    let coords = `${yx}`;
    if (visited.includes(coords)) return false;
    if (arrays[y][x] === "0") return false;
    visited.push(coords);

    let N = arrays[y - 1][x];
    let S = arrays[y + 1][x];
    let E = arrays[y][x + 1];
    let W = arrays[y][x - 1];
    // coord is "1"
    if (N) landCounter(y - 1, x);
    if (S) landCounter(y + 1, x);
    if (E) landCounter(y, x + 1);
    if (W) landCounter(y, x - 1);
    return true;
  }

  for (let y = 0; y < lenY; y++) {
    for (let x = 0; x < lenX; x++) {
      if (landCounter(y, x)) {
        islandCount++;
      }
    }
  }
  return islandCount;
}