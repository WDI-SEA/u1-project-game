var computersBoard = [
    ["_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_"]
];

var computersMap = [
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
    ["P", "_", "_", "P", "P", "P"],
    ["P", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_"],
    ["_", "_", "P", "P", "P", "_"]
];

////////////Make the computer's ships//////////////
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
            //console.log("bad letter");
            makeShip(letter);
        }
    }
}
makeShip('A');
makeShip('B');
makeShip('C');


function printComputerMap() {
    $(".0").text(computersMap[0]);
    $(".1").text(computersMap[1]);
    $(".2").text(computersMap[2]);
    $(".3").text(computersMap[3]);
    $(".4").text(computersMap[4]);
    $(".5").text(computersMap[5]);
}
///////////////////////////////////////////////////


/////////////////Check who's winning////////////////
var playerHits = 0;
var compHits = 0;

function checkWin() {
    if (playerHits === 9) {
        alert("you win");
        $('td').off();
    } else if (compHits === 8) {
        alert("you lose");
        $('td').off();
    }
}
////////////////////////////////////////////////////



/*var oneRight = false;
var firstGuess = [];
var secondGuess = [];
var secondGuessOptions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1]
];
*/
var nearHit = "1";
var hit = "X";
var miss = "0";


/*function compSecondGuess() {
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
*/
/*
function computerGuess() {
    var ranRow = Math.floor(6 * Math.random());
    var ranCol = Math.floor(6 * Math.random());
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
            console.log("bad first guess");
            computerGuess();
        }
    }
}*/
var nearHitOptions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1]
];


function markNearHits(row, col) {
    console.log("near hits around", row, col);

    for (var i = 0; i < 4; i++) {
        //TODO fix for lowest row
        var cellVal = computersMap[row + nearHitOptions[i][0]][col + nearHitOptions[i][1]];
        if (cellVal !== undefined && cellVal === "_") {
            computersMap[row + nearHitOptions[i][0]][col + nearHitOptions[i][1]] = nearHit;
            //$(`#comp-board tr:eq(${row + nearHitOptions[i][0]}) td:eq(${col + nearHitOptions[i][1]})`).css('background-color', 'green');
        }
    }
    //printComputerMap();
}

function markMiss(row, col) {
    $(`#comp-board tr:eq(${row}) td:eq(${col})`).css('background-color', 'darkblue');
    computersMap[row][col] = miss;
}

function markHit(row, col) {
    $(`#comp-board tr:eq(${row}) td:eq(${col})`).css('background-color', 'red');
    computersMap[row][col] = hit;
    compHits += 1;
}


function computerGuess() {
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 6; j++) {
            if (computersMap[i][j] === nearHit) {
                console.log("nearHit found");
                if (playersBoard[i][j] === "_") {
                    markMiss(i, j);
                    return;
                } else if (playersBoard[i][j] === "P") {
                    markHit(i, j);
                    markNearHits(i, j);
                    return;
                }
            }
        }
    }
    var ranRow = Math.floor(6 * Math.random());
    var ranCol = Math.floor(6 * Math.random());
    console.log(`computer random guess: row ${ranRow}, col ${ranCol}`);
    if (computersMap[ranRow][ranCol] === "_" && playersBoard[ranRow][ranCol] === "_") {
        markMiss(ranRow, ranCol);
    } else if (computersMap[ranRow][ranCol] === "_" && playersBoard[ranRow][ranCol] === "P") {
        markHit(ranRow, ranCol);
        markNearHits(ranRow, ranCol);
    } else {
        console.log("bad guess");
        computerGuess();
    }
    //printComputerMap();
}



function revealSquare() {
    //console.log($(this).data('ship'));
    if ($(this).data('ship') === "A") {
        $(this).css("background-color", "darkgrey");
        playerHits += 1;
    } else if ($(this).data('ship') === 'B') {
        $(this).css("background-color", "darkgrey");
        playerHits += 1;

    } else if ($(this).data('ship') === 'C') {
        $(this).css("background-color", "darkgrey");

        playerHits += 1;
    } else {
        $(this).css("background-color", "darkblue");

    }
    checkWin();
    computerGuess();
    //setTimeout(computerGuess, 1000);
    printComputerMap();
}

$(function() {
    $('#player-board td').on('click', revealSquare);
});
