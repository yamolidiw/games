// Words to find
const wordsToFind = ['SAHAM', 'EMITEN', 'BURSA', 'DIVIDEN', 'PORTOFOLIO', 'IPO', 'MARKET', 'TAKEPROFIT', 'CUTLOSS', 'STOPLOSS'];
const gridSize = 10;
let grid = [];
let clickedLetters = [];
let foundWords = [];
let timer;
let timeLeft = 60; // Set timer to 60 seconds
let gameStarted = false;

// Generate grid with random letters and place the words
function generateGrid() {
  // Initialize empty grid
  for (let i = 0; i < gridSize; i++) {
    grid[i] = [];
    for (let j = 0; j < gridSize; j++) {
      grid[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Random letter
    }
  }

  // Place words into the grid
  wordsToFind.forEach(word => {
    placeWordInGrid(word);
  });

  displayGrid();
}

function placeWordInGrid(word) {
  let placed = false;
  while (!placed) {
    const direction = Math.floor(Math.random() * 2); // 0 for horizontal, 1 for vertical
    const startRow = Math.floor(Math.random() * gridSize);
    const startCol = Math.floor(Math.random() * gridSize);

    if (direction === 0 && startCol + word.length <= gridSize) { // Horizontal
      if (grid[startRow].slice(startCol, startCol + word.length).every(letter => letter !== ' ')) {
        for (let i = 0; i < word.length; i++) {
          grid[startRow][startCol + i] = word[i];
        }
        placed = true;
      }
    } else if (direction === 1 && startRow + word.length <= gridSize) { // Vertical
      if (grid.slice(startRow, startRow + word.length).every(row => row[startCol] === ' ')) {
        for (let i = 0; i < word.length; i++) {
          grid[startRow + i][startCol] = word[i];
        }
        placed = true;
      }
    }
  }
}

function displayGrid() {
  const gridContainer = document.querySelector('.word-search');
  gridContainer.innerHTML = ''; // Clear previous grid

  // Create grid elements
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const cell = document.createElement('span');
      cell.textContent = grid[row][col];
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.addEventListener('click', () => checkCell(cell, row, col));
      gridContainer.appendChild(cell);
    }
  }
}

// Check if a clicked cell is part of the word
function checkCell(cell, row, col) {
  clickedLetters.push({ letter: cell.textContent, row, col });

  // Highlight the cell when clicked
  cell.classList.add('highlight');

  // Check if a word has been found
  let wordFound = false;
  wordsToFind.forEach(word => {
    if (checkWord(clickedLetters, word)) {
      wordFound = true;
      highlightWord(clickedLetters, word);
    }
  });

  // If all words are found, show success message
  if (foundWords.length === wordsToFind.length) {
    alert('Congratulations! You found all the words!');
  }

  // Reset the clicked letters if word is not found
  if (!wordFound) {
    clickedLetters = [];
  }
}

// Check if the letters form a valid word
function checkWord(clickedLetters, word) {
  const wordLetters = clickedLetters.map(letter => letter.letter).join('');
  if (wordLetters === word && !foundWords.includes(word)) {
    foundWords.push(word);
    return true;
  }
  return false;
}

// Highlight the word if it's found
function highlightWord(clickedLetters, word) {
  clickedLetters.forEach(letter => {
    const element = document.querySelector(`[data-row='${letter.row}'][data-col='${letter.col}']`);
    element.classList.add('found'); // Mark the cell as found
  });

  // Add the word to foundWords list
  foundWords.push(word);
}

// Timer functions
function startTimer() {
  if (gameStarted) return; // Prevent multiple timer starts
  gameStarted = true;
  timer = setInterval(function() {
    if (timeLeft <= 0) {
      clearInterval(timer);
      alert('Time is up!');
      endGame();
    } else {
      timeLeft--;
      document.getElementById('timer-display').textContent = 'Time: ' + timeLeft + 's';
    }
  }, 1000);
}

function resetTimer() {
  timeLeft = 60;
  document.getElementById('timer-display').textContent = 'Time: 0s';
  gameStarted = false;
}

// End Game Button
document.getElementById('end-game').addEventListener('click', function() {
  let score = foundWords.length === 10 ? 100 : foundWords.length * 10;
  alert('Game Over! Your score: ' + score);
  resetTimer();
  endGame();
});

// New Game Button
document.getElementById('new-game').addEventListener('click', function() {
  resetTimer();
  foundWords = [];
  clickedLetters = [];
  generateGrid();
  document.querySelectorAll('.word-search span').forEach(cell => {
    cell.classList.remove('highlight', 'found');
  });
});

// Start Timer Button
document.getElementById('start-timer').addEventListener('click', startTimer);

// Start the game with a new grid
generateGrid();
