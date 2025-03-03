// script.js
var words = ["prego", "termo", "pinto", "areia", "obvio", "apple"];
var fiveLetterWords = words.filter(function(word) {
  return word.length === 5;
});
var randomWord = fiveLetterWords[Math.floor(Math.random() * fiveLetterWords.length)];
console.log(randomWord); 

var maxAttempts = 6;
var attempts = 0;
var letterBoxes = document.getElementById("letter-boxes");

for (var i = 0; i < maxAttempts; i++) {
  var wordContainer = document.createElement("div");
  wordContainer.className = "word-container";
  if (i === attempts) {
    wordContainer.classList.add("current-attempt");
  }
  for (var j = 0; j < randomWord.length; j++) {
    var letterBox = document.createElement("div");
    letterBox.className = "letter-box";
    wordContainer.appendChild(letterBox);
  }
  letterBoxes.appendChild(wordContainer);
}

document.addEventListener("keydown", function(event) {
  var key = event.key.toLowerCase();

  if (attempts >= maxAttempts) {
    return;
  }

  if (/^[a-z]$/.test(key)) {
    var letter = key;

    var wordContainers = document.getElementsByClassName("word-container");
    var currentWordContainer = wordContainers[attempts];
    var letterBoxes = currentWordContainer.getElementsByClassName("letter-box");
    var emptyBoxIndex = Array.from(letterBoxes).findIndex(function(box) {
      return box.textContent === "";
    });
    if (emptyBoxIndex >= 0) {
      letterBoxes[emptyBoxIndex].textContent = letter;
    }
  }

  if (event.key === 'Backspace') {
    var wordContainers = document.getElementsByClassName("word-container");
    var currentWordContainer = wordContainers[attempts];
    var letterBoxes = currentWordContainer.getElementsByClassName("letter-box");
    var filledBoxIndex = Array.from(letterBoxes).reverse().findIndex(function(box) {
      return box.textContent !== "";
    });
    if (filledBoxIndex >= 0) {
      letterBoxes[letterBoxes.length - 1 - filledBoxIndex].textContent = "";
    }
  }

  if (event.key === 'Enter') {
    var wordContainers = document.getElementsByClassName("word-container");
    var currentWordContainer = wordContainers[attempts];
    var letterBoxes = currentWordContainer.getElementsByClassName("letter-box");

    var currentGuess = Array.from(letterBoxes)
      .map(function(box) {
        return box.textContent;
      })
      .join("");
    if (currentGuess.length === randomWord.length) {
      Array.from(letterBoxes).forEach(function(box, index) {
        var letter = box.textContent;
        if (randomWord.includes(letter)) {
          var letterIndex = randomWord.indexOf(letter);
          if (letterIndex === index) {
            box.classList.add("correct");
          } else if (randomWord.includes(letter, letterIndex + 1)) {
            box.classList.add("correct");
          } else {
            box.classList.add("incorrect-position");
          }
        } else {
          box.classList.add("incorrect");
        }
      });

      if (currentGuess != randomWord) {
        attempts++;
        if (attempts < maxAttempts) {
          wordContainers[attempts - 1].classList.remove("current-attempt");
          wordContainers[attempts].classList.add("current-attempt");
        }
      }
    }
  }
});