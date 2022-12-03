const gameValues = ['rock', 'paper', 'scissors'];
const totalRounds = 5;
let roundCount = 1;

let computerPlay = () => {
    let computerSelection = gameValues[Math.floor(Math.random() * gameValues.length)];
    return computerSelection;
}

let game = () => {
    let playerWinCount = 0;
    let computerWinCount = 0;

    console.log("===== Welcome To The Game =====")

    for (roundCount = 1; roundCount <= totalRounds; roundCount++) {
        let results = playRound();
        if (results) {
            playerWinCount += results.playerWinCount;
            computerWinCount += results.computerWinCount;

            console.log("Your Score: ", playerWinCount);
            console.log("Computer Score: ", computerWinCount);
            console.log(`Results for round: ${roundCount} = `, results);
        }
        else {
            roundCount--;
        }

    }

    console.log(`==============================`);
    if (playerWinCount > computerWinCount) {
        console.log(`All Rounds Results: You Won!`);
        console.log(`Your Score : ${playerWinCount}`);
        console.log(`Opponent Score : ${computerWinCount}`);

    }
    else if (playerWinCount < computerWinCount) {
        console.log(`All Rounds Results: You Lost!`);
        console.log(`Your Score : ${playerWinCount}`);
        console.log(`Opponent Score : ${computerWinCount}`);

    }
    else {
        console.log(`All Rounds Results: Draw! `);
        console.log(`Your Score : ${playerWinCount}`);
        console.log(`Opponent Score : ${computerWinCount}`);
    }

}

let playRound = () => {

    let gameResults = {
        playerWinCount: 0,
        computerWinCount: 0,
        displayText: ""
    };

    let playerSelection = prompt("Please enter your choice: Rock, Paper or Scissors.");
    if (playerSelection) {

        playerSelection = playerSelection.toLowerCase().trim();

        if (playerSelection == gameValues[0] || playerSelection == gameValues[1] || playerSelection == gameValues[2]) {
            console.log("user selection =>", playerSelection)

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
            return null;
        }
    }
    else {
        alert("Please enter correct option!");
        return null;
    }

}

game();


