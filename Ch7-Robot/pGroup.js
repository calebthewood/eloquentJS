"use strict";


/** Persistant Group */
class PGroup {
  constructor() {
    this.empty = [];
  }

  add(element) {
    return [...this.empty, element];
  }

  delete(element) {
    return this.empty.filter(item => item !== element);
  }

  has(element) {
    return this.empty.includes(element);
  }
}

let a = PGroup.empty.add("a");
let ab = a.add("b");
let b = ab.delete("a");

console.log(b.has("b"));
// → true
console.log(a.has("b"));
// → false
console.log(b.has("a"));
// → false