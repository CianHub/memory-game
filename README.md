# SIMON Memory Game 

SIMON is a game that creates sequences of sounds and lights and requires a player to repeat the sequence. If the player succeeds, the sequence becomes progressively longer and more complex until the game ends at level 10. The game consists of two modes normal and strict, on strict mode if the player makes a mistake they must restart from level 1.
 
## UX

### User Stories

Before beginning development on the site, several user stories were created to determine who a visitor to the site could be and what they might want from the site:

- "As an existing fan of SIMON, I want to be able to play a recognisable version of the game on my web browser that feels similar to the the physical version."

- "As a vistor to the website, I want to play a game which I can easily understand and get into."

### Design

The application was developed to be a web browser based recreation of the classic SIMON game, with this in mind the aim of the apps design was to reproduce a stylized digital interpretation of the original device.

The reference image used as a model for the games design can be found in this repository titled: simon_design_model.jpeg

## Features

The game has several features:

    1. Two modes: normal and strict.
    2. Sequences are represented by combinations of light and sound.
    3. The duration of the game is stored in a timer and shown to the player upon completion.
    4. A mistake counter tells the player the number of errors they made in normal mode upon completion.
    5. In normal mode the player can make an unlimited number of mistakes.
    6. In strict mode the game restarts after the player makes an error.

## Technologies Used

- [HTML](https://www.w3.org/)
    - The project uses **HTML** to create the game board.

- [CSS](https://www.w3.org/)
    - The project uses **CSS** to style the game board.

- [JavaScript](https://developer.mozilla.org/bm/docs/Web/JavaScript)
    - The project uses **JavaScript** to write the games logic.

- [JQuery](https://jquery.com/)
    - The project uses **JQuery** to manipulate the DOM.

## Testing

Testing was conducted through a combination of manual user testing and Jasmine.js. 

### Automated Tests

To see the results of the automated tests, run test.html.

### Manual Tests

1. On/Off Switch
    1. Press On/Off switch when device is off to turn it on
    2. Verify the device is on, by the on tone and the game board lighting up.
    3. Press On/Off switch when device is on to turn it off.
    4. Verify the device is off, by the off tone and the game board darkening.

2. Start Game
    1. Press the start button to start the game when the device is on.
    2. Verify that the game has started when the first level of the game plays and the round number is displayed.

3. Repeat Sequence
    1. Verify that the sequence is repeating by ensuring the device is on and the game has started, and simply wait for the sequence to replay or make an error when entering the sequence.

4. Next Round
    1. Verify that the device has moved on to the next round by repeating the sequence shown, seeing the round increment by 1 and the sequence having a new step added.

5. Win Screen
    1. Complete the game by beating all 10 levels.
    2. Verify this by seeing the modal that appears displaying the length of the game and the number of errors and the victory music which plays upon the game ending.

6. Strict Mode
    1. Ensure the device is turned on.
    2. Press the strict button.
    3. Verify this by listening for the strict button tone and the strict button turning green.
    4. Further verify this by starting the game and progressing to a level above 1, making an error and being brought back to level 1.

### Known Bugs

It is possible though very rare, to trigger a double repeat of the sequence when the first pad press is an error within milleseconds of when the sequence is set to repeat, both repeat sequences will play within milleseconds of each other.

## Deployment

The website has been deployed to Github pages and can be found at: <https://cianhub.github.io/memory-game/>

## Installation

1. Clone the repository.
2. Open index.html in your web browser of choice.

## Credits

### Acknowledgements

- This project is a web browser based recreation of the original [SIMON game](https://en.wikipedia.org/wiki/Simon_(game))
