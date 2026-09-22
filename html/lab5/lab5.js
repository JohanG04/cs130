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
    for(let i = 0; i < n; i++){
        let result = primes(i);
        results.innerHTML += "<tr><td>" + i + "</td><td>" + result + "</td></tr>";
    }

}


function primes(i){
    if (i == 0){
        pres[0] = 2;
        return pres[0];
    }
    else if (i < pres.length){
        return pres[i];
    }
    else{
        i = pres[i - 1];
        let result = Math.floor(((factorial(i) % (i + 1)))/i);
        result *= (i - 1);
        result += 2;
        alert(i + ", " + result);
        if (pres.includes(result)){
            return primes(i + 1);
        }
        else{
            pres[pres.length] = i;
            return result;
        }
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