"use strict";


/** Given a starting node, searches the DOM  for the given string */
function talksAbout(node, string) {
  if (node.nodeType == Node.ELEMENT_NODE) {
    for (let child of node.childNodes) {
      if (talksAbout(child, string)) {
        return true;
      }
    }
    return false;
  } else if (node.nodeType == Node.TEXT_NODE) {
    return node.nodeVale.indexOf(string) > -1;
  }
}

// console.log(talksAbout(document.body, "text to look for"))

/** Replaces image tags with the text from their "alt" attribute */
function replaceImages() {
  let images = document.body.getElementsByTagName('img');
  for (let i = images.length - 1; i >= 0; i--) { //iterate from end to start in the DOM
    let image = images[i];
    if (image.alt) {
      let text = document.createTextNode(image.alt);
      image.parentNode.replaceChild(text, image);
    }
  }
}

/** Takes a selector and counts # of instances in the DOM
 * "p" --> 21
 * ".button" --> 4
 * "#title" --> 1
*/
function count(selector) {
  return document.querySelectorAll(selector).length;
}

function time(name, action) {
  let start = Date.now();
  action();
  console.log(name, "took", Date.now() - start, "ms");
}

// time("naive", () => {
//   let target = document.getElementById("one");
//   while (target.offsetWidth < 2000) {
//     target.appendChild(document.createTextNode("X"));
//   }
// });

// time("clever", () => {
//   let target = document.getElementById("two");
//   target.appendChild(document.createTextNode("XXXXX"));
//   let total = Math.ceil(2000 / (target.offsetWidth / 5));
//   target.firstChild.nodeValue = "X".repeat(total)
// })

/* Cat Animation */




const MOUNTAINS = [
  { name: "Kilimanjaro", height: 5895, place: "Tanzania" },
  { name: "Everest", height: 8848, place: "Nepal" },
  { name: "Mount Fuji", height: 3776, place: "Japan" },
  { name: "Vaalserberg", height: 323, place: "Netherlands" },
  { name: "Denali", height: 6168, place: "United States" },
  { name: "Popocatepetl", height: 5465, place: "Mexico" },
  { name: "Mont Blanc", height: 4808, place: "Italy/France" }
];

let div = document.querySelector("#mountains");
let table = document.createElement("TABLE");
let heading = table.insertRow(0);

for (let field of Object.keys(MOUNTAINS[0])) {
  let th = document.createElement("TH");
  cell.innerHTML = field;
  heading.appendChild(th);
}
MOUNTAINS.forEach(mtn => {
  let row = table.insertRow(-1);
  for (let field in Mountain) {
    let cell = row.insertCell(-1);
    let cellText = document.createTextNode(mtn[field]);
    cell.appendChild(cellText);
  }
});
div.appendChild(table);
