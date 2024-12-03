
    const options = {
      Countries: ["Algeria", "Argentina", "Australia", "Austria", "Bangladesh"],
      Animals: ["Dog", "Wolf", "Butterfly", "Squirrel", "Zebra"],
      Sports: ["Football", "Basketball", "Boxing", "Cycling", "Cricket"]
    };

    let chosenWord = "";
    let winCount = 0;
    let count = 0;
    let letterButtons = [];

    const optionsContainer = document.getElementById("options-container");
    const letterContainer = document.getElementById("letter-container");
    const userInputSection = document.getElementById("user-input-section");
    const resultText = document.getElementById("result-text");
    const newGameButton = document.getElementById("new-game-button");

    // Display options for categories
    const displayOptions = () => {
      optionsContainer.innerHTML = '<h3>Select a category:</h3>';
      for (let category in options) {
        const button = document.createElement("button");
        button.innerText = category;
        button.onclick = () => startGame(category);
        optionsContainer.appendChild(button);
      }
    };

    // Start a new game based on selected category
    const startGame = (category) => {
      // Hide options and show game area
      optionsContainer.classList.add("hide");
      letterContainer.classList.remove("hide");

      // Choose a random word from the selected category
      chosenWord = options[category][Math.floor(Math.random() * options[category].length)].toUpperCase();
      
      // Prepare letter buttons and reset variables
      winCount = 0;
      count = 0;
      userInputSection.innerHTML = chosenWord.replace(/./g, '<span class="dashes">_</span>');

      // Create letter buttons
      letterButtons = [];
      letterContainer.innerHTML = "";
      for (let i = 65; i <= 90; i++) {
        let button = document.createElement("button");
        button.classList.add("letters");
        button.innerText = String.fromCharCode(i);
        button.onclick = () => handleGuess(button);
        letterButtons.push(button);
        letterContainer.appendChild(button);
      }
    };

    // Handle letter guesses
    const handleGuess = (button) => {
      const guessedLetter = button.innerText;
      let correctGuess = false;
      const dashes = document.querySelectorAll(".dashes");

      // Check if guessed letter is in the word
      chosenWord.split("").forEach((char, index) => {
        if (char === guessedLetter) {
          dashes[index].innerText = guessedLetter;
          winCount++;
          correctGuess = true;
        }
      });

      // If correct guess, check for win
      if (winCount === chosenWord.length) {
        resultText.innerHTML = `<h2>You Win!</h2><p>The word was: ${chosenWord}</p>`;
        endGame();
      } else if (!correctGuess) {
        count++;
        drawHangman(count);
        if (count === 6) {
          resultText.innerHTML = `<h2>You Lose!</h2><p>The word was: ${chosenWord}</p>`;
          endGame();
        }
      }
      
      button.disabled = true;
    };

    // Draw hangman figure
    const drawHangman = (stage) => {
      const canvas = document.createElement("canvas");
      canvas.width = 100;
      canvas.height = 120;
      document.body.appendChild(canvas);
      const ctx = canvas.getContext("2d");

      const drawLine = (x1, y1, x2, y2) => {
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      };

      if (stage === 1) ctx.arc(50, 30, 10, 0, Math.PI * 2); // Head
      if (stage === 2) drawLine(50, 40, 50, 80); // Body
      if (stage === 3) drawLine(50, 50, 30, 70); // Left Arm
      if (stage === 4) drawLine(50, 50, 70, 70); // Right Arm
      if (stage === 5) drawLine(50, 80, 30, 100); // Left Leg
      if (stage === 6) drawLine(50, 80, 70, 100); // Right Leg
    };

    // End the game (reset buttons)
    const endGame = () => {
      letterButtons.forEach(button => button.disabled = true);
      newGameButton.classList.remove("hide");
    };

    // Start a new game when clicking the button
    newGameButton.onclick = () => {
      newGameButton.classList.add("hide");
      displayOptions();
    };

    // Initialize the game
    window.onload = displayOptions;
