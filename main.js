// as you feed animal its experience goes up and you can unlock better foods
// also exp up as pet "hover" it
// display exp
// (it would be nice if you could hover over meter and it would be specific about time to run out)
// eventually can choose animal
// choose background


/*

        INITIALIZE VARIABLES

*/

// max can be changed for display purposes
var maxHunger = 100;
var sadHunger = maxHunger * 0.25;
// can change this for demo purposes
// passed along with hunger decreasefunction on a set interval
var gameLoopFreq = 1000;
// change  freq to longer for real game
var hungerDecreaseFreq = 1000;
var hungerTimer = hungerDecreaseFreq;
var poopFreq = hungerDecreaseFreq * 10;
var poopTimer = poopFreq;
var maxPoop = maxHunger / 10;
// allows us to clear the interval of the game loop, for example on death
var intervalID;

// class for Pets -> will come into play with more species options
// if I want to create new pet options, should add species
class Pet {
    constructor() {
        this.hunger = maxHunger;
        this.name = "";
        this.poop = 0;
        this.condition = "happy";
    }
}

// initialize pet that is used in game
var pet = new Pet();

//class for the 6 foods that can be fed
class Food {
    constructor(name, hungerIncrease) {
        this.name = name;
        this.hungerIncrease = hungerIncrease;
    }
}

var apple = new Food("apple", 2);
var fish = new Food("fish", 5);
var hotdog = new Food("hotdog", 10);
var burger = new Food("burger", 15);
var pizza = new Food("pizza", 20);
var iceCream = new Food("icecream", 25);

var foods = [apple, fish, hotdog, burger, pizza, iceCream];

/*

      GAME STORAGE

*/

// function to be called in Game loop that continually saves pet status
// and time stamp for hunger calculations
function saveToLocalStorage() {
    localStorage.pet = JSON.stringify(pet);
    // for calculating time lapse between browser loads
    localStorage.timeStamp = Date.now();
}

function retrievePetFromStorage() {
    pet = JSON.parse(localStorage.pet);
    var timeElapsed = Date.now() - localStorage.timeStamp;
    gameUpdate(timeElapsed);
}

/*

    GAME LOGIC

*/

// this function will be called on a set interval after
// the submit button has been clicked
// a defined time to decrease hunger is passed to the set interval function
function gameLoop() {
    gameUpdate(gameLoopFreq);
    displayPoop();
    displayHunger();
    saveToLocalStorage();
}

// all pet properties update here
function gameUpdate(timeElapsed) {
    hungerTimer += timeElapsed;
    var hungerLoss = Math.floor(hungerTimer / hungerDecreaseFreq);
    pet.hunger -= hungerLoss;
    hungerTimer -= hungerLoss * hungerDecreaseFreq;
    if (pet.hunger < 0) {
        death();
    } else if (pet.hunger < sadHunger) {
        changeCondition("sad");
    }

    poopTimer += timeElapsed;
    var poopGain = Math.floor(poopTimer / poopFreq);
    if (pet.poop < maxPoop) {
        pet.poop += poopGain;
        poopTimer -= poopGain * poopFreq;
    }
}

// feed pet when food item clicked on
function feedPet() {
    var posOfFoodClicked = $(this).data("array-pos");
    var clickedFood = foods[posOfFoodClicked];
    if (pet.hunger < maxHunger) {
        pet.hunger += clickedFood.hungerIncrease;
        if (pet.hunger > sadHunger) {
            changeCondition("happy");
        }
        if (pet.hunger > maxHunger) {
            pet.hunger = maxHunger;
        }
    }
    displayHunger();
    shortPurr();
}

// clean up poop when clicked on
function removePoop() {
    $("this").remove();
    pet.poop -= 1;
    displayPoop();
}

// resets pet hunger to max value and poop to min
function resetPet() {
    pet.hunger = maxHunger;
    pet.poop = 0;
}

// update image on pet condition change
function changeCondition(condition) {
    pet.condition = condition;
    $("#pet").attr("src", `images/pets/lion${pet.condition}.png`);
}

/*

      GAME PLAY DISPLAY

*/

// changes the hunger meter
function displayHunger() {
    $("#hunger-meter").attr("value", pet.hunger);
}

// toggles food menu when click on feed button
function foodMenuDisplay() {
    $(".food-menu").toggleClass("hidden");
}

// generates the poop
function displayPoop() {
    $(".poop-field").empty();
    for (var i = 1; i <= pet.poop; i++) {
        var poop = $("<img>").attr("src", "images/poop/poop.png");
        $(".poop-field").append(poop);
        poop.on("click", removePoop);
    }
}

// when feed pet, the pet purrs for just a short time
function shortPurr() {
    $("#pet").addClass("purr");
    setTimeout(function() { $("#pet").removeClass("purr"); }, 500);
}

// this is what happens when you kill your pet
function death() {
    $(".gameplay").addClass("hidden");
    $(".gameplay").fadeOut();
    $(".food-menu").addClass("hidden");
    $("#pet").addClass("death").removeClass("hoverable");
    $(".game-field").addClass("death-bg");
    $("#top-message").fadeOut();
    setTimeout(function() { $("#top-message").text("You have failed your pet...").fadeIn(); }, 500);
    $(".endgame").fadeIn();
    clearInterval(intervalID);
    changeCondition("dead");
}

/*

      ON PAGE LOAD, or GAME STATE CHANGE

*/

// icons from http://goodstuffnononsense.com/hand-drawn-icons/cooking-icons/
// generates foods from array  on page load- useful if i want to add more food to game
function foodMenuGenerate() {
    for (var i = 0; i < foods.length; i++) {
        var newImage = $("<img>").attr("src", `images/food/${foods[i].name}.png`);
        newImage.attr("data-array-pos", i);
        var newLi = $("<li>").html(newImage);
        $(".food-menu").append(newLi);
    }
}


// function for start game button (IF NEW USER OR ON RESET)
function initializeGame(e) {
    e.preventDefault();
    pet.name = $("#name-pet").val();
    $("#hunger-meter").attr("max", `${maxHunger}`);
    startGame();
    resetPet();
    $(".poop-field").empty();
}

// this start game function loads after new pet has been named
// or user returning to established pet
function startGame() {
    displayGameStart(pet.name);
    intervalID = setInterval(gameLoop, gameLoopFreq);
}

// once game is started by any method, this  arranges the display
function displayGameStart(name) {
    $("#top-message").text(`${name}, Your Little Pet`);
    $(".newgame").hide();
    $(".gameplay").fadeIn();
    $(".poop-field").removeClass("hidden");
    $(".food-menu").addClass("hidden");
    $("#pet").addClass("hoverable");

}

// restart after pet dies => brings back to new page screen
function resetGame() {
    pet = new Pet();
    changeCondition("happy");
    $("#pet").removeClass("death");
    $("h1").text("Your Little Pet");
    $(".endgame").fadeOut();
    $(".newgame").fadeIn();
    $(".game-field").removeClass("death-bg");
    $(".poop-field").addClass("hidden");
}



$(function() {
    // check if viewer has seen page before
    var numViews = 0;
    if (localStorage.viewCount) {
        retrievePetFromStorage();
        numViews = parseInt(localStorage.viewCount);
        startGame();
    }
    numViews += 1;
    localStorage.viewCount = numViews;

    foodMenuGenerate();
    // start game after get pet name
    $("form").on("submit", initializeGame);
    $("#feed-pet").on("click", foodMenuDisplay);
    $(".reset").on("click", resetGame);
    $(".food-menu img").on("click", feedPet);
});
