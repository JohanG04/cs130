const graph_Button = document.getElementById('graphButton');
const axis_Check = document.getElementById('axis');
const points_Table = document.getElementById('pointstable');

const graph = document.getElementById('graph');
let xs = [];
let ys = [];

let xmax = 1;
let xmin = 0;
let ymax = 0;
let npoints = 1;
let x_step = 1;
let y_step = 1;
let step = 29; //30 px = 1 unit
const xorigin = graph.width/2;
const yorigin = graph.height/2;

graph_Button.addEventListener("click", compute_function);
axis_Check.addEventListener("click", draw);

function draw() {
    let ctx = graph.getContext("2d");
    ctx.clearRect(0, 0, graph.width, graph.height);
    
    draw_axis();
    
    ctx.strokeStyle = "rgb(0, 0, 255)";
    ctx.beginPath();
    ctx.moveTo((xs[0]/x_step) * step + xorigin,(ys[0]/y_step) * step * -1 + yorigin);   //Move to start of line
    for(i in xs){
        ctx.lineTo(((xs[i]/x_step) * step + xorigin),((ys[i]/y_step) * step) * -1 + yorigin);

        console.log("%f, %f",(((xs[i]) / x_step) + xorigin),((ys[i]/y_step) * step) * -1 + yorigin);
    }
    ctx.closePath();
    ctx.stroke();

    
    
    
}

function draw_axis(){
    let ctx = graph.getContext("2d");
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.fillStyle = "rgb(0,0,0)";
    //ctx.clearRect(0, 0, graph.width, graph.height);
    
    ctx.moveTo(xorigin, 0);
    ctx.lineTo(xorigin, graph.height);
    ctx.moveTo(0, yorigin)
    ctx.lineTo(graph.width, yorigin);
    ctx.stroke();

    if (!axis_Check.checked){
        return;
    }

    //ctx.fillText("(0,0)", 5, 280);
    
    for (let i = -graph.width/2; i * step <= graph.width/2; i++){
        ctx.fillText("" + (i * y_step) + "", graph.width/2, graph.height/2 - (i * step));
        ctx.fillText("" + (i * x_step).toFixed(1) + "", graph.width/2 + (i * step), graph.height/2);
        
    }
    
    
    
    ctx.stroke();
    
    
}

function compute_function(){
    points_Table.innerHTML = "";

    npoints = parseInt(document.getElementById('points').value) * 2;
    xmin = parseInt(document.getElementById('xmin').value, 10);
    xmax = parseInt(document.getElementById('xmax').value);
    let a3 = parseInt(document.getElementById('a3').value);
    let a2 = parseInt(document.getElementById('a2').value);
    let a1 = parseInt(document.getElementById('a1').value);
    let a0 = parseInt(document.getElementById('a0').value); 


    updateFunc(a0, a1, a2, a3);
    
    ymax = 0;
    
    step = Math.ceil((graph.width - 50)/npoints);
    x_step = ((Math.abs(xmax) + Math.abs(xmin))/(npoints/2 - 1));


    let ycurr = 0;
    xs = [];
    ys = [];
    
    for (let i = xmin; Math.floor(i) <= xmax; i+= ((Math.abs(xmax) + Math.abs(xmin))/(npoints/2 - 1))){
        
        ycurr = (a3 * Math.pow(i, 3)) + (a2 * Math.pow(i, 2)) + (a1 * i) + a0;

        
        xs[xs.length] = i;
        ys[ys.length] = ycurr;

        updateTable(i, ycurr);
        
        ymax = ycurr;
        console.log(i);
    }
    //console.log(xs.length);
    
    y_step = Math.ceil(ymax/npoints);

    draw();
    
}

function updateFunc(a0, a1, a2, a3){
    let func = document.getElementById('function');

    func.innerHTML = "" + (a3) + "x^3 + " + (a2) + "x^2 + " + (a1) + "x + " + (a0) + "";

    
}

function updateTable(x, y){
    let tr = document.createElement('TR');
    tr.innerHTML = "<td>" + x.toFixed(2) + "</td>" + "<td>" + y.toFixed(2) + "</td>";
    points_Table.appendChild(tr);

}

draw();