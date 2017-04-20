function onPageLoad() {
    $("#playerOneRollButton").on("click", playerOneRollDice); //change to key up
    console.log("player one button clicked");
    $("#playerTwoRollButton").on("click", playerTwoRollDice).hide(); //change to key up
    console.log("player two button clicked");

}
$(onPageLoad);
//icons//
// var menu = document.getElementById("menu");
// var menuClose = document.getElementById("windowclose");
// var soundOn = document.getElementById("volumeon");
// var soundOff = document.getElementById("volumeoff");
// //ul//
// var menuList = document.getElementById("menuList");
// //li//
// var highroller = document.getElementById("dicegame");
// var advice = document.getElementById("advice");
// var about = document.getElementById("if");

// menu.addEventListener("click", function() {
//     menu.classlist.add("hidden");
//     menuClose.classlist.remove("hidden");
//     menuList.classlist.remove("hidden");
// });

// menuClose.addEventListener("click", function() {
//     menu.classlist.remove("hidden");
//     menuClose.classlist.add("hidden");
//     menuList.classlist.add("hidden");
// });


// function onHamburgerClicked() {
//     console.log("clicked");
// }

// document.addEventListener("DOMContentLoaded", function() {


//     var hamburgerMenu = document.getElementById(".hamburger");
//     console.log(startButton);

//     hamburgerMenu.addEventListener("click", function() {
//         gameStarted = true;

//         console.log('clicked!')
//         var startMenu = document.getElementById("start-menu");
//         var game = document.getElementById("game");

//         startMenu.classList.add("hidden");
//         game.classList.remove("hidden");

//     });

function getRandomNumberUpTo(max) {
    return Math.floor(Math.random() * 6) + 1;
}

var p1Sum;
var p2Sum;

var p1Array;
var p2Array;

var


function playerOneRollDice() {
    var die1 = document.getElementById("die1");
    var die2 = document.getElementById("die2");
    var die3 = document.getElementById("die3");
    var die4 = document.getElementById("die4");
    var die5 = document.getElementById("die5");
    var d1 = getRandomNumberUpTo(6);
    var d2 = getRandomNumberUpTo(6);
    var d3 = getRandomNumberUpTo(6);
    var d4 = getRandomNumberUpTo(6);
    var d5 = getRandomNumberUpTo(6);
    p1Sum = d1 + d2 + d3 + d4 + d5;
    p1Array = [d1, d2, d3, d4, d5];
    die1.innerText = d1;
    die2.innerText = d2;
    die3.innerText = d3;
    die4.innerText = d4;
    die5.innerText = d5;
    $("#player1Sum").html("Player one rolled " + p1Sum + ".");
    $("#playerTwoRollButton").show();
    $("#playerOneRollButton").hide();


    // var player1Dice = ["d1", "d2", "d3", "d4", "d5"]

    // $()
}

function playerTwoRollDice() {
    var die6 = document.getElementById("die6");
    var die7 = document.getElementById("die7");
    var die8 = document.getElementById("die8");
    var die9 = document.getElementById("die9");
    var die10 = document.getElementById("die10");
    var d6 = getRandomNumberUpTo(6);
    var d7 = getRandomNumberUpTo(6);
    var d8 = getRandomNumberUpTo(6);
    var d9 = getRandomNumberUpTo(6);
    var d10 = getRandomNumberUpTo(6);
    p2Sum = d6 + d7 + d8 + d9 + d10;
    p2Array = [d6, d7, d8, d9, d10];
    die6.innerText = d6;
    die7.innerText = d7;
    die8.innerText = d8;
    die9.innerText = d9;
    die10.innerText = d10;
    $("#player2Sum").html("Player two rolled " + p2Sum + ".");
    $("#playerTwoRollButton").hide();
    compareSums();
}

var compareSums = function() {
    $("#winnerMessage").hide()
    if (p1Sum > p2Sum) {
        $("#winnerMessage").text("Player two wins!");
    } else if (p1Sum === p2Sum) {
        $("#winnerMessage").text("Tie!  Re-roll please.");
    } else {
        $("#winnerMessage").text("Player one wins");
    }
    $("#winnerMessage").fadeIn(1500);
};


//--------OF A KIND LOGIC - PUT THIS IN A FUNCTION ----------

// var ofAKind = new Object;
// for (var i = 0; i < p1Array.length; i++) {
//     var number = p1Array[i];
//     console.log(number)
//     if (ofAKind[number] === undefined) {
//         ofAKind[number] = 0;
//     }
//     ofAKind[number] += 1;
// }
// console.log(ofAKind);
// console.log('5 has ' + ofAKind[5] + ' occurrences');


//-----------------geomancer LOGIC ------------------
// var randomNumbergeomancer = Math.floor(Math.random() * 20);

// function geomancer = '';
// switch (randomNumbergeomancer) {
//     case 0:
//         geomancer = 'Do not count on it';
//         break;
//     case 1:
//         geomancer = 'My reply is no';
//         break;
//     case 2:
//         geomancer = 'My sources say no';
//         break;
//     case 3:
//         geomancer = 'Outlook not so good';
//         break;
//     case 4:
//         geomancer = 'Very doubtful';
//         break;
//     case 5:
//         geomancer = 'It is certain';
//         break;
//     case 6:
//         geomancer = 'It is decidedly so';
//         break;
//     case 7:
//         geomancer = 'Without a doubt';
//         break;
//     case 8:
//         geomancer = 'Yes definitely';
//         break;
//     case 9:
//         geomancer = 'You may rely on it';
//         break;
//     case 10:
//         geomancer = 'As I see it, yes';
//         break;
//     case 11:
//         geomancer = 'Most likely';
//         break;
//     case 12:
//         geomancer = 'Outlook good';
//         break;
//     case 13:
//         geomancer = 'Yes';
//         break;
//     case 14:
//         geomancer = 'Signs point to yes';
//         break;
//     case 15:
//         geomancer = 'Reply hazy try again';
//         break;
//     case 16:
//         geomancer = 'Ask again later';
//         break;
//     case 17:
//         geomancer = 'Better not tell you now';ß
//         break;
//     case 18:
//         geomancer = 'Cannot predict now';
//         break;
//     case 19:
//         geomancer = 'Signs point to yes';
//         break;
//     case 20:
//         geomancer = 'Concentrate and ask again';
//         break;
// }




// var resetButton = document.getElementById("resetButton") {
//     $("#resetButton").on("click").location.reload("body");
// };


// var resetButton = document.getElementById("resetButton") {
//     $("#resetButton").on("click").location.reload("body");
// };







//if you console.log(dice);
//you would get an array
// for (var i = 0; i < dice.length; i++) {
//           // console.log('in the for loop');
//     console.log(dice);
//     dice[i] = Math.floor(Math.random() * 6) + 1;
//          // console.log(dice[i]);
// }



//if any doubles players re-roll
// if (d1 == d2) {
//     status.innerText += "Doubles: All players re-roll!";






//a function that takes two parameters
//function whoBuysLunch(param1, param2)
//compare the params and return which one is bigger
