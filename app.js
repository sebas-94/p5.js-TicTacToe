/**
 * VARIABLES
 */
let canvasSide = 400;
let rows = 3;
let cols = 3;
let board = create2dArray(rows, cols);
let marginX = 30;
let marginO = 50;
let turn = false;


// Create 2D Array
function create2dArray(rows, cols) {
    let array = [];

    for (let i = 0; i < rows; i++) {
        array.push([]);
        for (let j = 0; j < cols; j++) {
            //array[i][j] = i * cols + j;
            array[i][j] = '';
        }
    }
    return array;
}

// Draw 2D array
function draw2dArray(array) {
    let rows = array.length;
    let cols = array[0].length;

    // Rows
    for (let i = 1; i < array.length; i++) {
        line(0, height / rows * i, width, width / rows * i);
    }
    // Cols
    for (let i = 1; i < array[0].length; i++) {
        line(width / cols * i, 0, width / cols * i, height);
    }
    // O or X
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            if (array[j][i] == 'O') {
                circle(width / 3 * i + (width / 3) / 2, height / 3 * j + (height / 3) / 2, width / 3 - marginO);
            } else if (array[j][i] == 'X') {
                line(width / 3 * i + marginX, height / 3 * j + marginX, width / 3 * (i + 1) - marginX, height / 3 * (j + 1) - marginX);
                line(width / 3 * i + marginX, height / 3 * (j + 1) - marginX, width / 3 * (i + 1) - marginX, height / 3 * j + marginX);
            }
        }
    }

}


function setup() {
    createCanvas(canvasSide, canvasSide);
    strokeWeight(3);
    noFill();
}

function draw() {
    background(190, 230, 240);
    draw2dArray(board);
}


function mouseClicked() {

    let rowCell = canvasSide / board.length;
    let colCell = canvasSide / board[0].length;

    let click = [];

    if (mouseX > canvasSide || mouseY > canvasSide) {
        console.log("out");
        click = []
    } else {
        let x = Math.trunc(mouseY / rowCell);
        let y = Math.trunc(mouseX / colCell);

        click = [x, y];

        if (board[x][y] == '') {

            if (turn) {
                board[x][y] = ('X');
            } else {
                board[x][y] = ('O');
            } turn = !turn;


            if(checkWinner() != null){
                alert(checkWinner());
            }

        }





    }

}

function checkEmpty() {

    let hole = 0;

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] == '') {
                hole++;
            }
        }
    }

    return hole;
}


function equals3(a, b, c) {
    return a == b && b == c && a != '';
}

function checkWinner() {
    let winner = null;

    // horizontal
    for (let i = 0; i < 3; i++) {
        if (equals3(board[i][0], board[i][1], board[i][2])) {
            winner = board[i][0];
        }
    }

    // Vertical
    for (let i = 0; i < 3; i++) {
        if (equals3(board[0][i], board[1][i], board[2][i])) {
            winner = board[0][i];
        }
    }

    // Diagonal
    if (equals3(board[0][0], board[1][1], board[2][2])) {
        winner = board[0][0];
    }
    if (equals3(board[2][0], board[1][1], board[0][2])) {
        winner = board[2][0];
    }

    if (winner == null && checkEmpty() == 0) {
        return 'tie';
    } else {
        return winner;
    }
}