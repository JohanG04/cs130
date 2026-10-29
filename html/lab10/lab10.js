
const arr = [];

const nbutton = document.getElementById("n_button");
const fillbutton = document.getElementById("fill_button");

nbutton.addEventListener("click", create_arr);

function create_arr(){
    let n = document.getElementById("n_value");
    let curr = document.getElementById("curr_arr");

    curr.innerHTML = "[";
    for (let i = 0; i < n; i++){
        arr[i] = i;
    }

    curr.innerHTML += "" + arr + "]";
}