"use strict";

class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.2) {
    return a * b;
  } else {
    throw new MultiplicatorUnitFailure("Klunk");
  }
}

function reliableMultiply(a, b) {
  for (; ;) {
    try {
      let factor = primitiveMultiply(a, b);
      return factor;
    } catch (e) {
      if (e instanceof MultiplicatorUnitFailure) {
        console.log("maths failed, trying again.");
      } else {
        throw e;
      }
    }
  }
}

console.log(reliableMultiply(8, 8));