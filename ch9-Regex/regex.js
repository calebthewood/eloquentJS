'use strict';
/*
Regex methods:
.test() is the simplest way to check regex, returns true or false
.exec() returns object re the match or null
.match() string method that does similar thing
*/

const log = console.log;

// regex expressions can be written either way
let re1 = new RegExp("abc");
let re2 = /abc/;

//in regex, backslashes preserve symbols
let eighteenPlus = /eighteen\+/;

// log(re1.test("abcde")); //true
// log(re1.test("axcde")); // false

//Both find the same sets
// log(/[0123456789]/.test("in 1992")); //true
// log(/[0-9]/.test("in 1992")); //true

// ^ to match any character except the ones in the set
let notBinary = /[^01]/;
// log(notBinary.test("1100100010100110")) // false: all chars are either 0,1
// log(notBinary.test("1100100010200110")) // true: contains chars other than 0,1

// + to match more than one of a thing.
// log(/'\d+'/.test("'123'")); //true: /\d+/ matches one or more digits
// log(/'\d+'/.test("''")); //false: /\d+/ no digits
// log(/'\d*'/.test("'123'")); //true: /\d*/ similar to + but matches on 0
// log(/'\d*'/.test("''")); //false: see above

// ? makes pattern optional
let neighbor = /neighbou?r/;
// log(neighbor.test("neighbour")); //true: marks the u as optional
// log(neighbor.test("neighbor")); //true

/* {} to signify number of times a patter will occur
 {4} = 4x, {1,2} = 1x or 2x, {5,} = 5x or more */
let dateTime = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/;
// true: days and months have 1-2 digits, years have 4 digits, etc.
// log(dateTime.test("1-30-2003 8:45"));

// () groups subexpressions
let cartoonCrying = /boo+(hoo)+/i; // i = case insensitive
//regex looking for "bo" and "ho" either with one or more o's
// log(cartoonCrying.test("Boohooohoohooo")); //true

let match = /\d+/.exec("one two 100");
log(match); // [ '100', index: 8, input: 'one two 100', groups: undefined ]
log(match.index); // 8, index where the matched pattern begins

log("one two 100".match(/\d+/));
