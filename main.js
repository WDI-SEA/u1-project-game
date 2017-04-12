// things I would like to do
// store hunger in localStorage
// various foods to feed animal that can restore hunger
// warning pops up when hunger is near zero
// (it would be nice if you could hover over meter and it would be specific about time to run out)
// as you feed animal its experience goes up and you can unlock better foods
// give "condition" property to animal that has a different picture for each state (happy, sad, dead)
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

// function to be called in Game loop that continually saves pet status
// and time stamp for hunger calculations
function saveToLocalStorage() {
    localStorage.pet = JSON.stringify(pet);
    // for calculating hunger between browser loads
    localStorage.timeStamp = Date.now();

    console.dir(localStorage);
}

// this function will be called on a set interval after
// the submit button has been clicked
// a defined time to decrease hunger is passed to the set interval function
function gameLoop() {
    // when i get to something that needs a different interval, contact Connor
    pet.hunger -= 1;
    displayHunger();
    saveToLocalStorage();
    console.log(pet);
    if (pet.hunger === 0) {
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
    if (pet.hunger < maxHunger) {
        pet.hunger += 1;
    }
    displayHunger();
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
    intervalID = setInterval(gameLoop, timeForHungerDecrease);
}

// once game is started, this  arranges the display
function displayGameStart(name) {
    $("#top-message").text(`${name}, Your Little Pet`);
    $("form").fadeOut();
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
    // start game after get pet name
    $("form").on("submit", initializeGame);

    $("#feed-pet").on("click", feedPet);

    $(".reset").on("click", resetGame);
});
