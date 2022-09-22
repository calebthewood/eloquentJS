"use strict";
const GAME_OF_LIFE = document.getElementById("gameOfLife");
/*
Board Class {
  this.board = [[sqaure board]];

  GenerateInitialBoard
    output = []
    for n loops
      create row
      for n loops
        randomly assign 0 or 1
      push row to output

  Build Square Board
  - create table node
  - for row of board,
    create tr
    for cell of row
      create table cell with a checkbox
      on = checked, off = empty
      give cell unique id
    append row to table
  append table to dom


  Progress Round
    create new board by reading current board
    this.board.map => check cell against conditions and add new value, row by row.
}

add event listener to progress button, invoke progress round.
*/

class Board {
  constructor(board = []) {
    this.board = board;
  }

  initialize(n, m) {
    let row;
    for (let i = 0; i < n; i++) {
      row = [];
      for (let j = 0; j < m; j++) {
        row.push(Math.round(Math.random()));
      }
      this.board.push(row);
    }
  }

  drawBoard() {
    GAME_OF_LIFE.innerHTML = "";
    const lenCol = this.board[0].length;
    const lenRow = this.board.length;
    const table = document.createElement("table");
    let row;
    let cell;
    let checkBox;

    for (let i = 0; i < lenRow; i++) {
      row = document.createElement("tr");
      for (let j = 0; j < lenCol; j++) {
        // build the checkbox per exercise instructions
        // checkBox = document.createElement("input");
        // checkBox.type = "checkbox";
        // checkBox.classList.add(`x${j}-y${i}`);
        // checkBox.checked = !!this.board[j][i]; // !! coerces value to boolean
        // build the cell
        cell = document.createElement("td");
        cell.id = `x${j}-j${i}`;
        cell.classList.add(this.board[i][j] ? "alive" : "dead")
        // cell.appendChild(checkBox);
        row.appendChild(cell);
      }
      table.appendChild(row);
    }

    // let button = document.createElement("button");
    // button.innerText = "Next Round";
    // button.addEventListener("click", () => this.advanceRound());
    GAME_OF_LIFE.appendChild(table);
    GAME_OF_LIFE.append(button);
  }

  advanceRound() {
    const output = [];
    const lenCol = this.board[0].length;
    const lenRow = this.board.length;
    let N, NW, NE, S, SW, SE, E, W; // initialize neighbor cells
    let sum;
    let row;

    for (let i = 0; i < lenRow; i++) {
      row = [];
      for (let j = 0; j < lenCol; j++) {
        let cell = this.board[i][j];
        /* is garbage, but It was tenable when I thought I only
        had to deal with NSEW. I would change to some kind of adjaceny matrix
        or something more sophisticated. assumes no neighbor = 0. */
        N = i > 0 ? this.board[i - 1][j] : 0;
        NW = i > 0 && j > 0 ? this.board[i - 1][j - 1] : 0;
        NE = i > 0 && j < lenCol - 1 ? this.board[i - 1][j + 1] : 0;
        S = i < lenRow - 1 ? this.board[i + 1][j] : 0;
        SW = i < lenRow - 1 && j > 0 ? this.board[i + 1][j - 1] : 0;
        SE = i < lenRow - 1 && j < lenCol - 1 ? this.board[i + 1][j + 1] : 0;
        E = j < lenCol - 1 ? this.board[i][j + 1] : 0;
        W = j > 0 ? this.board[i][j - 1] : 0;
        sum = N + NW + NE + S + SW + SE + E + W;

        if (cell) {
          if (sum < 2 || sum > 3) {
            row.push(0);
          } else if (sum === 2 || sum === 3) {
            row.push(1);
          } else {
            row.push(0);
          }
        } else {
          if (sum === 3) {
            row.push(1);
          } else {
            row.push(0);
          }
        }
      };
      output.push(row);
    };
    this.board = output;
    this.drawBoard();
  }
}

/*
1. generate 1st board
2. generate a new board based on existing board
3.
*/

let start = new Board();
start.initialize(83, 151);


setInterval(() => start.advanceRound(), 250);


