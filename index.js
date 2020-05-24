var gameContainer = document.getElementById('game-container');
var restartBox = document.getElementById('restart-box');
var yesRestartBtn = document.getElementById('yes-restart');
var noRestartBtn = document.getElementById('no-restart');
var timerText = document.getElementById('timer-text');
var box1 = document.getElementById('box1');
var box2 = document.getElementById('box2');
var box3 = document.getElementById('box3');
var box4 = document.getElementById('box4');
var box5 = document.getElementById('box5');
var box6 = document.getElementById('box6');
var box7 = document.getElementById('box7');
var box8 = document.getElementById('box8');
var box9 = document.getElementById('box9');
var playersTurn = document.getElementById('players-turn');
var timer = 10;
var whichPlayer = true;
var interval = 0;

function startGame(){
    interval = setInterval(countDown,1000);
    restartBox.style.display = 'none';
    gameContainer.style.display = 'grid';
    playersTurn.innerText = 'Player 1';
}

function togglePlayer(){
    whichPlayer = !whichPlayer;
    if(whichPlayer){
        playersTurn.innerText = 'Player 1';
    }else{
        playersTurn.innerText = 'Player 2';
    }
}

function reset(){
    whichPlayer = true;
    timer = 10;
    playersTurn.style.color = 'black';

    console.log('children',gameContainer.children);
    
    for(i = 0; i < gameContainer.children.length; i++){
        gameContainer.children[i].children[0].innerText = '';
    }

    startGame();
}

function showEndScreen(){
    clearInterval(interval);
    gameContainer.style.display = 'none';
    restartBox.style.display = 'block';
}

function gameOver(choice){
    switch(choice){
        case 0:
            if(whichPlayer){
                //player 1 loses
                playersTurn.style.color = 'green';
                playersTurn.innerText = 'Player 2 wins!';
                showEndScreen();
            }else{
                //player 2 loses
                playersTurn.style.color = 'green';
                playersTurn.innerText = 'Player 1 wins!';
                showEndScreen();
            }
            break;
        case 1:
            //player 1 wins
            playersTurn.style.color = 'green';
            playersTurn.innerText = 'Player 1 wins!';
            showEndScreen();
            break;
        case 2:
            //player 2 wins
            playersTurn.style.color = 'green';
            playersTurn.innerText = 'Player 2 wins!';
            showEndScreen();
            break;
        case 3:
            //it's a tie
            playersTurn.style.color = 'red';
            playersTurn.innerText = 'It\'s a draw...';
            showEndScreen();
            break;
        default:
            break;
    }
}

function countDown(){
    timer--;
    if(timer === 10){
       timerText.innerText = `00:${timer}`;
    }else{
        timerText.innerText = `00:0${timer}`;
    }
    

    if(timer === 0){
        gameOver(0);
    }
}

function didTheyWin(){
    if(whichPlayer){
        gameOver(1);
    }else{
        gameOver(2);
    }
}

function checkCount(){
    var counter = 0;

    for(i = 0; i < gameContainer.children.length; i++){
        if(gameContainer.children[i].children[0].innerText !== '' && gameContainer.children[i].children[0].innerText !== null){
            counter++;
        }
    }

    if(counter === 9){
        gameOver(3);
    }
}

function checkGame(){
    if(box1.innerText === box2.innerText && box2.innerText === box3.innerText){
        didTheyWin();
    }else if((box1.innerText === 'X' || box1.innerText === 'O') && box1.innerText === box4.innerText && box4.innerText === box7.innerText){
        didTheyWin();
    }else if((box1.innerText === 'X' || box1.innerText === 'O') && box1.innerText === box5.innerText && box5.innerText === box9.innerText){
        didTheyWin();
    }else if((box2.innerText === 'X' || box2.innerText === 'O') && box2.innerText === box5.innerText && box5.innerText === box8.innerText){
        didTheyWin();
    }else if((box3.innerText === 'X' || box3.innerText === 'O') && box3.innerText === box5.innerText && box5.innerText === box7.innerText){
        didTheyWin();
    }else if((box3.innerText === 'X' || box3.innerText === 'O') && box3.innerText === box6.innerText && box6.innerText === box9.innerText){
        didTheyWin();
    }else if((box7.innerText === 'X' || box7.innerText === 'O') && box7.innerText === box8.innerText && box8.innerText === box9.innerText){
        didTheyWin();
    }else{
        timer = 10;
        togglePlayer();
        checkCount();
    }
}

function changeBoard(e){    
    var box = document.getElementById(e.target.id);
    var boxText = box.children[0];    

    if(whichPlayer){
        boxText.innerText = 'X';
    }else{
        boxText.innerText = 'O';
    }

    box.disabled = 'true';

    checkGame();
}

noRestartBtn.addEventListener('click',function(e){
    window.close();
});

yesRestartBtn.addEventListener('click',function(e){
    reset();
});

gameContainer.addEventListener('click',function(e){
    changeBoard(e);
});

startGame();
