describe("Memory Game", function() {
    describe("checkSequence", function() {
        it("should be false", function() {
            expect(checkSequence()).toBe(true);
        });

    });

    describe("randomNumberGenerator", function() {
        it("should push a random number into gameSequence", function() {
            var gameSequence = [];
            var random = Math.floor(Math.random() * 4);
            gameSequence.push(random);
            expect(gameSequence[0]).toBeLessThan(4);
        });
    });

    describe("replayCount", function() {
        it("should be 1", function() {
            var replayTime = 0;
            replayTime++
            expect(replayTime).toEqual(1);
        });
    });

    describe("startCounting and stopCounting", function() {
        var timerStart = Number;
        var timerEnd = Number;
        it("should be a number", function() {
            expect(timerStart).toEqual(Number);
        });
        it("should be a number after subtraction", function() {
            playerTime = (timerEnd - timerStart) / 1000;
            expect(playerTime).toEqual(jasmine.any(Number));
        });
    });

    describe("nextLevel", function() {
        var level = 0;
        var playerSequence = [1, 2];
        var gameSequence = [3, 4];
        var endLevel = 3;
        it("should be a number", function() {
            expect(playerSequence.length).toEqual(gameSequence.length);
            expect(playerSequence.length).toBeLessThan(endLevel);
            level++;
            playerSequence = [];
            it("should increment by 1", function() {
                expect(level).toEqual(1);
            });
            it("should be empty", function() {
                expect(playerSequence).toEqual();
            });
        });
    });
});
