
class arrayInput{
    constructor(name, value){
        this.name = name;
        this.value = value;
    }
}

let arr = [];

const nbutton = document.getElementById("n_button");
const fillbutton = document.getElementById("fill_button");
const savebutton = document.getElementById("save_button");

//Max number for random numbers generated for array
const random_max = 100;

let n = parseInt(document.getElementById("n_value").value);

nbutton.addEventListener("click", create_arr);
fillbutton.addEventListener("click", fill_random);
savebutton.addEventListener("click", save_array);

//display the current array to user.
function display_arr(){
    let curr = document.getElementById("curr_arr");

    curr.innerHTML = "[";
    for (let i = 0; i < n; i++){
        //create input elements for the user to edit the array
        let input = document.createElement("INPUT");
        input.type = "number";
        input.id = arr[i].name;
        input.setAttribute("name", arr[i].name);
        input.setAttribute("value", arr[i].value);
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
        let newVal = new arrayInput("v" + i + "", i);
        arr[i] = newVal;
    }

    display_arr();
}

//fill existing array with random numbers
function fill_random(){
    for (let i = 0; i < n; i++){
        arr[i].value = Math.floor(Math.random() * random_max);
    }

    display_arr();
}

//iterates over the array to set user input
function save_array(){
    for (let i = 0; i < n; i++){
        arr[i].value = parseInt(document.getElementById("v" + i + "").value);
    }
}