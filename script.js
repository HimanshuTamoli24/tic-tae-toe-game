let boxes = document.querySelectorAll(".box");
let newGameBtn = document.querySelector("#newGameBtn");
let resetBtn = document.querySelector("#resetBtn");
let msgContainer = document.querySelector(".msgContainer");
let winLoss = document.querySelector("#winLoss");
let newGameBtnAfterResult = document.querySelector("#newGameBtnAfterResult");

let turnO = true;
const winPatterns = [
    [0, 1, 2], // Horizontal top row
    [3, 4, 5], // Horizontal middle row
    [6, 7, 8], // Horizontal bottom row
    [0, 3, 6], // Vertical left column
    [1, 4, 7], // Vertical middle column
    [2, 5, 8], // Vertical right column
    [0, 4, 8], // Diagonal from top-left to bottom-right
    [2, 4, 6]  // Diagonal from top-right to bottom-left
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    newGameBtnAfterResult.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "o";
            turnO = false;
        } else {
            box.innerText = "x";
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerHTML = "";
    }
}

const showWinner = (winner) => {
    if (winner === "No one, it's a draw") {
        winLoss.innerText = "It's a draw. No one wins.";
    } else {
        winLoss.innerText = `Congrats!! Winner is ${winner}`;
    }
    msgContainer.classList.remove("hide");
    newGameBtnAfterResult.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return;
            }
        }
    }
    let isDraw = true;
    boxes.forEach((box) => {
        if (box.innerText === "") {
            isDraw = false;
        }
    });

    if (isDraw) {
        showWinner("No one, it's a draw");
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
newGameBtnAfterResult.addEventListener("click", resetGame);
