//Wordle Webpage
/*TODO CLIENT SIDE:
    ALLOW TO ALSO USE KEYBOARD INPUT 
    END GAME
    DISPLAY TARGET WORD, RESULT, POINTS, ELAPSED TIME, AND NEW GAME BUTTON
    CREATE WINDOW FOR TUTORIAL AND OTHER WINDOW FOR RESULTS

 TODO SERVER SIDE:
    GET WORD FROM SERVER (IF ITS NOT DECREASE SCORE BY 32)
    CHECK USER WORD IF ITS IN WORD LIST
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

//gamestate
let user_guesses = 0;
let current_letter = 0;
let current_guess = [];
let user_score = 0;
let start_time = 0.0;
let end_time = 0.0;

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
        let current_letter_object = board.children[user_guesses].children[i].firstChild;
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

    current_letter = 0;
    user_guesses += 1;

    if (thisguess == correct_word){
        //CALL WIN FUNCTION
        //IF USER IS SIGNED IN, UPLOAD SCORE TO SERVER
        //Maybe start timer then call results menu to open
        user_score = Math.pow(2, (11 - user_guesses));
        end_time = new Date().getSeconds();

        RES_MENU.style.display = "grid";
        alert("WON WITH " + user_score + " POINTS! time = " + (end_time - start_time) + "s");
        
        return;
    }
    if (user_guesses >= GUESSES){
        //do what needs to happen on loss
        user_score = 0;
        RES_MENU.style.display = "grid";
        alert("YOU LOST," + user_score + "POINTS");
        return;
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

//FUNCTION TO GET TODAYS WORD FROM SERVER
//ENSURE THAT THE WORD IS ALL LOWERCASE using toLowerCase();
function getWord(){
    //create XML http request for word. Choose randomly word using php
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
    getWord();
    drawBoard();

    start_time = new Date().getSeconds();
}
//Draw the board when the window is opened
//ON START GET TODAYS WORD FROM SERVER (SERVER SIDE)

openTutorial();
//startGame();
