//....................................................VARIABLES

//stores playerSequence
playerSequence = [];

//stores gameSequence
gameSequence = [];

//TESTING Fixed sequence
//gameSequence = [0, 2, 3];

//stores id
var id;

//stores color
var color;

// stores level
level = 0;

//The number of levels in the game
const endLevel = 10;

//Stores sound files
var padSounds = [
    "./assets/sounds/Hit A Inspir 1.wav", // green
    "./assets/sounds/Hit A Inspir 2.wav", // red
    "./assets/sounds/Hit A Inspir 3.wav", //yellow
    "./assets/sounds/Hit A Inspir 4.wav" //blue
];

var correct = "./assets/sounds/correct.wav";

var incorrect = "./assets/sounds/incorrect.wav";

//......................................................FUNCTIONS

//...................INITALISE FUNCTION

// Loads when the DOM is ready
$(document).ready(function() {



    //function initialises when start button is clicked
    $(".start").click(function() {

        // increments the level by 1
        level++;

        //Begins the game
        computerSequence();

    });

//...................USER SEQUENCE FUNCTION

    $(".pad").click(function() {

        //id is = to the id of the pad clicked
        id = $(this).attr("id");

        // Color is = to the second class associated with the clicked pad. As each pad has a pad class, a unique color class and a third temporary active class while clicked the array returned is indexed at 1 in order to return the color.
        color = $(this).attr("class").split(" ")[1];

        //Adds the active class and plays a sound to the clicked pad using the id and color as parameters
        playerSequence.push(id);

        activePad(id, color);

        //console.log("playerSequence is " + playerSequence);

        //TESTING
        //console.log($(this).attr("class").split(" "));

 
    });

});


//...................COMPUTER SEQUENCE FUNCTION

function computerSequence() {

    //TESTING
    //console.log("level is " + level);

    //sets value of display to the level variable e.g. everytime the start button is pressed level increases by 1
    $(".display").text(level);

    //generates random number and pushes it into gameSequence. TESTING - comment it out and use fixed array instead by entering in numbers to gameSequence
    randomNumberGenerator();

    // initialises i, when initialised it is 0 so it will always get the first value in gameSequence upon a start button press
    var i = 0;

    // function is repeated in intervals of 1 second so each pad is lit for 1 second
    var gameInterval = setInterval(function() {

        //id is set the to index value of i. e.g. if 3 is pushed into the array and i is 0 then id will be 3 the second time if 2 is pushed in then i will be 1 due to incrementation so id will be 2 and gameSequence = [0, 2] thus upon the second click both green and yellow will light up as the values randomly generated correspond to a pad id
        id = gameSequence[i];

        // There are two classes in the returned array, the space (" ") is targetted so it returns two items ["pad", "color"] and split so we get the second one e.g. So if id = 0 then color = green
        color = $("#" + id).attr("class").split(" ")[1];

        //TESTING
        //console.log($("#" + id).attr("class").split(" "));

        //TESTING
        //console.log("id is " + id + " " + "color is " + color);

        //Adds and removes active class and plays a sound. Passes id and color values in as parameters.
        activePad(id, color);

        // i + 1, basically id will now be the next item in the gameSequence array so the next pad be active
        i++;

        //TESTING
        console.log("i is " + i);

        //TESTING
        console.log("gameSequence array is " + gameSequence);

        // if i is equal to the number of items in the array the interval clears and reinitialises.
        if (i == gameSequence.length) {
            clearInterval(gameInterval);

            i = 0;


            //TESTING
            console.log("interval restarted");

        }
    }, 1000);
}

//...................RANDOM NUMBER GENERATOR FUNCTION

function randomNumberGenerator() {

    //random is a randomly generated number between 0.4 - 3.999 so the number generated will correspond to a pad id
    var random = Math.floor(Math.random() * 4);

    //pushs the random number to the gameSequence array
    gameSequence.push(random);

    //TESTING
    //console.log("number generated was " + random);
}

//...................ACTIVE PAD FUNCTION

function activePad(id, color) {

    // this will add the -active to the color class 
    $("#" + id).addClass(color + "-active");

    //Plays a sound while the pad is active. Passes id value as a parameter.
    padSound(id);

    //Removes the -active class assigned above after 500ms
    setTimeout(function() {
        $("#" + id).removeClass(color + "-active");
    }, 500);
}

//...................PAD SOUND FUNCTION

function padSound(id) {

    //Creates new audio object
    var audio = new Audio();

    //audio source is padSounds array index by id in order to target the correct sound per pad
    audio.src = padSounds[id];

    //audio volume
    audio.volume = 0.3;

    //looping is off
    audio.loop = false;

    //plays audio file
    audio.play();

    //TESTING
    //console.log("audio id is " + id);

};

