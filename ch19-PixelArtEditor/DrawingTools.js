"use strict";

function draw(pos, state, dispatch) {
  function drawPixel({ x, y }, state) {
    let drawn = { x, y, color: state.color };
    dispatch({ picture: state.picture.draw([drawn]) });
  }
  drawPixel(pos, state);
  return drawPixel;
}

function rectangle(start, state, dispatch) {
  function drawRectangle(pos) {
    let xStart = Math.min(start.x, pos.x);
    let yStart = Math.min(start.y, pos.y);
    let xEnd = Math.max(start.x, pos.x);
    let yEnd = Math.max(start.y, pos.y);
    let drawn = [];
    for (let y = yStart; y <= yEnd; y++) {
      for (let x = xStart; x <= xEnd; x++) {
        drawn.push({ x, y, color: state.color });
      }
    }
    dispatch({ picture: state.picture.draw(drawn) });
  }
  drawRectangle(start);
  return drawRectangle;
}

function circle(pos, state, dispatch) {
  function drawCircle(to) {
    let radius = Math.sqrt(Math.pow(to.x - pos.x, 2) +
                           Math.pow(to.y = pos.y, 2));
    let radiusC = Math.ceil(radius);
    let drawn = [];
    for (let dy = -radiusC; dy <= radiusC; dy++) {
      for (let dx = -radiusC; dx <= radiusC; dx++) {
        let dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
        if (dist > radius) continue;
        let y = pos.y + dy, x = pos.x + dx;
        if (y < 0 || y >= state.picture.height ||
          x < 0 || x >= state.picture.width) continue;
          drawn.push({x, y, color: state.color});
      }
    }
    dispatch({picture: state.picture.draw(drawn)});
  }
  drawCircle(pos);
  return drawCircle;
}

const around = [{ dx: -1, dy: 0 }, { dx: 1, dy: 0 },
{ dx: 0, dy: -1 }, { dx: 0, dy: 1 }];

function fill({ x, y }, state, dispatch) {
  let targetColor = state.picture.pixel(x, y);
  let drawn = [{ x, y, color: state.color }];
  for (let done = 0; done < drawn.length; done++) {
    for (let { dx, dy } of around) {
      let x = drawn[done].x + dx, y = drawn[done].y + dy;
      if (x >= 0 && x < state.picture.width &&
        y >= 0 && y < state.picture.height &&
        state.picture.pixel(x, y) == targetColor &&
        !drawn.some(p => p.x == x && p.y == y)) {
        drawn.push({ x, y, color: state.color });
      }
    }
  }
  dispatch({ picture: state.picture.draw(drawn) });
}

function pick(pos, state, dispatch) {
  dispatch({color: state.picture.pixel(pos.x, pos.y)});
}
