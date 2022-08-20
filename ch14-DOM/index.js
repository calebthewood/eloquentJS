"use strict"


/** Given a starting node, searches the DOM  for the given string */
function talksAbout(node, string) {
  if (node.nodeType == Node.ELEMENT_NODE) {
    for (let child of node.childNodes) {
      if (talksAbout(child, string)) {
        return true;
      }
    }
    return false;
  } else if (node.nodeType ==Node.TEXT_NODE) {
    return node.nodeVale.indexOf(string) > -1;
  }
}

console.log(talksAbout(document.body, "text to look for"))