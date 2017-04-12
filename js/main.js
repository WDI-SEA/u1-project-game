var board = [
    ["_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_"]
];

/*function makeShip(letter) {
    var ranRow = Math.ceil(4 * Math.random());
    var ranCol = Math.ceil(4 * Math.random());
    console.log(letter + " " + ranCol + " " + ranRow);
    if (board[ranCol][ranRow] === "O" && board[ranCol + 1][ranRow] === "O") {
        board[ranCol][ranRow] = letter;
        board[ranCol + 1][ranRow] = letter;
        board[ranCol - 1][ranRow] = letter;
    } else if (board[ranCol][ranRow] === "O" && board[ranCol][ranRow + 1] === "O") {
        board[ranCol][ranRow] = letter;
        board[ranCol][ranRow + 1] = letter;
        board[ranCol][ranRow - 1] = letter;
    } else {
        makeShip(letter);
    }
}
*/


function makeShip(letter) {
    var ranRow = Math.ceil(4 * Math.random());
    var ranCol = Math.ceil(4 * Math.random());
    console.log(letter + " " + ranCol + " " + ranRow);
    if (Math.floor(2 * Math.random()) === 1) {
        if (board[ranRow][ranCol] === "_" && board[ranRow + 1][ranCol] === "_" && board[ranRow - 1][ranCol] === "_") {
            board[ranRow][ranCol] = letter;
            board[ranRow + 1][ranCol] = letter;
            board[ranRow - 1][ranCol] = letter;
        } else {
            makeShip(letter);
        }
    } else if (Math.floor(2 * Math.random()) === 0) {
        if (board[ranRow][ranCol] === "_" && board[ranRow][ranCol + 1] === "_" && board[ranRow][ranCol + 1] === "_") {
            board[ranRow][ranCol] = letter;
            board[ranRow][ranCol + 1] = letter;
            board[ranRow][ranCol - 1] = letter;
        } else {
            makeShip(letter);
        }

    } else {
        makeShip(letter);
    }
}


makeShip('A');
makeShip('B');
makeShip('C');

$(".0").text(board[0]);
$(".1").text(board[1]);
$(".2").text(board[2]);
$(".3").text(board[3]);
$(".4").text(board[4]);
$(".5").text(board[5]);
