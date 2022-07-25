"use strict";


/** Persistant Group */
class PGroup {
  constructor(set) {
    this.set = set;
  }

  add(element) {
    if (this.has(element)) return this
    return new PGroup([...this.set, element]);
  }

  delete(element) {
    if (!this.has(element)) return this;
    return new PGroup(this.set.filter(item => item !== element));
  }

  has(element) {
    return this.set.includes(element);
  }
}

PGroup.empty = new PGroup([]);

let a = PGroup.empty.add("a");
let ab = a.add("b");
let b = ab.delete("a");

console.log(b.has("b"));
// → true
console.log(a.has("b"));
// → false
console.log(b.has("a"));
// → false