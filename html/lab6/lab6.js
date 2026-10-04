const graph_Button = document.getElementById('graphButton');
const axis_Check = document.getElementById('axis');
const points_Table = document.getElementById('pointstable');
const size_slider = document.getElementById('size');
const size_label = document.getElementById('sizeLabel');

const graph = document.getElementById('graph');

//Points list
let xs = [];
let ys = [];

//x and y max/mins
let xmax = 1;
let xmin = 0;
let ymax = 0;

//steps in between points per npoints. x(y)max/npoints
let x_step = 1;
let y_step = 1;
let npoints = 1;

//Direction of the graph (y axis)
let direction = 1;

//Pixels on canvas per unit 
let step = 30; //30 px = 1 unit

//origin (0,0) of canvas
const xorigin = graph.width/2;
const yorigin = graph.height/2;

//Function to check if element is not null. if not return alternate value
const exists = (a, b) => {if (!isNaN(a)) return a; else return b;}

graph_Button.addEventListener("click", compute_function);
axis_Check.addEventListener("click", draw);
size_slider.addEventListener("input", change_size);


//Draw elements of graph on canvas.
function draw() {
    let ctx = graph.getContext("2d");
    ctx.clearRect(0, 0, graph.width, graph.height);
    
    //Attempt to draw axis grid
    draw_axis();
    
    ctx.strokeStyle = "rgb(0, 0, 255)";
    ctx.beginPath();
    ctx.moveTo((xs[0]/x_step) * step + xorigin,(ys[0]/y_step) * step * direction + yorigin);   //Move to start of line

    //Draw line for all points in calculated array xs and ys.
    for(i in xs){
        ctx.lineTo(((xs[i]/x_step) * step + xorigin),((ys[i]/y_step) * step) * direction + yorigin);

        console.log("%f, %f",(((xs[i]) / x_step) + xorigin),((ys[i]/y_step) * step) * direction + yorigin);
    }
    ctx.stroke();
    ctx.closePath();
    
}

//Draw the axis grid
function draw_axis(){
    let ctx = graph.getContext("2d");
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.fillStyle = "rgb(0,0,0)";
    //ctx.clearRect(0, 0, graph.width, graph.height);
    
    //Draw x axis and y axis
    ctx.beginPath();
    ctx.moveTo(xorigin, 0);
    ctx.lineTo(xorigin, graph.height);
    ctx.moveTo(0, yorigin)
    ctx.lineTo(graph.width, yorigin);
    ctx.stroke();
    ctx.closePath();

    //If checkbox is not checked do not draw axis numbers
    if (!axis_Check.checked){
        return;
    }

    //draw axis numbers at every step.
    ctx.beginPath();
    for (let i = -graph.width/2; i * step <= graph.width/2; i++){
        ctx.fillText("" + (i * y_step) + "", graph.width/2, graph.height/2 - (i * step) * -direction);
        ctx.fillText("" + (i * x_step).toFixed(1) + "", graph.width/2 + (i * step), graph.height/2);
        
    }
    
    ctx.stroke();
    ctx.closePath();
    
}


//Function that uses the user input with the function (a3)x^3 + (a2)x^2 + (a1)x + (a0)
function compute_function(){
    //Get user input
    npoints = parseInt(document.getElementById('points').value) * 2;
    xmin = parseInt(document.getElementById('xmin').value);
    xmax = parseInt(document.getElementById('xmax').value);
    let a3 = parseInt(document.getElementById('a3').value);
    let a2 = parseInt(document.getElementById('a2').value);
    let a1 = parseInt(document.getElementById('a1').value);
    let a0 = parseInt(document.getElementById('a0').value); 
    
    
    //check if fields are filled correctly, if not alert user and return
    if (npoints < 2){
        alert("N Points must be greater than 1");
        return;
    }
    if (xmax <= xmin){
        alert("X max must be greater than X min");
        return;
    }
    
    //update the function displayed at the top of the page with user input
    updateFunc(a0, a1, a2, a3);
    
    ymax = 0;
    
    //change spacing for graph to fit required points
    //size_slider.min = Math.ceil((graph.width - 50)/npoints);
    //size_label.innerHTML = "Zoom: " + size_slider.value;
    x_step = ((xmax + Math.abs(xmin))/(npoints/2 - 1));
    
    
    let ycurr = 0;
    xs = [];
    ys = [];
    let done = false;
    let i = xmin;
    
    //Clear points table to refill with new data
    points_Table.innerHTML = "";
    
    //Calculate npoints from xmin to xmax
    do{
        
        ycurr = (a3 * Math.pow(i, 3)) + (a2 * Math.pow(i, 2)) + (a1 * i) + a0;
        
        xs[xs.length] = i;
        ys[ys.length] = ycurr;
        
        updateTable(i, ycurr);
        
        if (Math.abs(ycurr) > Math.abs(ymax)){
            ymax = ycurr;
        }
        //console.log(i);
        
        i += x_step;
        
        if (xs.length >= npoints/2){
            done = true;
        }
    }
    while (!done);

    //Set whether graph needs to be flipped for drawing (ymax is a negative number)
    if (ymax < 0){
        direction = 1;
    }
    else{
        direction = -1;
    }

    //console.log(xs.length);
    
    y_step = Math.ceil(ymax/npoints);

    draw();
    
}

//Changes graph spacing between points, effectively zooming in and out about the origin
function change_size(){
    step = size_slider.value;
    size_label.innerHTML = "Zoom: " + size_slider.value;
    draw();
}

//Update the function shown to the user
function updateFunc(a0, a1, a2, a3){
    let func = document.getElementById('function');

    console.log(a3);

    func.innerHTML = "" + exists(a3, "(a3)") + "x^3 + " + exists(a2, "(a2)") + "x^2 + " + exists(a1,"(a1)") + "x + " + exists(a0, "(a0)") + "";

    
}

function updateTable(x, y){
    let tr = document.createElement('TR');
    tr.innerHTML = "<td>" + x.toFixed(2) + "</td>" + "<td>" + y.toFixed(2) + "</td>";
    points_Table.appendChild(tr);

}

draw();