"use strict";

/************************************************************** Abstraction */

/* Key takeaway, abstraction makes for more readable code,
consider this:  */
let total = 0, count = 1;
while (count <= 10) {
  total += count;
  count += 1;
}

/* or this */

sum(range(1, 10));

/************************************************************** Abstraction */

/** manual implementation of Array.reduce method */
function reduce(array, combine, start=0) {
  let current = start;
  for (let element of array) {
    current = combine(current, element);
  }
  return current;
}
console.log(reduce([1,2,3,4], (a, b) => a + b, 0));