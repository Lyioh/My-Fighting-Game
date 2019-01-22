const startButton = document.querySelector("#start");
let gameIsOn = false;

//////////////////////// Objets  ////////////////////////
let Input = {
    player: ["A","Z","E","Q","S","D"],
    enemy: ["I","O","P","K","L","M"],
    playerLetter: 0,
    enemyLetter: 0,
    playerError: false,
    enemyError: false,
    playerHealth: 100,
    enemyHealth: 100
};

////////////////////////// Draw & Victory ///////////////////
function draw() {
    document.querySelector("#draw").style.visibility = "visible";
    document.querySelector("#draw").classList.add("zoomIn");
}

function removeDrawStatus() {
    document.querySelector("#draw").style.visibility = "hidden";
    document.querySelector("#draw").classList.remove("zoomIn");
}

function victory() {
    document.querySelector("#victory").style.visibility = "visible";
    document.querySelector("#victory").classList.add("zoomIn");
    document.querySelector("body").removeEventListener("keypress", spacePressed);
}

function removeVictoryStatus() {
    document.querySelector("#victory").style.visibility = "hidden";
    document.querySelector("#victory").classList.remove("zoomIn");
}
//////////////////// Randomize the Input and reset ///////////////////////
function showInputPLayer() {
    Input.playerLetter = Math.floor(Math.random() * 5);
    document.querySelector("#playerDisplay > p").innerHTML = Input.player[Input.playerLetter];
}

function showInputEnemy() {
    Input.enemyLetter = Math.floor(Math.random() * 5);
    document.querySelector("#enemyDisplay > p").innerHTML = Input.enemy[Input.enemyLetter];
}

function resetInput() {
    document.querySelector("#playerDisplay > p").innerHTML = "";
    document.querySelector("#enemyDisplay > p").innerHTML = "";
    document.querySelector("#enemyDisplay").style.backgroundColor = "white";
    document.querySelector("#playerDisplay").style.backgroundColor = "white";
    Input.playerError = false;
    Input.enemyError = false;
}

/////////////////////////////// PLayers got hit //////////////////////////
function playerGetHit() {
    document.querySelector("#enemyDisplay").style.backgroundColor = "#398833";
    document.querySelector("#playerDisplay").style.backgroundColor = "#B90000";
    Input.playerHealth -= 25;
    document.querySelector("#greenBarPlayer").style.width = Input.playerHealth + "%";
}

function enemyGetHit() {
    document.querySelector("#playerDisplay").style.backgroundColor = "#398833";
    document.querySelector("#enemyDisplay").style.backgroundColor = "#B90000";
    Input.enemyHealth -= 25;
    document.querySelector("#greenBarEnemy").style.width = Input.enemyHealth + "%";
}

//////////////////////// Reset game ////////////////////////////////////
function resetParameters() {
    Input.playerLetter = 0;
    Input. enemyLetter = 0;
    Input.playerError = false;
    Input.enemyError = false;
    Input.playerHealth = 100;
    document.querySelector("#greenBarPlayer").style.width = "100%";
    Input.enemyHealth = 100;
    document.querySelector("#greenBarEnemy").style.width = "100%";
    removeVictoryStatus();
    resetInput();
    document.querySelector("#start > p").innerHTML = "Start";
}
/////////////////// Compare Keys////////////////////////
function compareKey(theKeyPressed) {
    // Si la touche correspond a celle aficher
    if (theKeyPressed === Input.player[Input.playerLetter] || theKeyPressed === Input.enemy[Input.enemyLetter]) {
        document.querySelector("body").removeEventListener("keypress", keyPressed);
        if (theKeyPressed === Input.player[Input.playerLetter] && Input.playerError === false) {
            enemyGetHit();
            document.querySelector("#enemyCharacter").classList.add("shake");
            setTimeout(function removeShake() {
                document.querySelector("#enemyCharacter").classList.remove("shake");
            }, 300);
            if (Input.enemyHealth === 0) {
                victory();
                document.querySelector("#start > p").innerHTML = "Reset";
            }
        } 
        else if (theKeyPressed === Input.enemy[Input.enemyLetter] && Input.enemyError === false) {  
            playerGetHit();
            document.querySelector("#playerCharacter").classList.add("shake");
            setTimeout(function removeShake() {
                document.querySelector("#playerCharacter").classList.remove("shake");
            }, 300);
            if (Input.playerHealth === 0) {
                victory();
                document.querySelector("#start > p").innerHTML = "Reset";
            }
        }
    //Si c'est pas la bonne lettre player 
    }
    else if (theKeyPressed !== Input.player[Input.playerLetter] && Input.player.includes(theKeyPressed)) {
        Input.playerError = true;
        document.querySelector("#playerDisplay").style.backgroundColor = "orange";
        if (Input.playerError && Input.enemyError) {
            draw();
            setTimeout(removeDrawStatus, 1200)
        }
    }
    else if (theKeyPressed !== Input.enemy[Input.enemyLetter] && Input.enemy.includes(theKeyPressed)) {
        Input.enemyError = true;
        document.querySelector("#enemyDisplay").style.backgroundColor = "orange";
        if (Input.playerError && Input.enemyError) {
            draw();
            setTimeout(removeDrawStatus, 1200)
        }
    }
}

function keyPressed(event) {
    compareKey((event.key).toUpperCase());
}

////////////////////// Timer Count Down//////////////////////////////
function fightCountDown() {
    document.querySelector("body").removeEventListener("keypress", spacePressed);
    let timer = Math.floor((Math.random() * 3) + 1);
    let timerDisplay = document.querySelector("#start > p");
    timerDisplay.innerHTML = timer;
    let countDown = setInterval(cdTimer, 1000);

    function cdTimer() {
        timer--;
        timerDisplay.innerHTML = timer;
        if (timer <= 0) {
            clearInterval(countDown);
            showInputPLayer();
            showInputEnemy();
            timerDisplay.innerHTML = "Start";
            startButton.disabled = false;
            startButton.style.backgroundColor = "#398833";
            document.querySelector("body").addEventListener("keypress", keyPressed)
            document.querySelector("body").addEventListener("keypress", spacePressed);
        }
    }
}

////////////////////// Function Start ///////////////////////
function letsStart() {  
    startButton.style.backgroundColor = "#B90000";
    startButton.disabled = true;
    resetInput();
    fightCountDown();
}

////////////////////////// Space Pressed ////////////////////////
function spacePressed(event) {
    if (event.charCode === 32) {
        letsStart();
    }
}

////////////////////////// Trap SEnded ////////////////////////
/* function trapPlayer(event) {
    if (event.code === "KeyF") {
        document.querySelector("body").removeEventListener("keypress", trapPlayer);
        showInputEnemy();
    }
}

function trapEnemy(event) {
    if (event.code === "KeyJ") {
        document.querySelector("body").removeEventListener("keypress", trapEnemy);
        showInputPLayer();
    }
} */
///////////////////////////////   /Events/      ////////////////////////////////////////
document.querySelector("#start").addEventListener("click", function start() {
    if ((event.target.textContent).trim() === "Start") {
        letsStart();
    }
    else if ((event.target.textContent).trim() === "Reset") {
        resetParameters();
    }
})

document.querySelector("body").addEventListener("keypress", spacePressed);

////////////////////////////////////////////////////
///// Ajouter les fakes lettres now ////////////////
////////////////////////////////////////////////////
