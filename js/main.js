var boardSize;

function boardAlert() {
    boardSize = prompt("Enter Board Size >5");
    if (boardSize < 6 || isNaN(boardSize)) {
        boardAlert();
    }
}
boardAlert();

////////////Make JS Boards/////////////
var computersBoard = [];
var computersMap = [];
var playersBoard = [];


function makeJSBoard(board, size) {

    for (var i = 0; i < size; i++) {
        var row = [];
        for (var j = 0; j < size; j++) {
            row.push("_");
        }
        board.push(row);
    }
}

function initBoards(size) {
    computersBoard = [];
    computersMap = [];
    playersBoard = [];
    makeJSBoard(computersBoard, size);
    makeJSBoard(computersMap, size);
    makeJSBoard(playersBoard, size);

}
initBoards(boardSize);
////////////////////////////////////////////////////

/////////////////Make HTML boards///////////////////
function htmlBoards(board) {
    for (var i = 0; i < boardSize; i++) {
        var $row = $("<tr>").attr('data-row', i);
        for (var j = 0; j < boardSize; j++) {
            $row.append($("<td>").attr('data-num', j));
        }
        $(`#${board} tbody`).append($row);
    }
}
htmlBoards("comp-board");
htmlBoards("player-board");
/////////////////////////////////////////////////////

////////////Make the computer's ships//////////////
function makeShip(letter) {
    var ranRow = Math.ceil((boardSize - 2) * Math.random());
    var ranCol = Math.ceil((boardSize - 2) * Math.random());
    var rowOrCol = Math.floor(2 * Math.random());
    if (rowOrCol === 1) {
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
        if (computersBoard[ranRow][ranCol - 1] === "_" && computersBoard[ranRow][ranCol] === "_" && computersBoard[ranRow][ranCol + 1] === "_") {
            $(`tr:eq(${ranRow}) td:eq(${ranCol})`).attr('data-ship', letter);
            $(`tr:eq(${ranRow}) td:eq(${ranCol+1})`).attr('data-ship', letter);
            $(`tr:eq(${ranRow}) td:eq(${ranCol-1})`).attr('data-ship', letter);
            computersBoard[ranRow][ranCol] = letter;
            computersBoard[ranRow][ranCol + 1] = letter;
            computersBoard[ranRow][ranCol - 1] = letter;
        } else {
            makeShip(letter);
        }
    }
}
makeShip('A');
makeShip('B');
makeShip('C');

function printBoard(htmlBoard, jsBoard) {
    for (var i = 0; i < boardSize; i++) {
        $(`#${htmlBoard}`).append($("<div>").text(jsBoard[i]));
    }
}
//printBoard("comp", computersBoard);


///////////////////////////////////////////////////

////////////////Mark Player Board//////////////////
var playerUnits = 0;

function moreGoats() {
    if (playerUnits === 0 || playerUnits === 9) {
        $('.right h3').css("display", "none");
    } else {
        $('.right h3').css("display", "block");
        $('#player-count').text(" " + 9 - playerUnits + " ");

    }

}

function markP() {
    var row = $(this).parent().data('row');
    var col = $(this).data('num');
    if (this.getAttribute("data-clicked") === "clicked") {
        $(this).removeClass('goat');
        this.setAttribute("data-clicked", "notClicked");
        playersBoard[row][col] = "_";
        playerUnits -= 1;
    } else {
        $(this).addClass('goat');
        var babySound = new Audio('./img/baby.mp3');
        babySound.play();
        this.setAttribute('data-clicked', "clicked");
        playersBoard[row][col] = "P";
        playerUnits += 1;
    }
    moreGoats();
}
///////////////////////////////////////////////////

///////////////display game over//////////////////
function gameOver(text, image) {
    $('.game-over').css('display', 'block');
    $('.game-over p').text(text);
    $('.game-over img').attr('src', image);
}

/////////////////Check who's winning////////////////
var playerHits = 0;
var compHits = 0;

function checkWin() {
    if (playerHits === 9) {
        $('td').off();
        $("#restart").toggle();
        $("#board-change").toggle();
        gameOver("YOU WON!", './img/good_job.gif');
    } else if (compHits === 8) {
        $('td').off();
        $("#restart").toggle();
        $("#board-change").toggle();
        gameOver("You lost to a poorly programmed computer. How's that feel?", './img/lose.gif');
    }
}
////////////////////////////////////////////////////

////////////////Near Hits////////////////////////////
var nearHit = "1";
var hit = "X";
var miss = "0";

var nearHitOptions = [
    [1, 0],
    [0, 1],
    [0, -1],
    [-1, 0]
];


function markNearHits(row, col) {
    var loops = 4;
    var i = 0;
    if (row === 0) {
        loops = 3;
    }

    if (row === 5) {
        i = 1;
    }

    for (i; i < loops; i++) {
        var cellVal = computersMap[row + nearHitOptions[i][0]][col + nearHitOptions[i][1]];
        if (cellVal === "_") {
            computersMap[row + nearHitOptions[i][0]][col + nearHitOptions[i][1]] = nearHit;
            //$(`#comp-board tr:eq(${row + nearHitOptions[i][0]}) td:eq(${col + nearHitOptions[i][1]})`).css('background-color', 'green');
        }
    }

}
//////////////////////////////////////////////////////////

////////////// Mark computer map hit or miss////////////////////
function markMiss(row, col) {
    $(`#comp-board tr:eq(${row}) td:eq(${col})`).addClass('nope');
    computersMap[row][col] = miss;
}

function markHit(row, col) {
    $(`#comp-board tr:eq(${row}) td:eq(${col})`).css('background-color', 'rgba(255, 33, 33, .8)');
    var hitSound = new Audio("./img/hit.mp3");
    hitSound.play();
    computersMap[row][col] = hit;
    compHits += 1;
}
///////////////////////////////////////////////////////////////

///////////////////////Computer's Guess/////////////////////////
function computerGuess() {
    for (var i = 0; i < boardSize; i++) {
        for (var j = 0; j < boardSize; j++) {
            if (computersMap[i][j] === nearHit) {
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
    var ranRow = Math.floor(boardSize * Math.random());
    var ranCol = Math.floor(boardSize * Math.random());
    if (computersMap[ranRow][ranCol] === "_" && playersBoard[ranRow][ranCol] === "_") {
        markMiss(ranRow, ranCol);
    } else if (computersMap[ranRow][ranCol] === "_" && playersBoard[ranRow][ranCol] === "P") {
        markHit(ranRow, ranCol);
        markNearHits(ranRow, ranCol);
    } else {
        computerGuess();
    }

}

///////////////////////////Players Guess/////////////////////////////
function revealSquare() {
    if (!$(this).hasClass('comp-goat') && !$(this).hasClass('nope')) {
        if ($(this).data('ship') === "A" || $(this).data('ship') === "B" || $(this).data('ship') === "C") {
            $(this).addClass('comp-goat');
            var hitSound = new Audio("./img/hit.mp3");
            hitSound.play();
            playerHits += 1;
        } else {
            $(this).addClass('nope');

        }
        checkWin();
        setTimeout(computerGuess, 800);
    }
}
/////////////////////////////////////////////////////
function toggleBetweenGames() {
    playerUnits = 0;
    playerHits = 0;
    compHits = 0;
    $('.left').toggle("slide");
    $('#start').toggle();
    $('.right h2').slideToggle();
    $('p.instructions').toggle();
    $('h1').toggleClass('color-change');
}
///////////////////start game////////////////////
function startGame() {
    if (playerUnits != 9) {
        alert("PLACE 9 GOATS");
    } else {
        $('#comp-board td').off();
        toggleBetweenGames();
    }
}
/////////////////////////////////////////////

////////////////restart game//////////////////////
function restartGame() {
    initBoards(boardSize);
    makeShip('A');
    makeShip('B');
    makeShip('C');
    $('td').removeClass();
    $('td').attr('data-clicked', 'notclicked');
    $('#comp-board td').on('click', markP);
    $('#player-board td').on('click', revealSquare);
    $("#comp-board td").css('background-color', '');
    $('#restart').toggle();
    $('#board-change').toggle();
    $('.game-over').css("display", 'none');
    toggleBetweenGames();
}

function reload() {
    location.reload();
}

//////////////////////////////////////////////////////////

function pageLoadStuff() {
    $('.flex-box').slideToggle();
    $('.flex-box').css('display', 'flex');
}


$(function() {
    setTimeout(pageLoadStuff, 1000);
    $('#player-board td').on('click', revealSquare);
    $('#comp-board td').on('click', markP);
    $('#start').on('click', startGame);
    $('#restart').on('click', restartGame);
    $('#board-change').on('click', reload);
});
