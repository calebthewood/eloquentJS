"use strict";

const SCALE = 10;

function drawPicture(picture, canvas, scale, previous) {
  if (previous == null ||
    previous.width != picture.width ||
    previous.height != picture.height) {
    canvas.width = picture.width * scale;
    canvas.height = picture.height * scale;
    previous = null;
  }

  let cx = canvas.getContext("2d");
  for (let y = 0; y < picture.height; y++) {
    for (let x = 0; x < picture.width; x++) {
      let color = picture.pixel(x, y);
      if (previous == null || previous.pixel(x, y) != color) {
        cx.fillStyle = color;
        cx.fillRect(x * scale, y * scale, scale, scale);
      }
    }
  }
}

class PictureCanvas {
  constructor(picture, pointerDown) {
    this.dom = elt("canvas", {
      onmousedown: event => this.mouse(event, pointerDown),
      ontouchstart: event => this.touch(event, pointerDown),
    });
    this.syncState(picture);
  }
}

PictureCanvas.prototype.syncState = function (picture) {
  if (this.picture == picture) return;
  drawPicture(picture, this.dom, SCALE, this.picture);
  this.picture = picture;
};

PictureCanvas.prototype.mouse = function (downEvent, onDown) {
  if (downEvent.button != 0) return;
  let pos = pointerPosition(downEvent, this.dom);
  let onMove = onDown(pos);
  if (!onMove) return;
  let move = moveEvent => {
    if (moveEvent.buttons == 0) {
      this.dom.removeEventListener("mousemove", move);
    } else {
      let newPos = pointerPosition(moveEvent, this.dom);
      if (newPos.x == pos.x && newPos.y == pos.y) return;
      pos = newPos;
      onMove(newPos);
    }
  };
  this.dom.addEventListener("mousemove", move);
};

function pointerPosition(pos, domNode) {
  let rect = domNode.getBoundingClientRect();
  return {
    x: Math.floor((pos.clientX - rect.left) / SCALE),
    y: Math.floor((pos.clientY - rect.top) / SCALE)
  };
}

PictureCanvas.prototype.touch = function (startEvent, onDown) {
  let pos = pointerPosition(startEvent.touches[0], this.dom);
  let onMove = onDown(pos);
  startEvent.preventDefault();
  if (!onMove) return;
  let move = moveEvent => {
    let newPos = pointerPosition(moveEvent.touches[0], this.dom);
    if (newPos.x == pos.x && newPos.y == pos.y) return;
    pos = newPos;
    onMove(newPos);
  };
  let end = () => {
    this.dom.removeEventListener("touchmove", move);
    this.dom.removeEventListener("touchend", end);
  };
  this.dom.addEventListener("touchmove", move);
  this.dom.addEventListener("touchend", end);
};

// export { PictureCanvas };