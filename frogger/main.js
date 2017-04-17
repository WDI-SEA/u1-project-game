document.addEventListener('DOMContentLoaded', function() {
    var startedGame = false;
    var spaceAvailable = $(".grid-box").html();
    var frog = { x: 3, y: 0 };
    var carRight = { x: -1, y: 1 };
    var carLeft = { x: 7, y: 2 };
    var carStack = { x: 6, y: 2 };
    var carDblL = { x: 2, y: 2 };
    var carDbStack = { x: 1, y: 2 };
    var carDbl = { x: 2, y: 1 };
    var carTpl = { x: 5, y: 1 };
    var logRight = { x: -1, y: 4 };
    var logDbl = { x: 2, y: 4 };
    var logTpl = { x: 5, y: 4 };
    var logLeft = { x: 7, y: 5 };
    var logStack = { x: 6, y: 5 };
    var logLeftDb = { x: 2, y: 5 };
    var logLeftStk = { x: 1, y: 5 };



    ///start game
    $("#game-start").on("click", startGame);


    function startGame() {
        startedGame = true;
        $("#start-menu").hide();
        $("#game").removeClass("hidden");
    }

    ////game function - moves frog into new spaces

    $(document).on('keyup', moveFrog);

    function moveFrog(e) {
        if (startedGame === false) {
            return;
        }

        if (e.which == 37) {
            // left

            console.log("left");
            frog.x -= 1;


        } else if (e.which == 38) {
            // up
            frog.y += 1;

            console.log("up");
        } else if (e.which == 39) {
            //right
            frog.x += 1;

            console.log("right");
        } else if (e.which == 40) {
            //down
            frog.y -= 1;

            console.log("down");
        } else {
            return;
        }

        $(".frog").removeClass("frog");
        $(`.grid-box[data-x='${frog.x}'][data-y='${frog.y}']`).addClass("frog");


    }


    //cars movement

    setInterval(driveRight, 500);
    var counter = 0;

    function driveRight() {
        if (startedGame === true) {
            carTpl.x += 1;
            carDbl.x += 1;
            carRight.x += 1;

            $(".car").removeClass("car");
            $(`.grid-box[data-x='${carRight.x}'][data-y='${carRight.y}']`).addClass("car");

            $(".car-dbl").removeClass("car-dbl");
            $(`.grid-box[data-x='${carDbl.x}'][data-y='${carDbl.y}']`).addClass("car-dbl");

            $(".car-tpl").removeClass("car-tpl");
            $(`.grid-box[data-x='${carTpl.x}'][data-y='${carTpl.y}']`).addClass("car-tpl");


        }

    }

    setInterval(driveLeft, 700);

    function driveLeft() {
        if (startedGame === true) {
            carLeft.x -= 1;
            carStack.x -= 1;
            carDblL.x -= 1;
            carDbStack.x -= 1;

            $(".car-left").removeClass("car-left");
            $(`.grid-box[data-x='${carLeft.x}'][data-y='${carLeft.y}']`).addClass("car-left");

            $(".stacked-car").removeClass("stacked-car");
            $(`.grid-box[data-x='${carStack.x}'][data-y='${carStack.y}']`).addClass("stacked-car");

            $(".car-stack-d").removeClass("car-stack-d");
            $(`.grid-box[data-x='${carDbStack.x}'][data-y='${carDbStack.y}']`).addClass("car-stack-d");

            $(".car-left-d").removeClass("car-left-d");
            $(`.grid-box[data-x='${carDblL.x}'][data-y='${carDblL.y}']`).addClass("car-left-d");
        }
    }

    // logs movement

    setInterval(floatRight, 650);

    function floatRight() {
        if (startedGame === true) {
            logRight.x += 1;
            logDbl.x += 1;
            logTpl.x += 1;

            $(".log").removeClass("log");
            $(`.grid-box[data-x='${logRight.x}'][data-y='${logRight.y}']`).addClass("log");

            $(".log-dbl").removeClass("log-dbl");
            $(`.grid-box[data-x='${logDbl.x}'][data-y='${logDbl.y}']`).addClass("log-dbl");

            $(".log-tpl").removeClass("log-tpl");
            $(`.grid-box[data-x='${logTpl.x}'][data-y='${logTpl.y}']`).addClass("log-tpl");
        }
    }

    setInterval(floatLeft, 700);

    function floatLeft() {
        if (startedGame === true) {
            logLeft.x -= 1;
            logStack.x -= 1;
            logLeftDb.x -= 1;
            logLeftStk.x -= 1;

            $(".log-left").removeClass("log-left");
            $(`.grid-box[data-x='${logLeft.x}'][data-y='${logLeft.y}']`).addClass("log-left");

            $(".log-stack").removeClass("log-stack");
            $(`.grid-box[data-x='${logStack.x}'][data-y='${logStack.y}']`).addClass("log-stack");

            $(".log-stack-d").removeClass("log-stack-d");
            $(`.grid-box[data-x='${logLeftStk.x}'][data-y='${logLeftStk.y}']`).addClass("log-stack-d");

            $(".log-left-d").removeClass("log-left-d");
            $(`.grid-box[data-x='${logLeftDb.x}'][data-y='${logLeftDb.y}']`).addClass("log-left-d");

        }
    }







    ///end screen

    $("#game-restart").on("click", restart);

    function restart() {
        $("#end-wrapper").hide();
        $("#game").show();
    }



});
