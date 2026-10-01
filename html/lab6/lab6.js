const graph_Button = document.getElementById('graphButton');
const axis_Check = document.getElementById('axis');

const graph = document.getElementById('graph');

let xmax = 1;
let xmin = 0;
let ymax = 0;
let npoints = 1;
let x_step = 1;
let y_step = 1;
let step = 29; //30 px = 1 unit
const xorigin = 300;
const yorigin = 300;

graph_Button.addEventListener("click", compute_function);
axis_Check.addEventListener("click", draw_axis);

function draw() {
    draw_axis();
    
}

function draw_axis(){
    let ctx = graph.getContext("2d");
    ctx.clearRect(graph.width/2 - 1, 0, 20, graph.height);
    ctx.clearRect(0, graph.height/2 - 10, graph.width, 20);
    
    if (!axis_Check.checked){
        return;
    }


    ctx.moveTo(xorigin, 0);
    ctx.lineTo(xorigin, graph.height);
    ctx.moveTo(0, yorigin)
    ctx.lineTo(graph.width, yorigin);

    //ctx.fillText("(0,0)", 5, 280);

    for (let i = -graph.width/2; i * step <= graph.width/2; i++){
        ctx.fillText("" + (i * y_step) + "", graph.width/2, graph.height/2 - (i * step) + 5);
        ctx.fillText("" + (i * x_step + xmin) + "", graph.height/2 + (i * step) - 5, graph.height/2);
        
    }

    

    ctx.stroke();

    
}

function compute_function(){
    npoints = document.getElementById('points').value;
    xmin = parseInt(document.getElementById('xmin').value, 10);
    xmax = document.getElementById('xmax').value;
    let a3 = document.getElementById('a3').value;
    let a2 = document.getElementById('a2').value;
    let a1 = document.getElementById('a1').value;
    let a0 = document.getElementById('a0').value; 

    ymax = 0;

    step = Math.ceil(graph.width/npoints);
    x_step = Math.ceil((xmax - xmin)/npoints);
    
    let ycurr = 0;
    
    for (let i = xmin; i < xmax; i+= x_step){
        ycurr = (a3 * Math.pow(i, 3)) + (a2 * Math.pow(i, 2)) + (a1 * i) + a0;
        console.log(ycurr);
        console.log(ymax);
        
        ymax = ycurr;
    }

    y_step = Math.ceil((ymax)/npoints);



    draw();

}

draw_axis();