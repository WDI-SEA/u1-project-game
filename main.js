// things I would like to do
// store hunger in localStorage - need to calc
// various foods to feed animal that can restore hunger
// make class and store each in obj, the array of foods
// give "condition" property to animal that has a different picture for each state (happy, sad, dead)
// as you feed animal its experience goes up and you can unlock better foods
// also exp up as pet "hover" it
// display exp
// warning pops up when hunger is near zero
// (it would be nice if you could hover over meter and it would be specific about time to run out)
// eventually can choose animal
// choose background

// max set to 24 so it will be easy to decrease every hour?
var maxHunger = 24;
// can change this for demo purposes
// passed along with hunger decreasefunction on a set interval
var timeForHungerDecrease = 1000;
// allows us to clear the interval of the game loop, for example on death
var intervalID;

// class for Pets -> will come into play with more species options
// if I want to create new pet options, should add species
// which could hold a new img attribute(object of object?)
class Pet {
    constructor() {
        this.hunger = maxHunger;
        this.name = "";
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

// generate food menu
// icons from http://goodstuffnononsense.com/hand-drawn-icons/cooking-icons/

function foodMenuDisplay() {
    for (var i = 0; i > foods.length; i++) {
        var newImage = $("<img>").attr("src", `images/${foods[i].name}.png`);
        var newLi = $("<li>").html(newImage);
        $("#food-menu").appendChild(newLi);
    }
}

// function to be called in Game loop that continually saves pet status
// and time stamp for hunger calculations
function saveToLocalStorage() {
    localStorage.pet = JSON.stringify(pet);
    // for calculating hunger between browser loads
    localStorage.timeStamp = Date.now();
}

// put hunger calculation here
function retrievePetFromStorage() {
    pet = JSON.parse(localStorage.pet);
    var hungerDecreaseWhileAway = (Date.now() - localStorage.timeStamp) / timeForHungerDecrease;
    pet.hunger -= Math.floor(hungerDecreaseWhileAway);
    if (pet.hunger < 0) {
        death();
    }
}

// this function will be called on a set interval after
// the submit button has been clicked
// a defined time to decrease hunger is passed to the set interval function
function gameLoop() {
    // when i get to something that needs a different interval, contact Connor
    displayHunger();
    pet.hunger -= 1;
    saveToLocalStorage();
    if (pet.hunger < 0) {
        death();
    }

}

// resets hunger to max value
function resetHunger() {
    pet.hunger = maxHunger;
    displayHunger();
}

// when click button, hunger goes up by one (i want to replace this with a food menu with different restoration values)
function feedPet() {
    displayHunger();
    if (pet.hunger < maxHunger) {
        pet.hunger += 1;
    }
}

// changes the hunger meter
function displayHunger() {
    $("#hunger-meter").attr("value", pet.hunger);
}

// this is what happens when you kill your pet
function death() {
    $("#pet").addClass("death");
    $(".game-field").addClass("death-bg");
    $("#top-message").fadeOut();
    setTimeout(function() { $("#top-message").text("You have failed your pet...").fadeIn(); }, 500);
    $(".hunger").addClass("hidden").fadeOut();
    $(".reset").fadeIn();
    clearInterval(intervalID);
}

// function for start game button
function initializeGame(e) {
    e.preventDefault();
    pet.name = $("#name-pet").val();
    resetHunger();
    startGame();
}

// start game is separate from initial start game,
// as we wont want to reset everything after a user returns to the page
function startGame() {
    displayGameStart(pet.name);
    displayHunger();
    intervalID = setInterval(gameLoop, timeForHungerDecrease);
}

// once game is started, this  arranges the display
function displayGameStart(name) {
    $("#top-message").text(`${name}, Your Little Pet`);
    $("form").hide();
    $(".hunger").removeClass("hidden");
}


// restart after pet dies => new page screen
function resetGame() {
    pet = new Pet();
    $("#pet").removeClass("death");
    $("h1").text("Your Little Pet");
    $(".reset").fadeOut();
    $("form").fadeIn();
    $(".game-field").removeClass("death-bg");
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


    // start game after get pet name
    $("form").on("submit", initializeGame);
    $("#feed-pet").on("click", feedPet);
    $(".reset").on("click", resetGame);
});
