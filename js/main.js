var counter = 0;
var seconds = 0;
var player1Score = 0;
var player2Score = 0;
var isPlayerOneTurn = true;
var gameStarted = false;
$('#counter span').html(counter);
$('#timer span').html(seconds);

$('.first-hide').hide('fast');
$('.first-hide').hide('fast');
$('.first-hide').hide('fast');

$('#startgame').on("click", function() {
    gameStarted = true;
    $(this).hide('fast');
    $('#endScreen').hide('fast');
    var randWidth = Math.ceil(Math.random() * 700);
    var randHeight = Math.ceil(Math.random() * 700);

    $('#bunny').show('fast');
    $('#bunny').css('top', randHeight);
    $('#bunny').css('left', randWidth);

    window.setInterval(function() {
        seconds = seconds + 1;
        $('#timer span').html(seconds);
    }, 1000);
});



$('#bunny').on("click", function() {
    counter = counter + 1;
    $('#counter span').html(counter);

    if (counter >= 20) {
        $('#endScreen').show();
        $('#endCount').html(counter);
        $('#endSeconds').html(seconds);
        $('#bunny').hide('fast');
        $('#start').hide('fast');
        $("#restart-game").show('fast');
        if (isPlayerOneTurn) {
            player1Score = counter;
        } else {
            player2Score = counter;
        }
        if (player1Score > player2Score) {
            console.log('PLAYER ONE WINS');
        } else if (player1Score < player2Score) {
            console.log("Player TWO wins");
        }
    } else {

        $(this).hide();
        $('#start').show('fast');

    }
});
$('#start').on("click", function() {


    var randWidth = Math.ceil(Math.random() * 700);
    var randHeight = Math.ceil(Math.random() * 700);

    $('#bunny').show('fast');
    $('#bunny').css('top', randHeight);
    $('#bunny').css('left', randWidth);
    $(this).hide();
});

$('#restart-game').on('click', function() {
    isPlayerOneTurn = false;
    counter = 0;
    seconds = 0;
    $(this).hide('fast');
    $('#bunny').show('fast');
    $('#endScreen').hide('fast');
});
