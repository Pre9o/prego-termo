// script.js
var words = ["prego", "termo", "pinto", "areia", "obvio", "apple"];
var fiveLetterWords = words.filter(function(word) {
  return word.length === 5;
});
var randomWord = fiveLetterWords[Math.floor(Math.random() * fiveLetterWords.length)];
console.log(randomWord); // Apenas para fins de depuração, para ver a palavra no console do navegador

var maxAttempts = 6;
var attempts = 0;
var letterBoxes = document.getElementById("letter-boxes");

// Crie os quadrados para cada palavra
for (var i = 0; i < maxAttempts; i++) {
  var wordContainer = document.createElement("div");
  wordContainer.className = "word-container";
  for (var j = 0; j < randomWord.length; j++) {
    var letterBox = document.createElement("div");
    letterBox.className = "letter-box";
    wordContainer.appendChild(letterBox);
  }
  letterBoxes.appendChild(wordContainer);
}

document.addEventListener("keydown", function(event) {
  var key = event.key.toLowerCase();

  // Verifique se ainda há tentativas disponíveis
  if (attempts >= maxAttempts) {
    document.getElementById("result-message").textContent = "Você atingiu o limite máximo de tentativas!";
    return;
  }

  // Verifique se a tecla pressionada é uma letra
  if (/^[a-z]$/.test(key)) {
    var letter = key;
    var resultMessage = document.getElementById("result-message");
    var previousGuesses = document.getElementById("previous-guesses");

    // Encontre o próximo quadrado vazio para preencher
    var wordContainers = document.getElementsByClassName("word-container");
    var currentWordContainer = wordContainers[attempts];
    var letterBoxes = currentWordContainer.getElementsByClassName("letter-box");
    var emptyBoxIndex = Array.from(letterBoxes).findIndex(function(box) {
      return box.textContent === "";
    });
    if (emptyBoxIndex >= 0) {
      letterBoxes[emptyBoxIndex].textContent = letter;
    }

    // Verifique se a palavra está completa
    var currentGuess = Array.from(letterBoxes)
      .map(function(box) {
        return box.textContent;
      })
      .join("");
    if (currentGuess.length === randomWord.length) {
      // Atualize as tentativas apenas se a palavra estiver completa
      attempts++;
    }
  }

  // Verifique se a tecla pressionada é Enter
  if (event.key === 'Enter') {
    var wordContainers = document.getElementsByClassName("word-container");
    var currentWordContainer = wordContainers[attempts - 1]; // Use attempts - 1 porque as tentativas foram atualizadas anteriormente
    var letterBoxes = currentWordContainer.getElementsByClassName("letter-box");

    // Verifique se a letra está correta e aplique a cor apropriada ao quadrado
    Array.from(letterBoxes).forEach(function(box, index) {
      var letter = box.textContent;
      if (randomWord.includes(letter)) {
        var letterIndex = randomWord.indexOf(letter);
        if (letterIndex === index) {
          box.classList.add("correct");
        } 
        else if (randomWord.includes(letter, letterIndex + 1)) {
          box.classList.add("correct");
        }
        else {
          box.classList.add("incorrect-position");
        }
      } else {
        box.classList.add("incorrect");
      }
    });

    // Verifique se a palavra está correta
    var currentGuess = Array.from(letterBoxes)
      .map(function(box) {
        return box.textContent;
      })
      .join("");
    if (currentGuess === randomWord) {
      resultMessage.textContent = "Palavra correta!";
    } else {
      resultMessage.textContent = "Palavra incorreta! Tentativas restantes: " + (maxAttempts - attempts);
    }
  }
});
