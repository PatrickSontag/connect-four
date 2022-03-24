/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

let WIDTH = 7;
let HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array - COMPLETE
  var row = []  // PS added row 
  for (let i = 1; i <= WIDTH; i++) {
    row.push(0);
  }
  for (let i = 1; i <= HEIGHT; i++) {
    board.push(row);
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board" - COMPLETE
  const htmlBoard = document.getElementById("board");
  // TODO: add comment for this code - COMPLETE
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");  // create top row
  top.addEventListener("click", handleClick);

  for (var x = 1; x <= WIDTH; x++) {  // add td's to the column tops row
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x); // give each td a unique ID
    top.append(headCell);
  }
  htmlBoard.append(top);  // add top row to board

  // TODO: add comment for this code - COMPLETE
  for (var y = 1; y <= HEIGHT; y++) {  // create one row (tr) for each unit the board is high
    const row = document.createElement("tr");  
    for (var x = 1; x <= WIDTH; x++) {  // create one td for each unit the baord is wide
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);  // give each td a unique ID based on the row-column it is located at
      cell.setAttribute("class", "empty");
      row.append(cell);
    }
    htmlBoard.append(row);  // append each row to the HTML board
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  const colCheck = document.querySelectorAll(`[id*="-${x}"][class="empty"]`)  // all elements in selected column with class "empty"
  const bottomSpot = colCheck[colCheck.length-1]  // last node in column with class "empty"
  const bottomRow = bottomSpot.id  // isolate the ID of last node
  const row = bottomRow[0];  // isolate row number from ID
  return row;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const makeDiv = document.createElement('div');
  makeDiv.setAttribute("class", "piece");
  const targetLoc = document.querySelector(`[id="${y}-${x}"]`);
  console.log(board[x]);
  console.log(board[y][x]);


  if (currPlayer === 1) {
    targetLoc.setAttribute("class", "player1");
    console.log(x);
    console.log(y);
  }
  else {
    targetLoc.setAttribute("class", "player2");
    // board[x][y] = 2;
  }

  targetLoc.appendChild(makeDiv);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = evt.target.id;

  // get next spot in column (if none, ignore click)
  var y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  // checkForTie() {
  //   if()
  // }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer === 1 ? currPlayer = 2 : currPlayer = 1;

}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
