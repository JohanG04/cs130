//Wordle Webpage
/*TODO CLIENT SIDE:
    Display User stats
    CREATE WINDOW FOR TUTORIAL AND OTHER WINDOW FOR RESULTS

 TODO SERVER SIDE:
    CHECK USER WORD IF ITS IN WORD LIST (IF ITS NOT DECREASE SCORE BY 32)
    Get User information from User database. Display leaderboard
*/
//Board Dimensions
const WORDLENGTH = 5;
const GUESSES = 6;

const board = document.getElementById("board");

let correct_word = "posts";

//tutorial Menu
const TUT_MENU = document.getElementById("tutorialdiv");
const TUT_START = document.getElementById("tutstart");

TUT_START.addEventListener("click", startGame);

//results Menu
const RES_MENU = document.getElementById("resultsdiv");
const RES_START = document.getElementById("resstart");

RES_START.addEventListener("click", startGame);

//keyboard
const Q_BUTTON = document.getElementById("qbutton");
const W_BUTTON = document.getElementById("wbutton");
const E_BUTTON = document.getElementById("ebutton");
const R_BUTTON = document.getElementById("rbutton");
const T_BUTTON = document.getElementById("tbutton");
const Y_BUTTON = document.getElementById("ybutton");
const U_BUTTON = document.getElementById("ubutton");
const I_BUTTON = document.getElementById("ibutton");
const O_BUTTON = document.getElementById("obutton");
const P_BUTTON = document.getElementById("pbutton");
const A_BUTTON = document.getElementById("abutton");
const S_BUTTON = document.getElementById("sbutton");
const D_BUTTON = document.getElementById("dbutton");
const F_BUTTON = document.getElementById("fbutton");
const G_BUTTON = document.getElementById("gbutton");
const H_BUTTON = document.getElementById("hbutton");
const J_BUTTON = document.getElementById("jbutton");
const K_BUTTON = document.getElementById("kbutton");
const L_BUTTON = document.getElementById("lbutton");
const Z_BUTTON = document.getElementById("zbutton");
const X_BUTTON = document.getElementById("xbutton");
const C_BUTTON = document.getElementById("cbutton");
const V_BUTTON = document.getElementById("vbutton");
const B_BUTTON = document.getElementById("bbutton");
const N_BUTTON = document.getElementById("nbutton");
const M_BUTTON = document.getElementById("mbutton");

const ENTER_GUESS = document.getElementById("guess");
const BACKSPACE = document.getElementById("backspace");

Q_BUTTON.addEventListener("click", () => letterPressed("q"));
W_BUTTON.addEventListener("click", () => letterPressed("w"));
E_BUTTON.addEventListener("click", () => letterPressed("e"));
R_BUTTON.addEventListener("click", () => letterPressed("r"));
T_BUTTON.addEventListener("click", () => letterPressed("t"));
Y_BUTTON.addEventListener("click", () => letterPressed("y"));
U_BUTTON.addEventListener("click", () => letterPressed("u"));
I_BUTTON.addEventListener("click", () => letterPressed("i"));
O_BUTTON.addEventListener("click", () => letterPressed("o"));
P_BUTTON.addEventListener("click", () => letterPressed("p"));
A_BUTTON.addEventListener("click", () => letterPressed("a"));
S_BUTTON.addEventListener("click", () => letterPressed("s"));
D_BUTTON.addEventListener("click", () => letterPressed("d"));
F_BUTTON.addEventListener("click", () => letterPressed("f"));
G_BUTTON.addEventListener("click", () => letterPressed("g"));
H_BUTTON.addEventListener("click", () => letterPressed("h"));
J_BUTTON.addEventListener("click", () => letterPressed("j"));
K_BUTTON.addEventListener("click", () => letterPressed("k"));
L_BUTTON.addEventListener("click", () => letterPressed("l"));
Z_BUTTON.addEventListener("click", () => letterPressed("z"));
X_BUTTON.addEventListener("click", () => letterPressed("x"));
C_BUTTON.addEventListener("click", () => letterPressed("c"));
V_BUTTON.addEventListener("click", () => letterPressed("v"));
B_BUTTON.addEventListener("click", () => letterPressed("b"));
N_BUTTON.addEventListener("click", () => letterPressed("n"));
M_BUTTON.addEventListener("click", () => letterPressed("m"));

ENTER_GUESS.addEventListener("click", submitGuess);
BACKSPACE.addEventListener("click", backspacePressed);

//physical keyboard
document.addEventListener("keydown", function(event){
    //If the game is not occuring dont use keyboard input
    if (!game_start){
        return;
    }

    switch(event.code){
        case "Enter":
            submitGuess();
            break;
        case "Backspace":
            backspacePressed();
            break;
        case "KeyQ":
        case "KeyW":
        case "KeyE":
        case "KeyR":
        case "KeyT":
        case "KeyY":
        case "KeyU":
        case "KeyI":
        case "KeyO":
        case "KeyP":
        case "KeyA":
        case "KeyS":
        case "KeyD":
        case "KeyF":
        case "KeyG":
        case "KeyH":
        case "KeyJ":
        case "KeyK":
        case "KeyL":
        case "KeyZ":
        case "KeyX":
        case "KeyC":
        case "KeyV":
        case "KeyB":
        case "KeyN":
        case "KeyM":
            letterPressed(event.key.toLowerCase());
            break;
    }

    //console.log("" + event.key +  "");
});

//gamestate
let game_start = false;   //if game has started
let user_guesses = 0;
let current_letter = 0;
let current_guess = [];
let user_score = 0;
let start_time = 0.0;
let end_time = 0.0;

let timer;

//Add letter to the board when user presses that letter
function letterPressed(letter){
    if (user_guesses >= GUESSES){
        return;
    }
    if (current_letter >= WORDLENGTH){
        console.log("Word is Too Long");
        return;
    }

    //Get Row of current guess
    let current_letter_object = board.children[user_guesses].children[current_letter].firstChild;
    current_letter_object.innerHTML = letter;
    //current_letter_object.className = "halfcorrectguess";

    current_guess[current_letter] = letter;
    current_letter += 1;
    console.log(current_guess.toString());
}

//Delete letter from guess when user presses BACKSPACE
function backspacePressed(){
    if (user_guesses >= GUESSES){
        return;
    }
    if (current_letter <= 0){
        console.log("At Beginning of Word");
        return;
    }

    current_letter -= 1;
    let current_letter_object = board.children[user_guesses].children[current_letter].firstChild;
    current_letter_object.innerHTML = "";
}

//Submit guess when user presses the ENTER button
function submitGuess(){
    //CHECK IF WORD IS IN WORD LIST (SERVER SIDE)

    if (user_guesses >= GUESSES){
        console.log("OUT OF GUESSES");
        return;
    }
    if (current_letter < WORDLENGTH){
        console.log("WORD NOT LONG ENOUGH");
        return;
    }

    let thisguess = current_guess.join("").toLowerCase();   //Get user input as String, all lowercase
    
    //console.log(thisguess);

    for (i in thisguess){
        timer = window.setTimeout(checkIndex, 100 * (i * 5), user_guesses, thisguess, i);
        
    }

    current_letter = 0;
    user_guesses += 1;

    console.log(thisguess == correct_word);
    if (thisguess == correct_word){
        //CALL WIN FUNCTION
        //IF USER IS SIGNED IN, UPLOAD SCORE TO SERVER
        //Maybe start timer then call results menu to open
        end_time = new Date().getTime() / 10;
        timer = window.setTimeout(endGame, 4000, true);
    }
    else if (user_guesses >= GUESSES){
        //do what needs to happen on loss
        end_time = new Date().getTime() / 10;
        timer = window.setTimeout(endGame, 4000, false);
    }

}

function checkIndex(currguesses, thisguess, i){
    let current_letter_object = board.children[currguesses].children[i].firstChild;
    let current_button = document.getElementById("" + thisguess[i] + "button");
    if (correct_word.includes(thisguess[i])){
        if (correct_word[i] == thisguess[i]){
            current_letter_object.className = "correctguess";
            current_button.style.backgroundColor = "green";
        }
        else{
            current_letter_object.className = "halfcorrectguess";
            //if the button is not already green mark as yellow
            if (current_button.style.backgroundColor != "green"){
                current_button.style.backgroundColor = "goldenrod";
            }
        }
    }
    else{
        current_letter_object.className = "incorrectguess";
        current_button.style.backgroundColor = "red";
    }
}

function drawBoard(){
    let body = document.getElementById("body");
    body.style.gridTemplateRows = "75px " +  (75 * GUESSES + 50) +  "px 30%"
    board.innerHTML = "";

    for (let i = 0; i < GUESSES; i++){
        let tr = document.createElement("TR");
        tr.setAttribute("id", "row" + i);
        for(let j = 0; j < WORDLENGTH; j++){
            //Individual cell
            let td = document.createElement("TD");
            let letter = document.createElement("DIV");
            letter.className = "blankguess";

            td.appendChild(letter);
            tr.appendChild(td);
            board.appendChild(tr);
        }
    }

}

function openTutorial(){
    TUT_MENU.style.display = "grid";
}

function startGame(){
    TUT_MENU.style.display = "none";
    RES_MENU.style.display = "none";

    //set starting gamestate
    //Set all button colors back to gray
    user_guesses = 0;
    current_letter = 0;
    current_guess = [];
    user_score = 0;
    start_time = 0.0;
    end_time = 0.0;
    requestWord();  //make a request to server for the word
    drawBoard();

    start_time = new Date().getTime() / 10;
    game_start = true;
}

//END GAME FUNCTIONS

//reset the on screen keyboard
function resetKeyboard(){
    Q_BUTTON.style.backgroundColor = "gray";
    W_BUTTON.style.backgroundColor = "gray";
    E_BUTTON.style.backgroundColor = "gray";
    R_BUTTON.style.backgroundColor = "gray";
    T_BUTTON.style.backgroundColor = "gray";
    Y_BUTTON.style.backgroundColor = "gray";
    U_BUTTON.style.backgroundColor = "gray";
    I_BUTTON.style.backgroundColor = "gray";
    O_BUTTON.style.backgroundColor = "gray";
    P_BUTTON.style.backgroundColor = "gray";
    A_BUTTON.style.backgroundColor = "gray";
    S_BUTTON.style.backgroundColor = "gray";
    D_BUTTON.style.backgroundColor = "gray";
    F_BUTTON.style.backgroundColor = "gray";
    G_BUTTON.style.backgroundColor = "gray";
    H_BUTTON.style.backgroundColor = "gray";
    J_BUTTON.style.backgroundColor = "gray";
    K_BUTTON.style.backgroundColor = "gray";
    L_BUTTON.style.backgroundColor = "gray";
    Z_BUTTON.style.backgroundColor = "gray";
    X_BUTTON.style.backgroundColor = "gray";
    C_BUTTON.style.backgroundColor = "gray";
    V_BUTTON.style.backgroundColor = "gray";
    B_BUTTON.style.backgroundColor = "gray";
    N_BUTTON.style.backgroundColor = "gray";
    M_BUTTON.style.backgroundColor = "gray";
}

//End the game and display game user score, as well as total user score and total time
function endGame(won){
    game_start = false;

    //clear all timers, cancel function calls
    while(timer){
        window.clearTimeout(timer);
        timer -= 1;
    }
    
    //Change Result Menu values here
    if (won){
        user_score = Math.pow(2, (11 - user_guesses));
        //alert("WON WITH " + user_score + " POINTS! time = " + (end_time - start_time) + "s");
        document.getElementById("winlosstext").innerHTML = "Won!";
    }
    else{
        user_score = 0;
        //alert("YOU LOST," + user_score + "POINTS");
        document.getElementById("winlosstext").innerHTML = "Lost!";
    }
    
    document.getElementById("theword").innerHTML = correct_word;
    document.getElementById("score").innerHTML = "Score: " + user_score + " points";
    document.getElementById("time").innerHTML = "Time: " + Math.floor(end_time - start_time) / 100 + " seconds";
    resetKeyboard();
    RES_MENU.style.display = "grid";
}



//SERVER SIDE FUNCTIONS

//FUNCTION TO GET TODAYS WORD FROM SERVER
//ENSURE THAT THE WORD IS ALL LOWERCASE using toLowerCase();
function requestWord(){
    //create XML http request for word. Choose randomly word using php
    httpRequest = new XMLHttpRequest();

    if (!httpRequest){
        alert("Could not create http request");
        return false;
    }

    httpRequest.onreadystatechange = getWord;
    httpRequest.open('GET', "Wordle.php?req=word", true);
    httpRequest.send();
}

function getWord(){
    if (httpRequest.readyState === XMLHttpRequest.DONE){
        if (httpRequest.status === 200){
            correct_word = JSON.parse(httpRequest.responseText);
            for (i in correct_word){
                console.log(correct_word[i]);
            }
            //console.log(typeof(correct_word));
        }
    }
}

function checkWord(){
    //create XML http request for checking word. Return true if it is in word list. false if not
    httpRequest = new XMLHttpRequest();
}


//Draw the board when the window is opened
//ON START GET TODAYS WORD FROM SERVER (SERVER SIDE)

openTutorial();
//startGame();