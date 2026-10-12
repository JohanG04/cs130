const table_div = document.getElementById('table');
const obj_table = document.getElementById('objTable');

const button = document.getElementById('myButton');

button.addEventListener('click', draw_table);

const cell_size = 100    ;   //width of each object for table

class myClass{
    constructor(name, year){
        this.name = name;
        this.year = year;

    }
}


objects = [
    new myClass("a", 1),
    new myClass("b", 2),
    new myClass("c", 5),
    new myClass("d", 12)

];


//Function to dynamically change amount of rows and columns for a table
//to account for different window sizes.
function draw_table(){
    let len = objects.length;
    let num_cols = Math.floor(window.innerWidth/(len * cell_size));
    let num_rows = Math.ceil(len/num_cols);

    obj_table.innerHTML = "";
    
    let new_table = document.createElement('TBODY');

    for (let i = 0; i < num_rows; i++){
        let tr = document.createElement('TR');
        for(let j = 0; j < num_cols; j++){
            let td = document.createElement('TD');
            td.innerHTML = "" + (j + 1) + "";

            tr.appendChild(td);
        }
        new_table.appendChild(tr);
    }

    obj_table.appendChild(new_table);

    /**
    for (let i = 0; i < len; i++){
        console.log(objects[i].name);
    }
*/
}

draw_table();