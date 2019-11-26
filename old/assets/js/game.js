//let btnHint;
let guessedWord;
//let questions;

window.onload = function() {
    btnHint = document.getElementById("btnHint");
    guessedWord = "";
    document.getElementById("btnGuess").addEventListener("click", click);

    $("#coreGame").on("click", "button.enabled.btnGuess, button.enabled.btnGuessed", function() {
        if ($(this).hasClass("btnGuess") && $(this).hasClass("enabled")) {
            if (guessedWord.length != getWord().length) {
                guessedWord += $(this).text();
                $(this).addClass("disabled");
                $(this).removeClass("enabled");
            }
        } else if ($(this).hasClass("btnGuessed")) {
            let listBtn = $(".btnGuessed.enabled");
            let index = $(listBtn).index($(this));
            guessedWord = guessedWord.substring(0, index) + guessedWord.substring(index + 1);
            for (let i = 0; i < $(".btnGuess.disabled").length; i++) {
                if ($(".btnGuess.disabled")[i].innerHTML == $(this).text()) {
                    $($(".btnGuess.disabled")[i]).addClass("enabled");
                    $($(".btnGuess.disabled")[i]).removeClass("disabled");
                    break;
                }
            }
            $(this).addClass("disabled");
            $(this).removeClass("enabled");
        }
        updateWord();
    });

    $("#btnReset").click(function() {
        resetBoard(false);
    });

    questions = [
        new question(1, "hotdog"),
        new question(2, "suitcase"),
        new question(3, "bagpipe"),
        new question(4, "candycane"),
        new question(5, "penny")
    ];

    loadGame("english", questions);
    updateLetters();
};

function click() {
    if (checkAnswer(guessedWord)) {
        document.getElementById("banner").style.display = "none";
        correct++;
        addPoints(1);
        resetBoard(true);
        displayNext();
        updateLetters();
    } else {
        incorrect++;
        document.getElementById("banner").style.display = "block";
        updateStats();
    }
}

function resetBoard(isFull) {
    let guessedLetters = $(".btnGuessed");
    let guessableLetters = $(".btnGuess");
    guessedWord = "";
    for (let i = 0; i < guessedLetters.length; i++) {
        guessedLetters[i].innerHTML = "";
        guessedLetters[i].className = "disabled btnGuessed";
    }

    for (let i = 0; i < guessableLetters.length; i++) {
        if (isFull) {
            guessableLetters[i].innerHTML = "";
        }
        guessableLetters[i].className = "enabled btnGuess";
    }
}

function updateWord() {
    let letters = guessedWord.split("");
    let guessedLetters = $(".btnGuessed");
    for (let i = 0; i < guessedLetters.length; i++) {
        guessedLetters[i].innerHTML = "";
        guessedLetters[i].className = "disabled btnGuessed";
    }

    for (let i = 0; i < letters.length; i++) {
        guessedLetters[i].innerHTML = letters[i];
        guessedLetters[i].className = "enabled btnGuessed";
    }
}

function updateLetters() {
    let guessableLetters = $(".btnGuess");
    let word = getWord();
    let index = 0;
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    //TODO: All seperate words (ex: Hot Dog)
    document.getElementById("guessedLetters").innerHTML = "";
    for (let i = 0; i < word.length; i++) {
        $("#guessedLetters").append("<th><button class='disabled btnGuessed'></button></th>");
    }

    while (index < word.length) {
        let randomNumber = Math.floor(Math.random() * 10);
        if ($(guessableLetters[randomNumber]).text() == "") {
            guessableLetters[randomNumber].innerHTML = word.substring(index, index + 1).toUpperCase();
            index++;
        }
    }

    for (let i = 0; i < guessableLetters.length; i++) {
        if (guessableLetters[i].innerHTML == "") {
            guessableLetters[i].innerHTML = possible.charAt(Math.floor(Math.random() * possible.length));
        }
    }
}
