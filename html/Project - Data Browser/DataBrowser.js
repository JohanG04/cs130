const table_div = document.getElementById('table');
const obj_table = document.getElementById('objTable');

const object_view = document.getElementById('objectView');
const first_button = document.getElementById('first');
const last_button = document.getElementById('last');
const close_object_view_button = document.getElementById('closeOV');

const cell_width = 300;
const cell_height = 300;

addEventListener('resize', draw_table);


class Villager{
    constructor(name, icon, species, gender, personality, hobby, birthday, birthmonth, catchphrase, favsong, favsaying, style1, style2, color1, color2, version_added, name_color, bubble_color){
        this.name = name;
        this.icon = icon
        this.species = species;
        this.gender = gender;
        this.personality = personality;
        this.hobby = hobby;
        this.birthday = birthday;
        this.birthmonth = birthmonth;
        this.catchphrase = catchphrase;
        this.favsong = favsong;
        this.favsaying = favsaying;
        this.style1 = style1;
        this.style2 = style2;
        this.color1 = color1;
        this.color2 = color2;
        this.version_added = version_added;
        this.name_color = name_color;
        this.bubble_color = bubble_color;

    }
}

//1.0.0, #848484, #ffffff, cat06, Q8Qds8CMWMnXTGbqf

objects = [
    new Villager("Punchy", "https://nh-cdn.catalogue.ac/NpcIcon/cat06.png", "Cat", "Male", "Lazy", "Play", 4, 11, "mrmpht", "Forest Life", "There's always more fish in the sea!", "Simple", "Simple", "Blue", "Aqua", 1.0, "#848484", "#ffffff"),
    new Villager("Molly", "https://nh-cdn.catalogue.ac/NpcIcon/duk16.png", "Duck", "Female", "Normal", "Nature", 3, 7, "quackidee", "K.K. Ballad", "Like water off a duck's back.", "Cute", "Simple", "Yellow", "Pink", 1.0, "#fffce9", "#e8b010")
];


first_button.addEventListener("click", () => viewObject(0));    //view object in first position in object array
last_button.addEventListener("click", () => viewObject(objects.length - 1));    //view object in last position of object array
close_object_view_button.addEventListener("click", () => {object_view.className = "objectViewClosed"}); //close object view window by setting display type to none

/**
    Get objects and fill the array of current objects
    Makes a http GET request for json file data.json
    Asks for certain number of items to receive, as well as sorted

    CHANGE TO PHP REQUEST

    php should get the objects from the json file on the server(later database)
    with requested filters applied (name, item amt, sorting), then send back objects
    to client side as json file.
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

/**alerts user with the content received from the server.**/
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

/** Function to dynamically change amount of rows and columns for a table to account for different window sizes.**/
function draw_table(){
    //get_objects();
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
            if (j + (i * num_cols) < len){
                //Individual Cells
                let div = document.createElement('DIV');
                let label = document.createElement('LABEL');
                let image = document.createElement('IMG');
                div.className = "objTableView"; //set class for css stylesheet
                div.style.backgroundColor = objects[j + (i * num_cols)].bubble_color;
                div.style.color = objects[j + (i * num_cols)].name_color;
                image.src = objects[j + (i * num_cols)].icon; //image of object 
                label.innerHTML = "" + (objects[j + (i * num_cols)].name) + "";
                div.appendChild(image);
                div.appendChild(label);
                td.appendChild(div);
                //add an event listener for each object, on click, send object id and present the objects data in the viewer
                div.addEventListener("click", () => viewObject(j + (i * num_cols)));
            }

            tr.appendChild(td);
        }
        new_table.appendChild(tr);
    }

    obj_table.appendChild(new_table);

    /*
    for (let i = 0; i < len; i++){
        console.log(objects[i].name);
    }*/

}

function viewObject(id){
    if (!(id < objects.length) || id < 0){
        return;
    }
    childnodes = object_view.children;

    childnodes[0].innerHTML = objects[id].name;
    childnodes[1].innerHTML = "" + (id + 1) + "/" + objects.length;

    //update the next and previous buttons
    document.getElementById('next').replaceWith(document.getElementById('next').cloneNode(true));
    document.getElementById('next').addEventListener("click", () => viewObject(id + 1));
    document.getElementById('previous').replaceWith(document.getElementById('previous').cloneNode(true));
    document.getElementById('previous').addEventListener("click", () => viewObject(id - 1));
    
    
    object_view.className = "objectViewOpen";    //set class to open for css stylesheet
}



//Call draw table function when page is opened
draw_table();