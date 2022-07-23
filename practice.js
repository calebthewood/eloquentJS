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