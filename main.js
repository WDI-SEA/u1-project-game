// things I would like to do
// priority: give animal hunger property that decreases over time
// various foods to feed animal that can restore hunger
// store hunger in localStorage
// if it's hunger goes below zero you die
// warning pops up when hunger is near zero
// hunger meter is always displayed
// (it would be nice if you could hover over it and it would be specific about time to run out)
// as you feed animal its experience goes up and you can unlock better foods
// eventually can choose animal
// choose background

var pet = {
    hunger: 12, //set to 24 so it will be easy to decrease every hour
};

function displayGame(name) {
    $("#top-message").text(`${name}, Your Little Pet`);
    $("form").fadeOut();
    $(".hunger").removeClass("hidden");
}

function onSubmit(e) {
    e.preventDefault();
    pet.name = $("#name-pet").val();
    displayGame(pet.name);
}

$(function() {
    $("form").on("submit", onSubmit);
});
