/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array //board is a matrix array, which means it has nested arrays... 
  //one option is to hard code the board board = [[null,null,null,null,null,null,null],[]*7 ]
  
  /** my code
   * //empty array with 7 null elements
    let matrixArray = [];
    matrixArray.length = WIDTH;
    //populate the board with 6 arrays
    for(let i = 0; i<HEIGHT; i++){
      board.push(matrixArray);
    }
  */

  for (let y = 0; y < HEIGHT; y++) {
    board.push(Array.from({ length: WIDTH }));
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
//const htmlBoard = document.querySelector("#board");
const htmlBoard = document.getElementById('board');
  // TODO: add comment for this code
  //new tr HTML element is created and is set to the variable top
  const top = document.createElement("tr");
  //id of new created tr is column-top
  top.setAttribute('id', "column-top");
  //new created tr will listen for clicks
  top.addEventListener("click", handleClick);

  //will loop 7 times, width is 7
  for (let x = 0; x < WIDTH; x++) {
    //new td is created called headCell
    const headCell = document.createElement("td");
    //headCell has an id of x
    headCell.setAttribute("id", x);
    //top which is a tr will have a child element of headCell which is a td
    top.append(headCell);
  }
  //board now has one child element of a tr with 7 td children
  htmlBoard.append(top);

  // TODO: add comment for this code
  //for loop will execute 6 times
  for (let y = 0; y < HEIGHT; y++) {
    //new tr is created 
    const row = document.createElement("tr");
    //will loop 7 times every time one outter loop executes 
    for (var x = 0; x < WIDTH; x++) {
      //new td is created called cell
      const cell = document.createElement("td");
      //td will have an id equal to the for loop's stage. 
      //top left will be 0,0
      //bottom left will be 5,0
      cell.setAttribute("id", `${y}-${x}`);
      //the created row will have 7 td cells with y-x coordinate
      row.append(cell);
    }
    //the table html element will have 6 rows of 7 children below the top tr
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
  return null;

  /* 
   
my answer without looking at solution:
  const cell = document.getElementById(`${y}-${x}`);
    if (cell === null){
      return y;
    }
    */
}

/** placeInTable: update DOM to place piece into HTML table of board */


function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const divpiece = document.createElement("div");
  //divpiece.setAttribute("class", "piece");   
  //divpiece.setAttribute("class", `p${currPlayer}`);
  divpiece.classList.add('piece');
  divpiece.classList.add(`p${currPlayer}`);
  divpiece.style.top = -50 * (y + 2);

  const tableCell = document.getElementById(`${y}-${x}`);
  tableCell.append(divpiece);
}



/** endGame: announce game end */

function endGame(msg) {
 //alert(`${currPlayer} has won!`);
 alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);
 

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

if (board.every(row => row.every(cell => cell))) {
  return endGame('Tie!');}
/** my solution 
 * for(let y = 0; y<= HEIGHT; y++){
    let row = board[y];
    let checkIfNull = (cell) => {cell === null};
    if(row.every(checkIfNull)){
      return endGame(`tied`);
    }
    }
*/

  
  // switch players
  // TODO: switch currPlayer 1 <-> 2

  //if currplayer ===1 is true, then currplayer will be set to 2. if currplayer is not 1, then currplayer will be set to 1
currPlayer = currPlayer === 1? 2 : 1;

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

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
// if any of these conditions are true, then winner will be that color 
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
