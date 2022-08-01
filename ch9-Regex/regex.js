'use strict';
/*
Regex methods:
.test() is the simplest way to check regex, returns true or false
.exec() returns object re the match or null
.match() string method that does similar thing
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
log(animalCount.test("15 pigs")); //true
log(animalCount.test("15 pigchickens")); //false

let binaryOrHex = /\b([01]+b|[\da-f]+h|\d+)\b/;
/* matches either a binary number followed by a b,
a hexadecimal number followed by an h, or a decimal with no suffix
*/

