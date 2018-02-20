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
var endLevel = 5;

//Stores sound files
var padSounds = [
    "./assets/sounds/pad0.wav", // green
    "./assets/sounds/pad1.wav", // red
    "./assets/sounds/pad2.mp3", //yellow
    "./assets/sounds/pad3.mp3" //blue
];

var correct = "./assets/sounds/victory.mp3";

var incorrect = "./assets/sounds/incorrect.wav";

var power = "off";

var difficulty = "easy";

var on = "./assets/sounds/on.wav"

var off = "./assets/sounds/off.wav";

var modeSound = "./assets/sounds/modesound.wav";

var menuSound = "./assets/sounds/menu.wav";

var startSound = "./assets/sounds/startSound.wav";

var cheer = "./assets/sounds/cheer.mp3"

var timer;

var timerStart;

var timeSpentOnGame = getTimeSpentOnGame();

var mistakes = 0;

//......................................................FUNCTIONS

//...................INITALISE FUNCTION

// Loads when the DOM is ready
$(document).ready(function() {

    $(".switch").click(function() {
        if (power == "off") {
            $(".switch-right").css("background-color", "gray");
            $(".switch-left").css("background-color", "black");
            $(".display").css("opacity", "1");
            playOnSound();
            playerSequence = [];
            gameSequence = [];
            level = 0;
            localStorage.clear();
            startCounting();
            power = "on";
            $(".green").css("background-color", "green");
            $(".red").css("background-color", "red");
            $(".yellow").css("background-color", "yellow");
            $(".blue").css("background-color", "blue");
            $(".start").css("background-color", "red");
        }
        else if (power == "on") {
            $(".switch-right").css("background-color", "black");
            $(".switch-left").css("background-color", "gray");
            $(".display").css("opacity", "0.3");
            playOffSound();
            power = "off";
            $(".display").text("--");
            localStorage.clear();
            mistakes = 0;
            $(".green").css("background-color", "darkgreen");
            $(".red").css("background-color", "darkred");
            $(".yellow").css("background-color", "#BDB76B");
            $(".blue").css("background-color", "darkblue");
            $(".start").css("background-color", "darkred");
        }
    });
    $(".mode").click(function() {
        if (difficulty == "easy") {
            $(".mode-right").css("background-color", "gray");
            $(".mode-left").css("background-color", "black");
            endLevel = 10;
            playerSequence = [];
            gameSequence = [];
            level = 0;
            difficulty = "hard"
            $(".display").text("--");
            playModeSound();
            mistakes = 0;
        }
        else if (difficulty == "hard") {
            $(".mode-right").css("background-color", "black");
            $(".mode-left").css("background-color", "gray");
            endLevel = 5;
            playerSequence = [];
            gameSequence = [];
            level = 0;
            difficulty = "easy"
            $(".display").text("--");
            playModeSound();
            mistakes = 0;
        }
    });

    //function initialises when start button is clicked
    $(".start").click(function() {

        if (power == "on") {

            // increments the level by 1
            level++;

            playStartSound();

            //Begins the game
            computerSequence();
        }

    });
 //...................USER SEQUENCE FUNCTION

    $(".pad").click(function() {
        if (power == "on") {

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

            //If checkSequence is false 
            if (!checkSequence()) {

                //Run displayError
                displayError();

                //reset playersequence
                playerSequence = [];
            }
            //If the the player and computer arrays are the same and the player array is shorter than the max level, as it should be the same length as the computer sequence which in turn is coded according to the level number
            if (playerSequence.length == gameSequence.length && playerSequence.length < endLevel) {

                //level = level + 1
                level++

                //resets playerSequence
                playerSequence = [];

                //reloads computerSequence
                computerSequence();

            }
            // If playerSequence is shorter than the end level number basically checks if you have completed every level
            if (playerSequence.length == endLevel) {

                //change display to win
                playWinSound();
                $(".display").text("Win");
                $("#modal").css("visibility", "visible");
                $("#modal").css("opacity", "1");
                //$(".container").css("visibility", "hidden")
                $(".container").css("z-index", "0");
                $(".controls").css("z-index", "8");
                $(".mode-box").css("z-index", "0");
                if (mistakes > 1) {
                    $(".modal-text").append((parseInt(timeSpentOnGame / 1000) + " seconds with " + (parseInt(mistakes)) + " mistakes!"));
                }
                else if (mistakes == 1) {
                    $(".modal-text").append((parseInt(timeSpentOnGame / 1000) + " seconds with " + (parseInt(mistakes)) + " mistake!"));
                }
                else {
                    if (difficulty == "easy") {
                        $(".modal-text").append((parseInt(timeSpentOnGame / 1000) + " seconds with " + (parseInt(mistakes)) + " mistakes! Try hard mode next!"));
                    }
                    else {
                        $(".modal-text").append((parseInt(timeSpentOnGame / 1000) + " seconds with " + (parseInt(mistakes)) + " mistakes! You're the best!"));
                    }
                }
            }
        }
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

//..................PLAY WIN SOUND FUNCTION

function playWinSound() {
    var cheerSound = new Audio();
    cheerSound.src = cheer;
    cheerSound.volume = 0.2;
    cheerSound.loop = false;
    cheerSound.play();
    var correctSound = new Audio();
    correctSound.src = correct;
    correctSound.volume = 0.2;
    correctSound.loop = false;
    correctSound.play();
};

//..................PLAY ON SOUND FUNCTION

function playOnSound() {
    var onSound = new Audio();
    onSound.src = on;
    onSound.volume = 0.2;
    onSound.loop = false;
    onSound.play();
};

//..................PLAY OFF SOUND FUNCTION 

function playOffSound() {
    var offSound = new Audio();
    offSound.src = off;
    offSound.volume = 0.2;
    offSound.loop = false;
    offSound.play();
};

//..................PLAY MODE SOUND FUNCTION 

function playModeSound() {
    var theModeSound = new Audio();
    theModeSound.src = modeSound;
    theModeSound.volume = 0.2;
    theModeSound.loop = false;
    theModeSound.play();
};

//..................PLAY START SOUND FUNCTION 

function playStartSound() {
    var theStartSound = new Audio();
    theStartSound.src = startSound;
    theStartSound.volume = 0.2;
    theStartSound.loop = false;
    theStartSound.play();
};

//...................CHECK SEQUENCE FUNCTION

//compares player and computer sequences element by element
function checkSequence() {

    //runs through each item 
    for (var i = 0; i < playerSequence.length; i++) {

        //compares each item in playerSequence to each item in gameSequence
        if (playerSequence[i] != gameSequence[i]) {

            //if they are not equal returns false
            return false;
        }
    }
    //if they are equal return true
    return true;
}

//...................DISPLAY ERROR FUNCTION

function displayError() {
    $(".display").text("--");
    var count = 0;
    mistakes++;
    var myError = setInterval(function() {
        $(".display").text("..");
        count++
        if (count == 3) {
            $(".display").text(level);
            clearInterval(myError);
            playerSequence = [];
            counter = 0;



            var incorrectSound = new Audio();

            incorrectSound.src = incorrect;

            //audio volume
            incorrectSound.volume = 0.3;

            //looping is off
            incorrectSound.loop = false;

            //plays audio file
            incorrectSound.play();

            //TESTING
            console.log("Incorrect");
        }

    }, 500)
}

//...................TIMER FUNCTION

function getTimeSpentOnGame() {
    timeSpentOnGame = parseInt(localStorage.getItem('timeSpentOnGame'));
    timeSpentOnGame = isNaN(timeSpentOnGame) ? 0 : timeSpentOnGame;
    return timeSpentOnGame;
}

function startCounting() {
    timerStart = Date.now();
    timer = setInterval(function() {
        timeSpentOnGame = getTimeSpentOnGame() + (Date.now() - timerStart);
        localStorage.setItem('timeSpentOnGame', timeSpentOnGame);
        timerStart = parseInt(Date.now());
        // Convert to seconds
        console.log(parseInt(timeSpentOnGame / 1000));
    }, 1000);
}
