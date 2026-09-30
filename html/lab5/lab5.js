const fres = [];
const pres = [2];

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
        tr.innerHTML = "<td>" + (i + 1) + "</td><td>" + pres[i] + "</td>";
        results.appendChild(tr);
    }
}


function primes(i){
    let curr = pres[pres.length - 1] + 1;
    while(pres.length < i){
        let prime = true;
        for (let n = 2; n <= Math.sqrt(curr); n++){
            if (curr % n == 0){
                prime = false;
            }
        }
        console.log(pres);
        if (prime){
            pres[pres.length] = curr;
        }

        curr += 1;
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