var computersBoard;
var computersMap;
var playersBoard;

function initBoards() {
    computersBoard = [
        ["_", "_", "_", "_", "_", "_"],
        ["_", "_", "_", "_", "_", "_"],
        ["_", "_", "_", "_", "_", "_"],
        ["_", "_", "_", "_", "_", "_"],
        ["_", "_", "_", "_", "_", "_"],
        ["_", "_", "_", "_", "_", "_"]
    ];

    computersMap = [
        ["_", "_", "_", "_", "_", "_"],
        ["_", "_", "_", "_", "_", "_"],
        ["_", "_", "_", "_", "_", "_"],
        ["_", "_", "_", "_", "_", "_"],
        ["_", "_", "_", "_", "_", "_"],
        ["_", "_", "_", "_", "_", "_"]
    ];

    playersBoard = [
        ["_", "_", "_", "_", "_", "_"],
        ["_", "_", "_", "_", "_", "_"],
        ["_", "_", "_", "_", "_", "_"],
        ["_", "_", "_", "_", "_", "_"],
        ["_", "_", "_", "_", "_", "_"],
        ["_", "_", "_", "_", "_", "_"]
    ];
}
////////////Make the computer's ships//////////////
initBoards();

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
    $("#map.0").text(computersMap[0]);
    $("#map.1").text(computersMap[1]);
    $("#map.2").text(computersMap[2]);
    $("#map.3").text(computersMap[3]);
    $("#map.4").text(computersMap[4]);
    $("#map.5").text(computersMap[5]);
}

function printComputerBoard() {
    $("#comp.0").text(computersBoard[0]);
    $("#comp.1").text(computersBoard[1]);
    $("#comp.2").text(computersBoard[2]);
    $("#comp.3").text(computersBoard[3]);
    $("#comp.4").text(computersBoard[4]);
    $("#comp.5").text(computersBoard[5]);
}
///////////////////////////////////////////////////

////////////////Make Player Board//////////////////
var playerUnits = 0;

function printPlayersBoard() {
    $("#player.0").text(playersBoard[0]);
    $("#player.1").text(playersBoard[1]);
    $("#player.2").text(playersBoard[2]);
    $("#player.3").text(playersBoard[3]);
    $("#player.4").text(playersBoard[4]);
    $("#player.5").text(playersBoard[5]);
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
        this.setAttribute('data-clicked', "clicked");
        playersBoard[row][col] = "P";
        playerUnits += 1;
    }
    //printPlayersBoard();
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
        console.log("PLAYER WINS");
        $('td').off();
        $("#restart").toggle();
        gameOver("YOU WON!", './img/good_job.gif');
    } else if (compHits === 8) {
        console.log("COMP WINS");
        $('td').off();
        $("#restart").toggle();
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
    console.log("near hits around", row, col);
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
    printComputerMap();
}
//////////////////////////////////////////////////////////




////////////// Mark computer map hit or miss////////////////////
function markMiss(row, col) {
    $(`#comp-board tr:eq(${row}) td:eq(${col})`).addClass('nope');
    computersMap[row][col] = miss;
}

function markHit(row, col) {
    $(`#comp-board tr:eq(${row}) td:eq(${col})`).css('background-color', 'rgba(255, 33, 33, .8)');
    computersMap[row][col] = hit;
    compHits += 1;
}
///////////////////////////////////////////////////////////////



///////////////////////Computer's Guess/////////////////////////
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


///////////////////////////Players Guess/////////////////////////////
function revealSquare() {
    if (!$(this).hasClass('comp-goat') && !$(this).hasClass('nope')) {
        if ($(this).data('ship') === "A") {
            $(this).addClass('comp-goat');
            playerHits += 1;
        } else if ($(this).data('ship') === 'B') {
            $(this).addClass('comp-goat');
            playerHits += 1;

        } else if ($(this).data('ship') === 'C') {
            $(this).addClass('comp-goat');

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

    $('.left').toggle("slide");
    $('#start').toggle();
    $('.right h2').slideToggle();
}

///////////////////start game////////////////////
function startGame() {
    if (playerUnits != 9) {
        alert("place 9 units only");
    } else {
        $('#comp-board td').off();
        $('h1').toggleClass('color-change');
        $('p.instructions').toggle();
        toggleBetweenGames();
    }
}
/////////////////////////////////////////////

////////////////restart game//////////////////////
function restartGame() {
    console.log('restart');
    initBoards();
    makeShip('A');
    makeShip('B');
    makeShip('C');
    playerUnits = 0;
    $('td').removeClass();
    $('td').attr('data-clicked', 'notclicked');
    $('#comp-board td').on('click', markP);

    $('#player-board td').on('click', revealSquare);
    $("#comp-board td").css('background-color', '');
    //printComputerBoard();

    $('#restart').toggle();
    $('.game-over').css("display", 'none');
    toggleBetweenGames();
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
});
