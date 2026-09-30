const fres = [];
const pres = [];

const enter_button = document.getElementById('enter');

enter_button.addEventListener("click", buttonPressed);

function buttonPressed(){
    //get user input 'n'
    let n = document.getElementById('n').value;
    //get the tbody element in results table
    let results = document.getElementById('results').getElementsByTagName('TBODY')[0];
    
    results.innerHTML = "";
    primes(n);

    for(let i = 0; i < n; i++){
        let tr = document.createElement('TR');
        tr.innerHTML = "<td>" + i + "</td><td>" + pres[i - 1] + "</td>";
        results.appendChild(tr);
    }
    alert(pres);
}


function primes(i){
    while(pres.length < i){
        for (let n = 2; n <= i; n++){
            if (i % n == 0){
                return;
            }
        }
        
        pres[pres.length] = pres.length;
    }
}

function factorial(i){
    if (i == 0 || i == 1){
        return 1;
    }
    else if (i < fres.length){
        return fres[i];
    }
    else{
        fres[i] = i * factorial(i - 1);
        return fres[i];
    }
}