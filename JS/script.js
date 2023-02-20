//* Game constraints and variables
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('Audio/food.mp3');
const gameOverSound = new Audio('Audio/gameover.mp3');
const moveSound = new Audio('Audio/move.mp3');
const backgroundSound = new Audio('Audio/music.mp3');
let speed = 7;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
]
let food = { x: 6, y: 7 }
let score = 0;

//* Game functions
function main(cTime) {
    window.requestAnimationFrame(main);
    // console.log(cTime)
    if ((cTime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    };
    lastPaintTime = cTime;
    gameEngine();
}

function isCollide(snake) {
    //* If you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    //* If you bump into the wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }

    return false;
}

function gameEngine() {
    //* Part1: Updating the snake array & food
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        backgroundSound.pause();
        backgroundSound.currentTime = 0;
        inputDir = { x: 0, y: 0 };
        alert("Game Over. Press Enter key to play again")
        snakeArr = [{ x: 13, y: 15 }]
        // backgroundSound.play();
        score = 0;
        speed = 5;
        document.getElementById("score").innerText = score;
    }

    //* If you have eaten the food increment the score and regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            document.getElementById("highScore").innerHTML = hiscore;
            document.getElementById("highScore").innerHTML = score;
        }
        if(score%5==0){
            speed+= 0.5;
        }
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
        document.getElementById("score").innerText = score;
    }

    //* Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //* Part2: Display the snake and food
    //* Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index == 0) {
            snakeElement.classList.add('head')
        } else {
            snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement);
    })
    //* Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
}


//* main logic starts here
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    document.getElementById("highScore").innerHTML = hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener("keydown", e => {
    backgroundSound.play();
    inputDir = { x: 0, y: 1 }; //*Start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            console.log("ArrowUp")
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            console.log("ArrowDown")
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            console.log("ArrowLeft")
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            console.log("ArrowRight")
            break;

        default:
            break;
    }
})