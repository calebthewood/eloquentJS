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

/** Replaces image tags with the text from their "alt" attribute */
function replaceImages() {
  let images = document.body.getElementsByTagName('img');
  for (let i = images.length -1; i >=0; i--) {
    let image = images[i];
    if (image.alt) {
      let text = document.createTextNode(image.alt);
      image.parentNode.replaceChild(text, image)
    }
  }
}