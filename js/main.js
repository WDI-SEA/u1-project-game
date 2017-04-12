var computersBoard = [
    ["_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_"]
];

var playersBoard = [
    ["_", "_", "_", "_", "_", "_"],
    ["P", "_", "_", "_", "_", "_"],
    ["P", "_", "P", "P", "P", "_"],
    ["P", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_"],
    ["_", "_", "P", "P", "P", "_"]
];


function makeShip(letter) {
    var ranRow = Math.ceil(4 * Math.random());
    var ranCol = Math.ceil(4 * Math.random());
    //console.log(letter + " " + ranCol + " " + ranRow);
    var rowOrCol = Math.floor(2 * Math.random());
    if (rowOrCol === 1) {
        //console.log(letter, rowOrCol, "col");
        // console.log(computersBoard[ranRow + 1][ranCol], computersBoard[ranRow][ranCol], computersBoard[ranRow - 1][ranCol]);
        if (computersBoard[ranRow + 1][ranCol] === "_" && computersBoard[ranRow][ranCol] === "_" && computersBoard[ranRow - 1][ranCol] === "_") {
            $(`tr:eq(${ranRow}) td:eq(${ranCol})`).attr('data-ship', letter);
            $(`tr:eq(${ranRow+1}) td:eq(${ranCol})`).attr('data-ship', letter);
            $(`tr:eq(${ranRow-1}) td:eq(${ranCol})`).attr('data-ship', letter);

            computersBoard[ranRow][ranCol] = letter;
            computersBoard[ranRow + 1][ranCol] = letter;
            computersBoard[ranRow - 1][ranCol] = letter;

        } else {
            makeShip(letter);
        }
    } else if (rowOrCol === 0) {
        // console.log(letter, "row");
        // console.log(computersBoard[ranRow][ranCol - 1], computersBoard[ranRow][ranCol], computersBoard[ranRow][ranCol + 1]);
        if (computersBoard[ranRow][ranCol - 1] === "_" && computersBoard[ranRow][ranCol] === "_" && computersBoard[ranRow][ranCol + 1] === "_") {
            $(`tr:eq(${ranRow}) td:eq(${ranCol})`).attr('data-ship', letter);
            $(`tr:eq(${ranRow}) td:eq(${ranCol+1})`).attr('data-ship', letter);
            $(`tr:eq(${ranRow}) td:eq(${ranCol-1})`).attr('data-ship', letter);
            computersBoard[ranRow][ranCol] = letter;
            computersBoard[ranRow][ranCol + 1] = letter;
            computersBoard[ranRow][ranCol - 1] = letter;
        } else {
            console.log("bad letter")
            makeShip(letter);
        }
    }
}
makeShip('A');
makeShip('B');
makeShip('C');

$(".0").text(computersBoard[0]);
$(".1").text(computersBoard[1]);
$(".2").text(computersBoard[2]);
$(".3").text(computersBoard[3]);
$(".4").text(computersBoard[4]);
$(".5").text(computersBoard[5]);

var playerShipsFound = 0;
var compShipsFound = 0;

function checkWin() {
    if (playerShipsFound === 9) {
        alert("you win");
        $('td').off();
    } else if (compShipsFound === 8) {
        alert("you lose");
        $('td').off();
    }
}

var oneRight = false;
var twoRight = false;
var firstGuess = [];
var secondGuess = [];
var secondGuessOptions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1]
];

function compSecondGuess() {
    var nextGuessDirection = Math.floor(4 * Math.random());
    console.log(firstGuess);
    var nextRow = firstGuess[0] + secondGuessOptions[nextGuessDirection][0];
    var nextCol = firstGuess[1] + secondGuessOptions[nextGuessDirection][1];
    console.log("secondGuess", nextRow, nextCol);
    if (nextRow > 5 || nextRow < 0 || nextCol > 5 || nextCol < 0) {
        console.log("number greater than 5 or smaller than 0")
        return compSecondGuess();
    }
    var secondGuess = playersBoard[nextRow][nextCol];
    if (secondGuess === "_") { //if empty
        console.log("2nd Miss");
        $(`#comp-board tr:eq(${nextRow}) td:eq(${nextCol})`).css('background-color', 'darkblue');
        playersBoard[nextRow][nextCol] = "miss";
    } else if (secondGuess === "P") {
        console.log("2nd hit")
        $(`#comp-board tr:eq(${nextRow}) td:eq(${nextCol})`).css('background-color', 'red');
        playersBoard[nextRow][nextCol] = "hit";
        //twoRight = true;
        //secondGuess = [nextRow, nextCol];
        firstGuess = [nextRow, nextCol];
        return oneRight = true;
    } else {
        console.log("bad second guess");
        compSecondGuess();
    }
    oneRight = false;


}

function thirdGuess() {
    console.log('nice');
    /*  if (firstGuess[0] = secondGuess[0]) {

      }*/
    twoRight = false;
};

function computerGuess() {
    var ranRow = Math.floor(6 * Math.random());
    var ranCol = Math.floor(6 * Math.random());
    if (twoRight) {
        thirdGuess();
    }
    if (oneRight) {
        compSecondGuess();
    } else {
        console.log(`computer 1st guess: row ${ranRow}, col ${ranCol}`);
        if (playersBoard[ranRow][ranCol] === "_") {
            $(`#comp-board tr:eq(${ranRow}) td:eq(${ranCol})`).css('background-color', 'darkblue');
            playersBoard[ranRow][ranCol] = "miss";
        } else if (playersBoard[ranRow][ranCol] === "P") {
            $(`#comp-board tr:eq(${ranRow}) td:eq(${ranCol})`).css('background-color', 'red');
            playersBoard[ranRow][ranCol] = "hit";
            compShipsFound += 1;
            oneRight = true;
            firstGuess = [ranRow, ranCol];
        } else {
            console.log("bad first guess")
            computerGuess();
        }
    }
}

function revealSquare() {
    //console.log($(this).data('ship'));
    if ($(this).data('ship') === "A") {
        $(this).css("background-color", "darkgrey");
        playerShipsFound += 1;
    } else if ($(this).data('ship') === 'B') {
        $(this).css("background-color", "darkgrey");
        playerShipsFound += 1;

    } else if ($(this).data('ship') === 'C') {
        $(this).css("background-color", "darkgrey");

        playerShipsFound += 1;
    } else {
        $(this).css("background-color", "darkblue");

    }
    checkWin();
    setTimeout(computerGuess, 1000);
}

$(function() {
    $('#player-board td').on('click', revealSquare);
});
