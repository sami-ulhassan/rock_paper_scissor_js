const gameValues = ['rock', 'paper', 'scissors'];
const totalRounds = 5;

let playEl = document.getElementById("playBtn");
playEl.addEventListener("click", function () {
    game();
})

let computerPlay = () => {
    let computerSelection = gameValues[Math.floor(Math.random() * gameValues.length)];
    return computerSelection;
}

let game = () => {
    let playerWinCount = 0;
    let computerWinCount = 0;

    for (let i = 1; i <= totalRounds; i++) {
        let results = playRound();
        playerWinCount += results.playerWinCount;
        computerWinCount += results.computerWinCount;

        document.getElementById("results").style.display = "block";

        let playerEl = document.getElementById("player-data");
        playerEl.innerHTML = `Your Score : ${playerWinCount}`;

        let computerEl = document.getElementById("computer-data");
        computerEl.innerHTML = `Opponent Score : ${computerWinCount}`;

        console.log("playerWinCount", playerWinCount);
        console.log("computerWinCount", computerWinCount);
        console.log(`Results for round ${i} = `, results);
    }

    if (playerWinCount > computerWinCount) {
        console.log(`All Rounds Results: You Won!`);
    }
    else if (playerWinCount < computerWinCount) {
        console.log(`All Rounds Results: You Lost!`);
    }
    else {
        console.log(`All Rounds Results: You Draw!`);
    }

}

let playRound = () => {

    let gameResults = {
        playerWinCount: 0,
        computerWinCount: 0,
        displayText: ""
    };

    let playerSelection = prompt("Please enter your choice: Rock, Paper or Scissors.");
    if (!!playerSelection) {

        playerSelection = playerSelection.toLowerCase();

        if (playerSelection == gameValues[0] || playerSelection == gameValues[1] || playerSelection == gameValues[2]) {
            console.log("user selection", playerSelection)

            const computerSelection = computerPlay();
            console.log("computer selection =>", computerSelection)

            if (playerSelection != computerSelection) {
                if (playerSelection == "rock" && computerSelection == "paper") {
                    gameResults.computerWinCount = 1;
                    gameResults.displayText = `You Lose! ${computerSelection} beats ${playerSelection}.`
                    return gameResults;
                }
                else if (playerSelection == "rock" && computerSelection == "scissors") {
                    gameResults.playerWinCount = 1;
                    gameResults.displayText = `You Won! ${playerSelection} beats ${computerSelection}.`
                    return gameResults;
                }
                else if (playerSelection == "paper" && computerSelection == "scissors") {
                    gameResults.computerWinCount = 1;
                    gameResults.displayText = `You Lose! ${computerSelection} beats ${playerSelection}.`
                    return gameResults;
                }
                else if (playerSelection == "paper" && computerSelection == "rock") {
                    gameResults.playerWinCount = 1;
                    gameResults.displayText = `You Won! ${playerSelection} beats ${computerSelection}.`
                    return gameResults;
                }
                else if (playerSelection == "scissors" && computerSelection == "rock") {
                    gameResults.computerWinCount = 1;
                    gameResults.displayText = `You Lose! ${computerSelection} beats ${playerSelection}.`
                    return gameResults;
                }
                else if (playerSelection == "scissors" && computerSelection == "paper") {
                    gameResults.playerWinCount = 1;
                    gameResults.displayText = `You Won! ${playerSelection} beats ${computerSelection}.`
                    return gameResults;
                }
            }
            gameResults.displayText = `Draw!`;
            return gameResults;
        }
        else {
            alert("Please enter correct option!");
            location.reload();
        }
    }

}

// game();


