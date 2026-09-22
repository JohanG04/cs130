

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