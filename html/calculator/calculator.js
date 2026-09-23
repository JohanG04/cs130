const button_7 = document.getElementById("7_Button");
const button_8 = document.getElementById("8_Button");
const button_9 = document.getElementById("9_Button");
const button_4 = document.getElementById("4_Button");
const button_5 = document.getElementById("5_Button");
const button_6 = document.getElementById("6_Button");
const button_1 = document.getElementById("1_Button");
const button_2 = document.getElementById("2_Button");
const button_3 = document.getElementById("3_Button");
const button_0 = document.getElementById("0_Button");

const number = 0;


button_0.addEventListener("click", number_pressed.bind(null, 0));
button_1.addEventListener("click", number_pressed.bind(null, 1));
button_2.addEventListener("click", number_pressed.bind(null, 2));
button_3.addEventListener("click", number_pressed.bind(null, 3));
button_4.addEventListener("click", number_pressed.bind(null, 4));
button_5.addEventListener("click", number_pressed.bind(null, 5));
button_6.addEventListener("click", number_pressed.bind(null, 6));
button_7.addEventListener("click", number_pressed.bind(null, 7));
button_8.addEventListener("click", number_pressed.bind(null, 8));
button_9.addEventListener("click", number_pressed.bind(null, 9));

function number_pressed(i){
    let number_label = document.getElementById("numbers");
    

    number_label.innerHTML = i;
}



function addTable(){
    let myTableDiv = document.getElementById("myDynamicTable");
    let table = document.createElement('TABLE');

    myTableDiv.appendChild(table);

    table.border='1';
    table.style.borderCollapse='collapse';
    let tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);
    let sizerow = 6;
    let sizecol = 10;

    for (let i = 0; i < sizerow; i++){
        let tr = document.createElement('TR');
        tableBody.appendChild(tr);

        for (let j = 0; j < sizecol; j ++){
            let td = document.createElement('TD');
            td.width='75';
            td.innerHTML = "blabla (" + i + "," + j + ")";
            tr.appendChild(td);
        }
    }

}