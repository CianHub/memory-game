//....................................................VARIABLES

playerSequence = [];

gameSequence = [];

var id;

var color;

level = 0;

var endLevel = 20;

var padSounds = [
    "./assets/sounds/pad0.mp3", // green
    "./assets/sounds/pad1.mp3", // red
    "./assets/sounds/pad2.mp3", //yellow
    "./assets/sounds/pad3.mp3" //blue
];

var correct = "./assets/sounds/victory.mp3";

var incorrect = "./assets/sounds/incorrect.mp3";

var power = "off";

var on = "./assets/sounds/on.mp3";

var off = "./assets/sounds/off.mp3";

var modeSound = "./assets/sounds/modesound.mp3";

var menuSound = "./assets/sounds/menu.mp3";

var startSound = "./assets/sounds/startSound.mp3";

var cheer = "./assets/sounds/cheer.mp3";

var mistakes = 0;

var timerStart;

var timerEnd;

var playerTime;

var strictMode = "off";

var replayInterval = null;

var replayTime = 0;

var stopReplay = {
    stop: function() {
        clearInterval(replayInterval);
        replayTime = 0;
    }
};

var clickable = "yes";

//......................................................FUNCTIONS

//...................INITALISE FUNCTION

$(document).ready(function() {

    //...................POWER FUNCTION

    $(".switch").click(function() {
        if (power == "off") {
            $(".switch-right").css("background-color", "gray");
            $(".switch-left").css("background-color", "black");
            $(".display").css("opacity", "1");
            playSound(on);
            playerSequence = [];
            gameSequence = [];
            level = 0;
            startCounting();
            power = "on";
            $(".green").css("background-color", "#13ff7c");
            $(".red").css("background-color", "#ff4c4c");
            $(".yellow").css("background-color", "#fed93f");
            $(".blue").css("background-color", "#1c8cff");
            $(".start").css("background-color", "red");
            $(".mode-box").css("background-color", "white");
            $(".controls").css("box-shadow", "-10px 10px 7px 0px rgba(50, 50, 50, 0.75)");
            $(".game-board").css("box-shadow", "-10px 10px 7px 0px rgba(50, 50, 50, 0.75)");
            $(".mode-box").css("box-shadow", "-10px 10px 7px 0px rgba(50, 50, 50, 0.75)");
            $(".controls").css("background-color", "white");
        }
        else if (power == "on") {
            $(".switch-right").css("background-color", "black");
            $(".switch-left").css("background-color", "gray");
            $(".display").css("opacity", "0.3");
            playSound(off);
            power = "off";
            $(".display").text("--");
            mistakes = 0;
            $(".green").css("background-color", "darkgreen");
            $(".red").css("background-color", "darkred");
            $(".yellow").css("background-color", "#BDB76B");
            $(".blue").css("background-color", "darkblue");
            $(".start").css("background-color", "darkred");
            $(".controls").css("box-shadow", "");
            $(".game-board").css("box-shadow", "");
            $(".mode-box").css("box-shadow", "");
            $(".mode-box").css("background-color", "gray");
            $(".controls").css("background-color", "gray");
        }
    });

    //...................STRICT MODE BUTTON FUNCTION

    $(".strict").click(function() {
        if (strictMode == "off" && power == "on") {
            $(".strict").css("background-color", "green");
            playerSequence = [];
            gameSequence = [];
            level = 0;
            $(".display").text("--");
            playSound(modeSound);
            mistakes = 0;
            strictMode = "on";
        }
        else if (strictMode == "on" && power == "on") {
            $(".strict").css("background-color", "gray");
            playerSequence = [];
            gameSequence = [];
            level = 0;
            $(".display").text("--");
            playSound(modeSound);
            mistakes = 0;
            strictMode = "off";
        }
    });

    //...................START BUTTON FUNCTION

    $(".start").click(function() {
        if (power == "on") {
            level++;
            playSound(startSound)
            computerSequence();
        }
    });

    //...................USER SEQUENCE FUNCTION

    $(".pad").click(function() {
        if (power == "on" && clickable == "yes") {
            id = $(this).attr("id");
            color = $(this).attr("class").split(" ")[1];
            playerSequence.push(id);
            activePad(id, color);
            if (!checkSequence()) {
                playerSequence = [];
                if (strictMode == "on") {
                    gameSequence = [];
                    level = 0;
                    strict();
                }
                else {
                    displayError();
                }
            }
            setTimeout(
                nextLevel(), 4000);
            if (playerSequence.length == endLevel) {
                playSound(correct);
                playSound(cheer);
                $(".display").text("Win");
                $("#modal").css("visibility", "visible");
                $("#modal").css("opacity", "1");
                //$(".container").css("visibility", "hidden")
                $(".container").css("z-index", "0");
                $(".controls").css("z-index", "8");
                $(".mode-box").css("z-index", "0");
                stopCounting();
                if (mistakes > 1) {
                    $(".modal-text").append((parseInt(playerTime) + " seconds with " + (parseInt(mistakes)) + " mistakes!"));
                }
                else if (mistakes == 1) {
                    $(".modal-text").append((parseInt(playerTime) + " seconds with " + (parseInt(mistakes)) + " mistake!"));
                }
                else {
                    if (strictMode == "off") {
                        $(".modal-text").append((parseInt(playerTime) + " seconds with " + (parseInt(mistakes)) + " mistakes! Try strict mode next!"));
                    }
                    else {
                        $(".modal-text").append((parseInt(playerTime) + " seconds with " + (parseInt(mistakes)) + " mistakes! You're the best!"));
                    }
                }
            }
        }
    });
});

//...................NEXT LEVEL FUNCTION

function nextLevel() {
    if (playerSequence.length == gameSequence.length && playerSequence.length < endLevel) {
        setTimeout(
            level++,
            playerSequence = [],
            computerSequence(),
            5000);
    }
}

//...................COMPUTER SEQUENCE FUNCTION

function computerSequence() {
    $(".display").text(level);
    randomNumberGenerator();
    playComputerSequence();
    replay();
    
}

//...................PLAY COMPUTER SEQUENCE FUNCTION

function playComputerSequence() {
    var i = 0;
    clickable = "no";
    var gameInterval = setInterval(function() {
        id = gameSequence[i];
        try {
            color = $("#" + id).attr("class").split(" ")[1];
        }
        catch(err) {
             clearInterval(gameInterval);
        }
        activePad(id, color);
        i++;
        if (i == gameSequence.length) {
            clearInterval(gameInterval);
            i = 0;
            clickable = "yes";
        }
    }, 1000);
}

//...................RANDOM NUMBER GENERATOR FUNCTION

function randomNumberGenerator() {
    var random = Math.floor(Math.random() * 4);
    gameSequence.push(random);
}

//...................ACTIVE PAD FUNCTION

function activePad(id, color) {
    $("#" + id).addClass(color + "-active");
    playSound(padSounds[id]);
    setTimeout(function() {
        $("#" + id).removeClass(color + "-active");
    }, 500);
}

//...................CHECK SEQUENCE FUNCTION

function checkSequence() {
    for (var i = 0; i < playerSequence.length; i++) {
        if (playerSequence[i] != gameSequence[i]) {
            return false;
        }
    }
    return true;
}

//...................DISPLAY ERROR FUNCTION

function displayError() {
    var count = 0;
    mistakes++;
    var myError = setInterval(function() {
        $(".display").text("!!");
        count++;
        if (count == 3) {
            $(".display").text(level);
            clearInterval(myError);
            count = 0;
            playSound(incorrect);
            setTimeout(function() {
                playComputerSequence();
            }, 500);
        }
    }, 500);
}

//...................STRICT FUNCTION

function strict() {
    $(".display").text("!!");
    $(".display").text(level);
    setTimeout(playSound(incorrect),
        2000);
}

//...................TIMER FUNCTIONS

function startCounting() {
    timerStart = Date.now();
}

function stopCounting() {
    timerEnd = Date.now();
    playerTime = (timerEnd - timerStart) / 1000;
}

//...................REPLAY FUNCTIONS

function replayCount() {
    replayTime++;
}

function replayCheck() {
    if (replayTime % 10 === 0) {
        playComputerSequence();
    }
}

function replay() {
    replayInterval = setInterval(function() {
        replayCount();
        replayCheck();
    }, 1000);
}

//..................PLAY SOUND FUNCTION 

function playSound(sound) {
    var audio = new Audio();
    audio.src = sound;
    audio.volume = 0.2;
    audio.loop = false;
    audio.play();
}
