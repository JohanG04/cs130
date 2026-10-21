const table_div = document.getElementById('table');
const obj_table = document.getElementById('objTable');


addEventListener('resize', draw_table);

const cell_width = 300;   //width of each object for table
const cell_height = 500;

class myClass{
    constructor(name, year){
        this.name = name;
        this.year = year;

    }
}
/*
objects = [
    new myClass("a", 1),
    new myClass("b", 2),
    new myClass("c", 5),
    new myClass("d", 12),
    new myClass("e", 1),
    new myClass("f", 2),
    new myClass("g", 5),
    new myClass("h", 12)

];
*/
/**
    Get objects and fill the array of current objects
    Makes a http GET request for json file data.json
**/
function get_objects(){
    httpRequest = new XMLHttpRequest();

    if (!httpRequest){
        alert("Could not create HTTP Request");
        return false;
    }

    httpRequest.onreadystatechange = alertcontent;
    httpRequest.open('GET', 'data.json');
    httpRequest.send();
}

/**
    alerts user with the content received from the server.
**/
function alertcontent(){
    try{
        if(httpRequest.readyState === XMLHttpRequest.DONE){
            if (httpRequest.status === 200){
                //set the objects list to the received JSON list on server
                objects = JSON.parse(httpRequest.responseText)['objects'];       
            }
            else{
                alert("A problem occured with the request");
            }
        }
    }
    catch(e){
        alert("Caught Exception: " + e.description);
    }
}

/** 
    Function to dynamically change amount of rows and columns for a table
    to account for different window sizes.
**/
function draw_table(){
    get_objects();
    let len = objects.length;
    let num_cols = Math.floor(window.innerWidth/(cell_width));
    let num_rows = Math.ceil(len/num_cols);

    //console.log(num_cols);
    //console.log(num_rows);

    
    obj_table.innerHTML = "";
    
    let new_table = document.createElement('TBODY');

    //DISPLAY INDIVIDUAL OBJECTS
    //Replace this with cover art + name
    //user can click to get more information
    for (let i = 0; i < num_rows; i++){
        let tr = document.createElement('TR');
        for(let j = 0; j < num_cols; j++){
            let td = document.createElement('TD');
            td.style.width = "" + cell_width + "px";
            td.style.height = "" + cell_height + "px";
            if (j + (i * num_cols) < len){
                td.style.backgroundColor = "aliceblue";
                td.innerHTML = "" + (objects[j + (i * num_cols)].name) + "";
            }

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



//Call draw table function when page is opened
draw_table();