$(function() {
    //Declared variables 
    var container = $('#container');
    var gameStart = false;
    var startMenu = $('#start-menu');
    var bird = $('#bird');
    var pole = $('.pole');
    var column1 = $('#column1');
    var column2 = $('#column2');
    var score = $('#score');
    var speed_span = $('#speed');
    var restartbtn = $('#restartbtn');
    var body = $('body');

    var container_width = parseInt(container.width()); //90% = 90
    var container_height = parseInt(container.height()); //400px = 400
    var polePosition = parseInt(pole.css('right')); //-50px == -50
    var poleHeight = parseInt(pole.css('height')); //130px == 130
    var bird_left = parseInt(bird.css('left')); //15% == 15
    var bird_height = parseInt(bird.height()); //42px == 42
    var speed = 10; //initial speed

    //game conditions 
    var go_up = false;
    var score_updated = false;
    var game_over = false;

    var the_game = setInterval(function() {
        //stop the game if birds position touches 'top div, bottom div, column 1, and column 2'
        if (collision(bird, column1) || collision(bird, column2) || parseInt(bird.css('top')) <= 0 || parseInt(bird.css('top')) > container_height - bird_height) {

            stop_the_game();

        } else {

            var pole_current_position = parseInt(pole.css('right')); // Pole's current position == -50

            //updates the scoreboard
            if (pole_current_position > container_width - bird_left) {
                if (score_updated === false) {
                    score.text(parseInt(score.text()) + 1);
                    score_updated = true;
                }
            }

            // poles reappear
            if (pole_current_position > container_width) {
                var new_height = parseInt(Math.random() * 100); // values of 10s

                // change pole's height
                column1.css('height', poleHeight + new_height);
                column2.css('height', poleHeight - new_height);

                //increase speed
                speed++;
                speed_span.text(speed);

                score_updated = false;

                pole_current_position = polePosition;
            }

            //moves pole right to left 10px (speed)
            pole.css('right', pole_current_position + speed);

            if (go_up === false) {
                go_down();
            }
        }

    }, 20);



    // move bird up using spacebar (key=32)
    $(document).on('keydown', function(event) {
        var key = event.keyCode;
        if (key === 32 && go_up === false && game_over === false) {
            go_up = setInterval(up, 50);
        }
    });


    //make bird come back down after releasing spacebar
    $(document).on('keyup', function(event) {
        var key = event.keyCode;
        if (key === 32) {
            clearInterval(go_up);
            go_up = false;
        }
    });

    body.on('click', function() {
        bird.css('top', parseInt(bird.css('top')) - 75);
    })


    //move bird down by increase top
    function go_down() {
        bird.css('top', parseInt(bird.css('top')) + 5);
    }
    // move bird up
    function up() {
        bird.css('top', parseInt(bird.css('top')) - 10);
    }


    //reveals restart btn when game over conditions are met
    function stop_the_game() {
        clearInterval(the_game);
        game_over = true;
        restartbtn.slideDown();
    }
    //restarts the game
    restartbtn.click(function() {
        location.reload();
    });


    // condition for bird collisions. 
    function collision($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;



        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;


        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }



});