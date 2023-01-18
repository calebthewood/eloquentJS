"use strict";
//SCRIPT represents a object containing data on UTF scripts

/******************************* Abstract functionality to utility functions */

/** manual implementation of Array.reduce method */
function reduce(array, combine, start = 0) {
  let current = start;
  for (let element of array) {
    current = combine(current, element);
  }
  return current;
}
/** Reduces an Array to its Average */
function average(array) {
  return array.reduce((a, b) => a + b) / array.length;
}

/** Finds the corresponding script based on utf-8 char code */
function characterScript(code) {
  for (let script of SCRIPTS) {
    if (script.ranges.some(([from, to]) => {
      return code >= from && code < to;
    })) {
      return script;
    }
  }
  return null;
}


/** Takes an array and a callbackb, returns an array of objects
 * where each object has a name and a count property  */
function countBy(items, groupName) {
  let counts = [];
  for (let item of items) {
    let name = groupName(item);
    let known = counts.findIndex(c => c.name == name);
    if (known == -1) {
      counts.push({ name, count: 1 });
    } else {
      counts[known].count++;
    }
  }
  return counts;
}

/************************************************************* Composability */

/* weigh the costs of readability over speed? Will your fn be processing
large volumnes of data? */
const avgAgeLivingScripts = Math.round(average(
  SCRIPTS.filter(s => s.living).map(s => s.year)));


//TODO: tie in this fn to the canvas pie chart generator

/**Accepts a string with chars from misc. scripts. returns the % of each
 * script and name as a string.
 *
 * ex: '英国的狗说"woof", 俄罗斯的狗说"тяв"' → 61% Han, 22% Latin, 17% Cyrillic
 *
 * 1. get script count object via countBy()
 * 2. filters out "none" results from special chars & spaces
 * 3. reduces count object to total, catches any empty strings here
 * 4. creates new of array template literal averages from count object
 * 5. joins elements, fin!
 *
 */
function textScripts(text) {
  let scripts = countBy(text, char => {
    let script = characterScript(char.codePointAt(0));
    return script ? script.name : "none";
  }).filter(({ name }) => name != "none");

  let total = scripts.reduce((n, { count }) => n + count, 0);
  if (total == 0) return "No scripts found";

  return scripts.map(({ name, count }) => {
    return `${Math.round(count * 100 / total)}% ${name}`;
  }).join(", ");
}

console.log(textScripts('英国的狗说"woof", 俄罗斯的狗说"тяв"'));
// → 61% Han, 22% Latin, 17% Cyrillic

/************************************************************* Exercises */
/**
 * Flattening
 * uses reduce & concatenation to flatten an array of arrays
 * ex: [[1, 2, 3], [4, 5], [6]] → [1, 2, 3, 4, 5, 6]
 * */

function flattening(arrays) {
  return arrays.reduce((acc, curr) => acc.concat(curr));
}

let arrays = [[1, 2, 3], [4, 5], [6]];
flattening(arrays);

/**
 * Your Own Loop
 * I'm not entirely sure what the intent of this problem is.
 */
function loop(value, test, update, body) {
}


/**
 * Everything
 * Implement Array.every as a function with a loop that
 * takes an array and a predicate function.
 */
function everything(array, predicate) {
  let i = 0;
  let len = array.length;

  while (i < len) {
    if (!predicate(array[i])) {
      return false;
    }
    i++;
  }
  return true;
}

/**Implement Array.every using Array.some */
function everythingFromSomething(array, predicate) {
  let every = true;
  array.some((element) => {
    if (!predicate(element)) {
      every = false;
    }
  });
  return every;
}

/** sample predicate fn */
function isString(element) {
  return typeof element === 'string';
}

/**
 * Dominant Writing Direction
 */

function dominantWritingDirection() {

}