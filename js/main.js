function onPageLoad() {
    $("#playerOneRollButton").on("click", playerOneRollDice);
    console.log("player one button clicked");
    $("#playerTwoRollButton").on("click", playerTwoRollDice).hide();
    console.log("player two button clicked");
}
$(onPageLoad);

//dice//
function getRandomNumberUpTo(max) {
    return Math.floor(Math.random() * 6) + 1;
}

var p1Name = $('#p1name').val();
var p2Name = $('#p2name').val();

var p1Sum;
var p2Sum;

var p1Array;
var p2Array;

function playerOneRollDice() {
    var die1 = $("#die1");
    var die2 = $("#die2");
    var die3 = $("#die3");
    var die4 = $("#die4");
    var die5 = $("#die5");
    var d1 = getRandomNumberUpTo(6);
    var d2 = getRandomNumberUpTo(6);
    var d3 = getRandomNumberUpTo(6);
    var d4 = getRandomNumberUpTo(6);
    var d5 = getRandomNumberUpTo(6);
    p1Sum = d1 + d2 + d3 + d4 + d5;
    console.log(p1Sum);
    p1Array = [d1, d2, d3, d4, d5];
    console.log(p1Array);
    $("dice").removeClass("d1", "d2", "d3", "d4", "d5");
    die1.addClass("d" + d1);
    die2.addClass("d" + d2);
    die3.addClass("d" + d3);
    die4.addClass("d" + d4);
    die5.addClass("d" + d5);

    $("#player1Sum").html("PLAYER ONE ROLLED " + p1Sum + ".");
    $("#playerTwoRollButton").show();
    $("#playerOneRollButton").hide();


}

function playerTwoRollDice() {
    var die6 = $("#die6");
    var die7 = $("#die7");
    var die8 = $("#die8");
    var die9 = $("#die9");
    var die10 = $("#die10");
    var d6 = getRandomNumberUpTo(6);
    var d7 = getRandomNumberUpTo(6);
    var d8 = getRandomNumberUpTo(6);
    var d9 = getRandomNumberUpTo(6);
    var d10 = getRandomNumberUpTo(6);
    p2Sum = d6 + d7 + d8 + d9 + d10;
    console.log(p2Sum);
    p2Array = [d6, d7, d8, d9, d10];
    console.log(p2Array);
    $("dice").removeClass("d6", "d7", "d8", "d9", "d10");
    die6.addClass("d" + d6);
    die7.addClass("d" + d7);
    die8.addClass("d" + d8);
    die9.addClass("d" + d9);
    die10.addClass("d" + d10);

    $("#player2Sum").html("PLAYER TWO ROLLED " + p2Sum + ".");
    $("#playerTwoRollButton").hide();
    compareSums();
}

function compareSums() {
    $("#winnerMessage").hide();
    if (p1Sum > p2Sum) {
        $("#winnerMessage").text("PLAYER ONE IS THE HIGHROLLER");
    } else if (p1Sum === p2Sum) {
        $("#winnerMessage").text("Tie!  Re-roll please.");
    } else {
        $("#winnerMessage").text("PLAYER TWO IS THE HIGHROLLER");
    }
    $("#winnerMessage").fadeIn(1500);
}
//menu navigation//
$('#soundOn').on('click', function() {
    $('#soundOn').hide();
    $('soundOff').show();
    $('#gnawaAudio').play();
    event.preventDefault();

});
$('#soundOff').on('click', function() {
    $('soundOff').hide();
    $('soundOn').show();
    $('#gnawaAudio').pause();
    event.preventDefault();
});

$('#menu').on('click', function() {
    $('#menu').hide();
    $('#menuClose').show();
    $('#menuList').show();
    // $('#gnawaAudio').play();
    event.preventDefault();
});
$('#menuClose').on('click', function() {
    $('#menuClose').hide();
    $('#menu').show();
    $('#menuList').hide();
    $('#highroller').hide();
    $('#advice').hide();
    $('#about').hide();
    event.preventDefault();

});

$('#diceGame').on('click', function() {
    $('#menuList').hide();
    $('#highroller').show();
    $('#socialMedia').hide();
    $('#gnawaAudio').pause();
    $('#ululationAudio').play();
    event.preventDefault();
});
$('#playerOneRollButton').on('click', function() {
    $('#diceRoll').play();
    event.preventDefault();
});
$('#playerTwoRollButton').on('click', function() {
    $('#diceRoll').play();
    event.preventDefault();
});
$('#about').on('click', function() {
    $('#menu').hide();
    $('#carousel').show();
    $(".single-item").slick();
    $('#menuList').hide();
    $('#socialMedia').hide();
    $('#gnawaAudio').pause();
    $('#persianAudio1').play();
    event.preventdefault();
});
