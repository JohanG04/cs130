
let arr = [];
let results = 0;

const nbutton = document.getElementById("n_button");
const fillbutton = document.getElementById("fill_button");
const savebutton = document.getElementById("save_button");
const calcbutton = document.getElementById("calculate_button");

//Max number for random numbers generated for array
const random_max = 100;

let n = parseInt(document.getElementById("n_value").value);

nbutton.addEventListener("click", create_arr);
fillbutton.addEventListener("click", fill_random);
savebutton.addEventListener("click", save_array);
calcbutton.addEventListener("click", send_array);

//display the current array to user.
function display_arr(){
    let curr = document.getElementById("curr_arr");

    curr.innerHTML = "[";
    for (let i = 0; i < n; i++){
        //create input elements for the user to edit the array
        let input = document.createElement("INPUT");
        input.type = "number";
        input.id = "v" + i + "";
        input.setAttribute("name", "v" + i + "");
        input.setAttribute("value", arr[i]);
        curr.appendChild(input);
        curr.innerHTML += ", ";


    }
    curr.innerHTML += "]";
    console.log(JSON.stringify(arr));
}

//clear array and create new array from 0-N.
function create_arr(){
    arr = [];
    n = parseInt(document.getElementById("n_value").value);
    
    for (let i = 0; i < n; i++){
        let newVal = i;
        arr[i] = newVal;
    }

    display_arr();
}

//fill existing array with random numbers
function fill_random(){
    for (let i = 0; i < n; i++){
        arr[i] = Math.floor(Math.random() * random_max);
    }

    display_arr();
}

//iterates over the array to set user input
function save_array(){
    for (let i = 0; i < n; i++){
        arr[i] = parseInt(document.getElementById("v" + i + "").value);
    }
}

function send_array(){
    httpRequest = new XMLHttpRequest();

    if (!httpRequest){
        alert("could not create HTTP request");
    }

    httpRequest.onreadystatechange = alertcontent;
    httpRequest.open('GET', "lab10.php?arr=" + JSON.stringify(arr), true);
    httpRequest.send();

}

function print_results(){
    p = document.getElementById("results");

    p.innerHTML = "Average: " + results.avg + "<br>Median: " + results.median + "<br>Standard Deviation: " + results.stdev + "<br>min: " + results.min + "<br>max: " + results.max;
}

function alertcontent(){
    if (httpRequest.readyState === XMLHttpRequest.DONE){
        if (httpRequest.status === 200){
            results = JSON.parse(httpRequest.responseText);
            
            print_results();
        }
    }
}

display_arr();