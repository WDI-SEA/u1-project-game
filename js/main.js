var counter = 0;
var seconds = 0;
var player1Score = 0;
var player2Score = 0;
var isPlayerOneTurn = true;
var gameStarted = false;

function onPageLoad() {
    $('#counter span').html(counter);
    $('#timer span').html(seconds);

    $('.first-hide').hide();
    $('.first-hide').hide();
    $('.first-hide').hide();
    $('.first-hide').hide();
}

$('#startgame').on("click", function() {
    gameStarted = true;
    $(this).hide();
    $('#endScreen').hide();
    $('#start').show();
    var randWidth = Math.ceil(Math.random() * 500);
    var randHeight = Math.ceil(Math.random() * 500);
    var randWidth1 = Math.ceil(Math.random() * 500);
    var randHeight1 = Math.ceil(Math.random() * 500);
    $('#tweety-bird').show();
    $('tweety-bird').css('top', randHeight1);
    $('tweety-bird').css('right', randWidth1);
    $('#bunny').show();
    $('#bunny').css('top', randHeight);
    $('#bunny').css('left', randWidth);

    window.setInterval(function() {
        seconds = seconds + 1;
        $('#timer span').html(seconds);
    }, 1000);
});

$('#tweety-bird').on('click', function() {
    counter = counter - 1;
    $(this).hide();
    $('#bunny').hide();
    $('#start').show();
    $('#gun-sound')[0].currentTime = 0;
    $('#gun-sound')[0].play();
    $('#bird-sound')[0].currentTime = 0;
    $('#bird-sound')[0].play();


});

$('#start').on("click", function() {


    var randWidth = Math.ceil(Math.random() * 750);
    var randHeight = Math.ceil(Math.random() * 750);
    var randWidth1 = Math.ceil(Math.random() * 550);
    var randHeight1 = Math.ceil(Math.random() * 550);

    $('#tweety-bird').show();
    $('#tweety-bird').css('top', randHeight1);
    $('#tweety-bird').css('left', randWidth1);
    $('#bunny').show();
    $('#bunny').css('top', randHeight);
    $('#bunny').css('left', randWidth);
    //$(this).hide();
});

$('#bunny').on("click", function() {
    counter = counter + 1;
    $('#counter span').html(counter);
    if (counter >= 20) {
        $('#endScreen').show();
        $('#endCount').html(counter);
        $('#endSeconds').html(seconds);
        $('#bunny').hide();
        $('#start').hide();
        $('#tweety-bird').hide();
        $("#restart-game").show();
        if (isPlayerOneTurn) {
            player1Score = counter;
        } else {
            player2Score = counter;
        }
    } else {
        $(this).hide();
        $('#tweety-bird').hide();
        $('#start').show();
        $('#gun-sound')[0].currentTime = 0;
        $('#gun-sound')[0].play();

    }
});


$('#restart-game').on('click', function() {
    isPlayerOneTurn = false;
    counter = 0;
    seconds = 0;
    $(this).hide();
    $('#bunny').show();
    $('#endScreen').hide();
});
$(onPageLoad);
