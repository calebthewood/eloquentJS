"use strict";

/****************************************************************** Exercises */
class MultiplicatorUnitFailure extends Error { }

/** Retry: 20% chance to succesfully multiply two numbers */
function primitiveMultiply(a, b) {
  if (Math.random() < 0.2) {
    return a * b;
  } else {
    throw new MultiplicatorUnitFailure("Klunk");
  }
}

/** Retry: Will continually call primitive multiply until it returns succesfully */
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

/** Retry: Recursive solution */
function reliableRecursiveMultiply(a, b) {
  try {
    return primitiveMultiply(a, b);
  } catch (e) {
    if (e instanceof MultiplicatorUnitFailure) {
      console.log("maths failed, trying again.");
      return reliableRecursiveMultiply(a, b);
    } else {
      throw e;
    }
  }
}

// console.log(reliableRecursiveMultiply(8, 8));


/* The Locked Box */

const box = {
  locked: true,
  unlock() { this.locked = false; },
  lock() { this.locked = true; },
  _content: [],
  get content() {
    if (this.locked) throw new Error("Locked!");
    return this._content;
  }
};

/** Accepts a function to call when the box is unlocked */
function withBoxUnlocked(body) {
  const wasLocked = box.locked;
  if (wasLocked) box.unlock();
  try {
    body();
    console.log(box.content); //note that getters are accessed like properties
  } catch (e) {
    console.log(e.message);
  } finally {
    if (wasLocked) box.lock();
  }
}

// Add gold to the box
withBoxUnlocked(function () {
  box.content.push("gold piece");
});

try {
  withBoxUnlocked(function () {
    throw new Error("Pirates on the horizon! Abort!");
  });
} catch (e) {
  console.log("Error raised: " + e);
}
console.log(box.locked);
