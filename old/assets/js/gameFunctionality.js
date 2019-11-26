let questions = [];
let currentWordPos = -1;
let txtGuess;
let btnHint;
let img1, img2;
let txtCorrect, txtIncorrect, txtPercent;
let correct = 0,
    incorrect = 0,
    points = 10;
let hintUsed = false;
let mode, id;

function question(id, answer) {
    this.id = id;
    this.answer = answer;
}

//Initialize Variables and Events
function loadGame(mode, questions, id) {
    this.mode = mode;
    this.questions = questions;
    this.id = id || null;

    img1 = document.getElementById("img1");
    img2 = document.getElementById("img2");
    btnHint = document.getElementById("btnHint");

    points = 10;
    currentWordPos = 0;
    correct = 0;
    incorrect = 0;


    document.getElementById("hint").onclick = function(event) {
        if (event.target == document.getElementById('hint') || event.target == document.getElementById("closeNav") || event.target == document.getElementById("btnCloseHint")) {
            closeHint();
        }
    };

    displayNext();
}

//Display Images and Update Variables
function displayNext() {
    currentWordPos++;
    hintUsed = false;
    try {
        img1.src = "assets/images/wordgame/" + questions[currentWordPos].id + "/img1.jpg";
        img2.src = "assets/images/wordgame/" + questions[currentWordPos].id + "/img2.jpg";
    } catch (err) {
        img1.src = "http://via.placeholder.com/250x250";
        img2.src = "http://via.placeholder.com/250x250";
    }
    updateStats();
}

//Determine if Guess is equal to the answer
function checkAnswer(guess) {
    let answer = questions[currentWordPos].answer;
    return (guess.toLowerCase() == answer.toLowerCase());
}

//Update statistics (Corrent Guesses etc.)
//Update hint button status depending on points
//TODO: Potentially switch the tooltip changes to seperate function
function updateStats() {
    document.getElementById("wordsCorrect").innerHTML = "Words Correct: " + correct;
    document.getElementById("wordsIncorrect").innerHTML = "Incorrect Guesses: " + incorrect;
    document.getElementById("wordPercentage").innerHTML = "Percent Correct: " + (correct / (correct + incorrect) * 100).toFixed(2);
    if (points < 5 && !hintUsed) {
        btnHint.classList.remove("enabled");
        btnHint.classList.add("disabled");
        document.getElementById("tooltiptext").innerHTML = "Not Enough Points";
    } else {
        btnHint.classList.add("enabled");
        btnHint.classList.remove("disabled");
        document.getElementById("tooltiptext").innerHTML = "Use 5 Points For a Hint";
    }
    document.getElementById("points").getElementsByTagName("p")[0].innerHTML = "Points: " + points;

}

//Adds points to user total
//TODO: Add point caching
function addPoints(earnedPoints) {
    points += earnedPoints;
    updateStats();
}

//Displays Hint Menu
function showHint() {
    if (hintUsed) {
        document.getElementById("hint").style.visibility = "visible";
        return;
    }

    if (points >= 5 && document.getElementById("menu").style.visibility != "visible") {
        if (!hintUsed) {
            hintUsed = true;
            addPoints(-5);
            document.getElementById("tooltiptext").innerHTML = "Reveal Hint";
        }

        document.getElementById("hint").style.visibility = "visible";
        try {
            document.getElementById("imgHint").src = "assets/images/wordgame/" + questions[currentWordPos].id + "/hint.png";
        } catch (err) {
            document.getElementById("imgHint").src = "https://via.placeholder.com/250x250";
        }
    }
}

//Displays Nav Menu
function showMenu() {
    if (document.getElementById("hint") == null || document.getElementById("hint").style.visibility != "visible") {
        document.getElementById("menu").style.visibility = "visible";
    }

    // Find a way to load these through another function //
    document.getElementById("menu").onclick = function(event) {
        if (event.target == document.getElementById('menu') || event.target == document.getElementById("closeNav")) {
            closeNavMenu();
        }
    };

    $(".closeNav").mouseover(function() {
        $(this).find("i").addClass("fa-lg");
    });

    $(".closeNav").mouseout(function() {
        $(this).find("i").removeClass("fa-lg");
    });
}

function closeNavMenu() {
    document.getElementById("menu").style.visibility = "hidden";
}

function closeHint() {
    document.getElementById("hint").style.visibility = "hidden";
}

function getWord() {
    return questions[currentWordPos].answer;
}
