var counter = 0;
var seconds = 0;
var player1 = 0;
var player2 = 0;
var gameStarted = false;
var currentPlayer = player1;
$('#counter span').html(counter);
$('#timer span').html(seconds);

$('#start').hide();
$('#bunny').hide();
$('#endScreen').hide();

$('#startgame').on("click", function() {
    gameStarted = true;
    currentPlayer = player1;
    $(this).hide();

    var randWidth = Math.ceil(Math.random() * 700);
    var randHeight = Math.ceil(Math.random() * 700);

    $('#bunny').show();
    $('#bunny').css('top', randHeight);
    $('#bunny').css('left', randWidth);

    window.setInterval(function() {
        seconds = seconds + 1;
        $('#timer span').html(seconds);
    }, 1000);
});

$('#start').on("click", function() {


    var randWidth = Math.ceil(Math.random() * 700);
    var randHeight = Math.ceil(Math.random() * 700);

    $('#bunny').show();
    $('#bunny').css('top', randHeight);
    $('#bunny').css('left', randWidth);
    $(this).hide();
});

$('#bunny').on("click", function() {
    counter = counter + 1;
    $('#counter span').html(counter);

    if (counter === 20) {
        $('#endScreen').show();
        $('#endCount').html(counter);
        $('#endSeconds').html(seconds);
        $('#bunny').hide();
        $('#start').hide();
    } else {

        $(this).hide();
        $('#start').show();

    }
});
