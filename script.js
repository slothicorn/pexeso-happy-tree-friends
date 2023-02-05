const cardsArray = [
    {
        name: 'Cuddles', img: 'https://github.com/slothicorn/Pexeso/blob/development/img/Cuddles.webp?raw=true'
    },
    {
        name: 'DiscoBear', img: 'https://github.com/slothicorn/Pexeso/blob/development/img/DiscoBear.webp?raw=true'
    },
    {
        name: 'Flaky', img: 'https://github.com/slothicorn/Pexeso/blob/development/img/Flaky.webp?raw=true'
    },
    {
        name: 'Flippy', img: 'https://github.com/slothicorn/Pexeso/blob/development/img/Flippy.webp?raw=true'
    },
    {
        name: 'Giggles', img: 'https://github.com/slothicorn/Pexeso/blob/development/img/Giggles.webp?raw=true'
    },
    {
        name: 'Handy', img: 'https://github.com/slothicorn/Pexeso/blob/development/img/Handy.webp?raw=true'
    },
    {
        name: 'Lumpy', img: 'https://github.com/slothicorn/Pexeso/blob/development/img/Lumpy.webp?raw=true'
    },
    {
        name: 'Mole', img: 'https://github.com/slothicorn/Pexeso/blob/development/img/Mime.webp?raw=true'
    },
    {
        name: 'Nutty', img: 'https://github.com/slothicorn/Pexeso/blob/development/img/Nutty.webp?raw=true'
    },
    {
        name: 'Petunia', img: 'https://github.com/slothicorn/Pexeso/blob/development/img/Petunia.webp?raw=true'
    },
    {
        name: 'Sniffles', img: 'https://github.com/slothicorn/Pexeso/blob/development/img/Sniffles.webp?raw=true'
    },
    {
        name: 'Toothy', img: 'https://github.com/slothicorn/Pexeso/blob/development/img/Toothy.webp?raw=true'
    }
]

const gameGrid = cardsArray.concat(cardsArray);

gameGrid.sort(() => {
    return 0.5 - Math.random();
});

const game = document.getElementById('game-board');
const grid = document.createElement('section');

grid.setAttribute('class', 'grid');
game.appendChild(grid);

for (i = 0; i < gameGrid.length; i++) {
    const card = document.createElement('div');
    card.classList.add('card');

    card.dataset.name = gameGrid[i].name;

    card.style.backgroundImage = `url(${gameGrid[i].img})`;
    grid.appendChild(card);
}

let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;

const match = () => {
    const selected = document.querySelectorAll('.selected');

    for (i = 0; i < selected.length; i++) {
        selected[i].classList.add('match');
    }
};

const resetGuesses = () => {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;

    const selected = document.querySelectorAll('.selected');
    for (i = 0; i < selected.length; i++) {
        selected[i].classList.remove('selected');
    }
};

grid.addEventListener('click', (event) => {
    const clicked = event.target;

    if (clicked.nodeName == 'SECTION' || clicked == previousTarget || clicked.parentNode.classList.contains('match')) {
        return;
    }

    if (count < 2) {
        count++;
        if (count === 1) {
            firstGuess = clicked.dataset.name;
            clicked.classList.add('selected');
        } else {
            secondGuess = clicked.dataset.name;
            clicked.classList.add('selected');
        }

        if (firstGuess !== '' && secondGuess !== '') {
            if (firstGuess == secondGuess) {
                match();
                resetGuesses();
            } else {
                resetGuesses();
            }
        }

        previousTarget = clicked;
    }
});