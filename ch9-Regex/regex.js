'use strict';
/*
Regex methods:
.test() is the simplest way to check regex, returns true or false
.exec() returns object re the match or null
.match() string method that does similar thing

Tips:
(+, *, ?, and {}) are greedy, add ? to make them not greedy
use ^ and $ to make sure an expression matches the whole line, not just part of it.

Glossary:
literal	        normal text character
[... ]          character class	matches any one of several characters
dash (-)        between 2 chars in character class	indicates range of chars
[^...]          negated character class	matches any char not listed
dot (.)	        matches any character
or, bar (|)	    separates alternative subexpressions

anchor	        metacharacter matching a position
(...)	          create subexpression (grouping)
...?            zero or one occurences of previous item
...*            zero or more occurences of previous item
...+    	      at least one occurence of previous item
^...	          begin of line (anchor)
...$	          end of line (anchor)

quantifiers     indicate number of occurences of previous item
\w      	      part-of-word char [a-zA-Z0-9_]
\W      	      non-word char [^w]
\d      	      digit [0-9]
\D      	      non digit [^0-9]
\s      	      whitespace character [ \f\n\r\t\v]
\S      	      non-whitespace character [^\s]

escaping	      neutralizing a metacharacter (reducing it to text)
\char           (if combination is not metadescriptive)	escaped char
\t	            tab character
\r	            return character
\n	            newline character
...{min,max}	  repeat previous at least min times, but not more than max times
...{min,}	      repeat previous item at least min times
...{num} 	      repeat previous item num times

grouping	putting part of a regex between parentheses (creates a subexpression)
\       followed by a digit	back reference to the digith subexpression (between parentheses)
*/

const log = console.log;

// // regex expressions can be written either way
// let re1 = new RegExp("abc");
// let re2 = /abc/;

// //in regex, backslashes preserve symbols
// let eighteenPlus = /eighteen\+/;

// log(re1.test("abcde")); //true
// log(re1.test("axcde")); // false

// //Both find the same sets
// log(/[0123456789]/.test("in 1992")); //true
// log(/[0-9]/.test("in 1992")); //true

// // ^ to match any character except the ones in the set
// let notBinary = /[^01]/;
// log(notBinary.test("1100100010100110")) // false: all chars are either 0,1
// log(notBinary.test("1100100010200110")) // true: contains chars other than 0,1

// // + to match more than one of a thing.
// log(/'\d+'/.test("'123'")); //true: /\d+/ matches one or more digits
// log(/'\d+'/.test("''")); //false: /\d+/ no digits
// log(/'\d*'/.test("'123'")); //true: /\d*/ similar to + but matches on 0
// log(/'\d*'/.test("''")); //false: see above

// // ? makes pattern optional
// let neighbor = /neighbou?r/;
// log(neighbor.test("neighbour")); //true: marks the u as optional
// log(neighbor.test("neighbor")); //true

// /* {} to signify number of times a patter will occur
//  {4} = 4x, {1,2} = 1x or 2x, {5,} = 5x or more */
// let dateTime = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/;
// //  true: days and months have 1-2 digits, years have 4 digits, etc.
// log(dateTime.test("1-30-2003 8:45"));

// // () groups subexpressions
// let cartoonCrying = /boo+(hoo)+/i; // i = case insensitive
// // regex looking for "bo" and "ho" either with one or more o's
// log(cartoonCrying.test("Boohooohoohooo")); //true

// let match = /\d+/.exec("one two 100");
// log(match); // [ '100', index: 8, input: 'one two 100', groups: undefined ]
// log(match.index); // 8, index where the matched pattern begins

// log("one two 100".match(/\d+/));

// let quotedText = /'([^']*)'/;
// // log(quotedText.exec("she said 'hello'"));

// log(/bad(ly)?/.exec("bad"));
// // --> [ 'bad', undefined, index: 0, input: 'bad', groups: undefined ]
// log(/(\d)+/.exec("123"));
// // --> [ '123', '3', index: 0, input: '123', groups: undefined ]
// // 1st element is the whole match
// // 2nd element is the (subexpression) match

// /** Creates date object from a string
//  *
//  * ex: "1-30-2003" --> 2003-01-30T08:00:00.000Z
// */
// function getDate(string) {
//   let [_, month, day, year] =
//     /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(string);
//   return new Date(year, month - 1, day);
// }


// log(getDate("1-30-2003"));

// /* Word and String Boundaries */
// // /^\d+$/ --> Matches a string consisting entirely of one or more digits
// // /^!/ --> Mathces any string that starts with an exclamation mark
// // /x^/ --> Does not match any string, cannot have an x before the string starts
// // \b --> \b looks for a word boundary, like a space or symbol
// // \w --> not sure.

// log(/cat/.test("concatenate")); //true:
// log(/\bcat\b/.test("concatenate")); //false:
// log(/\bcat\b/.test("con.cat.enate")); //true:

let animalCount = /\b\d+ (pig|cow|chicken)s?\b/;
// find a digit followed by either pig(s), cow(s), OR chicken(s)
// log(animalCount.test("15 pigs")); //true
// log(animalCount.test("15 pigchickens")); //false

let binaryOrHex = /\b([01]+b|[\da-f]+h|\d+)\b/;
/* matches either a binary number followed by a b,
a hexadecimal number followed by an h, or a decimal with no suffix */

let re3 = /^.*x/;
// matches the entire string up to the final x, finds x from the end.
// counting from the end is called back tracking. Too much is bad.

// g = global, find all matches, not just first.

// log("papa".replace("p", "m"));
// log("Borobudur".replace(/[ou]/, "a"));// → Barobudur
// log("Borobudur".replace(/[ou]/g, "a"));// → Barabadar

//Converts names from "lname, fname" → "fname lname"
//log("Liskov, Barbara\nMcCarthy, John\nWadler, Philip"
//   .replace(/(\w+), (\w+)/g, "$2 $1"));
// → Barbara Liskov
//   John McCarthy
//   Philip Wadler

// let s = "the cia and fbi";
// // log(s.replace(/\b(fbi|cia)\b/g,
// //             str => str.toUpperCase()));
// // → the CIA and FBI

// //subtracts 1 from every number and updates the correlated item if needed.

// let stock = "3 lemon, 4 cabbages, and 103 eggs";

// function minusOne(match, amount, unit) {
//   amount = Number(amount) - 1;
//   if (amount == 1) { // only one left, remove the 's'
//     unit = unit.slice(0, unit.length - 1);
//   } else if (amount == 0) {
//     amount = "no";
//   }
//   return amount + " " + unit;
// }
// log(stock.replace(/(\d+) (\w+)/g, minusOne));
// // → no lemon, 1 cabbage, and 100 eggs


// /** Removes all .js comments from a string */
// function stripComments(code) {
//   return code.replace(/\/\/.*|\/\*[^]*?\*\//g, "");
// }
// console.log(stripComments("1 /* a */+/* b */ 1"));
// // → 1 + 1

// function parseINI(string) {
//   let result = {};
//   let section = result;
//   string.split(/\r?\n/).forEach(line => {
//     let match;
//     if (match = line.match(/^(\w+)=(.*)$/)) {
//       section[match[1]] = match[2];
//     } else if (match = line.match(/^\[(.*)\]$/)) {
//       section = result[match[1]] = {};
//     } else if (!/^\s*(;.*)?$/.test(line)) {
//       throw new Error("Line '" + line + "' is not valid");
//     }
//   });
//   return result;
// }

// console.log(parseINI(`
// name=Vasilis
// [address]
// city=Tessaloniki`));

/****************************************************************** Exercises */

/** Regexp Golf */

// link provided an excellent base to build from:
// https://stackoverflow.com/questions/4389644/regex-to-match-string-containing-two-names-in-any-order


/* Fill in the regular expressions
I don't fully understand the book's prompt here. From what I understand, the
patterns I wrote satisfy the prompts, but they don't work for verify()
*/
// car and cat
verify(/^(?=.*\bcar\b)(?=.*\bcat\b).*$/,
  ["my car", "bad cats"],
  ["camper", "high art"]);

// pop and prop
verify(/^(?=.*\bpop\b)(?=.*\bprop\b).*$/,
  ["pop culture", "mad props"],
  ["plop", "prrrop"]);

// ferret, ferry, and ferrari
verify(/^(?=.*\bferret\b)(?=.*\bferry\b)(?=.*\bferrari\b).*$/,
  ["ferret", "ferry", "ferrari"],
  ["ferrum", "transfer A"]);

// Any word ending in ious
log("ious  ", /^(?=.*ious\b).*$/.test("delicious hello world"));
verify(/^(?=.*ious\b).*$/,
  ["how delicious", "spacious room"],
  ["ruinous", "consciousness"]);

// A whitespace character followed by a period, comma, colon, or semicolon
log("bad punc: ", /^(?=.*(\s[\.\,\;\:])).*$/.test(" , hello world"));
verify(/^(?=.*(\s[\.\,\;\:])).*$/,
  ["bad punctuation ."],
  ["escape the period"]);

// A word longer than six letters
log("6+: ", /^(?=.*\b\w{6,}\b).*$/.test(" , hello gregarious world"));
verify(/^(?=.*\b\w{6,}\b).*$/,
  ["Siebentausenddreihundertzweiundzwanzig"],
  ["no", "three small words"]);

// A word without the letter e (or E)
log("sans e: ", /^(?=.*\b([^ e])+\b).*$/gi.test(" , hello gregarious world"));
verify(/^(?=.*\b([^ e])+\b).*$/gi,
  ["red platypus", "wobbling nest"],
  ["earth bed", "learning ape", "BEET"]);


function verify(regexp, yes, no) {
  // Ignore unfinished exercises
  if (regexp.source == "...") return;
  for (let str of yes) if (!regexp.test(str)) {
    console.log(`Failure to match '${str}'`);
  }
  for (let str of no) if (regexp.test(str)) {
    console.log(`Unexpected match for '${str}'`);
  }
}
/** Quoting Style */
let text = "'I'm the cook,' he said, 'it's my job.'";

console.log(text.replace(/(^|\W)'|'(\W|$)/g, '$1"$2'));
// (^|\W)' = a single quote at the start or after any non-word character.
// '(\W|$) = a single quote before any non word character or
// → "I'm the cook," he said, "it's my job."


/** Numbers Again */