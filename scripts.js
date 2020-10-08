document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('.grid');
    const squares = document.querySelectorAll('.square');
    const mole = document.querySelectorAll('.mole');
    const scoreTimeContainer = document.querySelector('.score-board');
    var timeLeft = document.querySelector('#time-left');
    var scoreBoard = document.querySelector('#score');
    var hitBoard = document.querySelector('#hit-board');
    var score = 0;
    var molePosition;


    function displayMole() {

        //Create random index for displaying mole
        moleIndex = Math.floor(Math.random() * 9);

        //Add Mole Class to the selected Sqaure
        squares.forEach(square => {
            if (square.id == moleIndex) {
                square.classList.add('mole');
                molePosition = square.id;
            } else {
                square.classList.remove('mole');
            }
        });
    }


    //Check if the User Hit is a score 
    squares.forEach(square => square.addEventListener('mouseup', () => {
        if (square.id === molePosition) {
            score += 1;
            scoreBoard.textContent = score;
            moleIndex = null;
            hitBoard.textContent = "HIT !"
            setTimeout(() => {
                hitBoard.textContent = "WHACK A MOLE"
            }, 500);
        }
    }));


    //Handles the Timer 
    function displayTimer() {
        var timer = 60;
        let timerId = setInterval(() => {
            if (0 <= timer) {
                timeLeft.textContent = timer;
                timer -= 1;
            } else if (timer < 0) {
                let userReply = confirm('Time Out! Your Final Score : ' + score + '. Do you want to continue?');
                if (userReply == false) {
                    removeAllChildNodes(grid);
                    removeAllChildNodes(scoreTimeContainer);
                    addTotalScore(grid);
                    clearInterval(timerId);
                } else {
                    timer = 60;
                    timeLeft.textContent = timer;
                    score = 0;
                    scoreBoard.textContent = score;
                }
            }
        }, 1000);
    }

    //Handles the Mole 
    function moveMole() {
        displayTimer();
        let timerMole = setInterval(displayMole, 500);
    }

    //Removes all the Square Child Nodes
    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    //Displays the Final score
    function addTotalScore(parent) {
        var totalScore = document.createElement("h1");
        var node = document.createTextNode("TOTAL SCORE : " + score);
        totalScore.appendChild(node);
        totalScore.classList.add('title');
        grid.appendChild(totalScore);
    }

    moveMole();

});