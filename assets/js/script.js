const gameValues = ['rock', 'paper', 'scissors'];
const totalRounds = 5;
let roundCount = 1;

const gameResults = {
    playerWinCount: 0,
    computerWinCount: 0,
    displayText: ""
};

const btnEls = document.querySelectorAll(".btn-primary");
const playBtnEl = document.querySelector("#btnPlay");
const btnContainerEl = document.querySelector(".btn-container");
const playAreaEl = document.querySelector(".play-area");
const optionsEls = document.querySelectorAll(".option-primary");
const controlsEl = document.querySelector(".controls-container");
const roundResultEl = document.querySelector(".round-result");
const finalResultsEl = document.querySelector(".final-results");

let showPlayOptions = () => {
    if (roundCount == 1) {
        btnContainerEl.classList.toggle("d-none")
        playAreaEl.classList.toggle("d-none");
    }
    else {
        controlsEl.classList.toggle("d-none");
        optionsEls.forEach(opEl => {
            opEl.classList.remove("d-none", "active");
            opEl.disabled = false;
        })
        const vsEl = document.querySelector(".vs-img");
        vsEl.remove();
        playAreaEl.classList.remove("d-none")
        const cloneEl = document.querySelector(".clone-el");
        if (cloneEl) cloneEl.remove();

        const resultTextEl = document.querySelector("#resultText");
        roundResultEl.removeChild(resultTextEl)
    }

}

playBtnEl.addEventListener("click", showPlayOptions);

optionsEls.forEach(el => {

    el.addEventListener("click", function (e) {

        if (e.target.nodeName == "IMG" || e.target.nodeName == "BUTTON") {

            const computerSelection = computerPlay();
            const playerSelection = e.target.dataset.value;
            console.log("computer selection =>", computerSelection)
            console.log("player selection =>", playerSelection)

            const hideEls = gameValues.filter(item => item != computerSelection && item != playerSelection);

            hideEls.forEach(value => {

                optionsEls.forEach(opEl => {
                    opEl.disabled = true;
                    if (opEl.dataset.value == value) {
                        opEl.classList.toggle("d-none")
                    }
                    if (opEl.dataset.value == playerSelection) {
                        opEl.classList.add("active")
                        playAreaEl.insertBefore(opEl, playAreaEl.firstChild);

                    }
                })

            })

            if (hideEls.length > 1) {
                const cloneValue = gameValues.filter(item => item == computerSelection && item == playerSelection);
                const elem = document.querySelector(`#${cloneValue}`);
                const cloneEl = elem.cloneNode(true);
                cloneEl.id = `${cloneValue}-2`;
                cloneEl.classList.add("clone-el")
                cloneEl.classList.remove("active")
                elem.after(cloneEl);
            }

            const vsEl = document.createElement("img");
            vsEl.src = "./assets/images/versus.png";
            vsEl.alt = "VS";
            vsEl.className = "vs-img";

            const activeEl = document.querySelector(".active");
            activeEl.after(vsEl);

            controlsEl.classList.toggle("d-none")

            const results = playRound(computerSelection, playerSelection);
            console.log("Round result ==", results);

            const resultTextEl = document.createElement("h3");
            resultTextEl.id = "resultText";
            resultTextEl.insertAdjacentText('afterbegin', results.displayText);
            roundResultEl.appendChild(resultTextEl);

            checkResults();
        }

    })

});

const playNextRoundEl = document.querySelector("#next-round");
const viewResultsBtn = document.querySelector("#view-results");

playNextRoundEl.addEventListener("click", () => {
    roundCount++;
    console.log("Round ", roundCount)
    showPlayOptions();
})

const homeBtn = document.querySelector("#home-btn");
const playAgainBtn = document.querySelector("#play-again");

homeBtn.addEventListener("click", () => {
    location.reload();
})

playAgainBtn.addEventListener("click", () => {
    location.reload();
})

let getScoreText = () => {
    if(gameResults.playerWinCount > gameResults.computerWinCount){
        return "You Won!";
    }
    return "You Lost!";
}


let checkResults = () => {
    if (gameResults.computerWinCount == 5 || gameResults.playerWinCount == 5) {
        playNextRoundEl.classList.toggle("d-none");
        viewResultsBtn.classList.toggle("d-none");

        const scoreEl = document.querySelector(".score");
        scoreEl.insertAdjacentText('afterbegin', `${gameResults.playerWinCount} - ${gameResults.computerWinCount}`);

        const scoreTextEl = document.querySelector(".score-text");
        scoreTextEl.insertAdjacentText('afterbegin', getScoreText())
    }
}


viewResultsBtn.addEventListener("click", () => {
    finalResultsEl.classList.toggle("d-none");
    playAreaEl.classList.toggle("d-none");
    controlsEl.classList.toggle("d-none");
})


let computerPlay = () => {
    let computerSelection = gameValues[Math.floor(Math.random() * gameValues.length)];
    return computerSelection;
}

let playRound = (computerSelection, playerSelection) => {

    if (playerSelection != computerSelection) {
        if (playerSelection == "rock" && computerSelection == "paper") {
            gameResults.computerWinCount++;
            gameResults.displayText = `Oops! You Lose! ${computerSelection} beats ${playerSelection}.`
            return gameResults;
        }
        else if (playerSelection == "rock" && computerSelection == "scissors") {
            gameResults.playerWinCount++;
            gameResults.displayText = `Yay! You Won! ${playerSelection} beats ${computerSelection}.`
            return gameResults;
        }
        else if (playerSelection == "paper" && computerSelection == "scissors") {
            gameResults.computerWinCount++;
            gameResults.displayText = `Oops! You Lose! ${computerSelection} beats ${playerSelection}.`
            return gameResults;
        }
        else if (playerSelection == "paper" && computerSelection == "rock") {
            gameResults.playerWinCount++;
            gameResults.displayText = `Yay! You Won! ${playerSelection} beats ${computerSelection}.`
            return gameResults;
        }
        else if (playerSelection == "scissors" && computerSelection == "rock") {
            gameResults.computerWinCount++;
            gameResults.displayText = `Oops! You Lose! ${computerSelection} beats ${playerSelection}.`
            return gameResults;
        }
        else if (playerSelection == "scissors" && computerSelection == "paper") {
            gameResults.playerWinCount++;
            gameResults.displayText = `Yay! You Won! ${playerSelection} beats ${computerSelection}.`
            return gameResults;
        }
    }
    gameResults.displayText = `Oops! It's a Draw!`;
    return gameResults;
}

