const icons = [
    '🐱', '🐱', '🐶', '🐶', '🐻', '🐻', 
    '🐼', '🐼', '🦁', '🦁', '🦊', '🦊',
    '🐨', '🐨', '🐸', '🐸'
];
let firstCard, secondCard;
let lockBoard = false;
let matchedPairs = 0;
let moves = 0;
let time = 0;
let timer;
let highScore = localStorage.getItem('highScore') || 0;

// Shuffle icons array
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

// Create game board
function createBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    shuffle(icons);

    icons.forEach(icon => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.icon = icon;
        cardElement.innerHTML = `<span class="card-icon">${icon}</span>`;
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });

    startTimer();
}

function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.icon === secondCard.dataset.icon;

    if (isMatch) {
        disableCards();
        matchedPairs++;
        if (matchedPairs === icons.length / 2) {
            setTimeout(endGame, 500);
        }
    } else {
        unflipCards();
    }

    updateMoves();
}

function disableCards() {
    firstCard.classList.add('correct');
    secondCard.classList.add('correct');
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function startTimer() {
    time = 0;
    clearInterval(timer);
    timer = setInterval(() => {
        time++;
        document.getElementById('timer').innerText = `Time: ${time}`;
    }, 1000);
}

function updateMoves() {
    moves++;
    document.getElementById('moves').innerText = `Moves: ${moves}`;
}

function endGame() {
    clearInterval(timer);
    if (time < highScore || highScore === 0) {
        localStorage.setItem('highScore', time);
        highScore = time;
    }
    document.getElementById('high-score').innerText = `High Score: ${highScore}`;
    alert(`You win! Time: ${time} seconds, Moves: ${moves}`);
}

document.getElementById('restart-btn').addEventListener('click', () => {
    matchedPairs = 0;
    moves = 0;
    document.getElementById('moves').innerText = `Moves: 0`;
    createBoard();
    document.getElementById('timer').innerText = `Time: 0`;
});

document.getElementById('high-score').innerText = `High Score: ${highScore}`;
createBoard();
