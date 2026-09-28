const graph_Button = document.getElementById('graphButton');
const axis_Check = document.getElementById('axis');

const graph = document.getElementById('graph');

const units = 5; //5 px = 1 unit

graph_Button.addEventListener("click", draw);
axis_Check.addEventListener("click", draw_axis);

function draw() {
    
}

function draw_axis(){
    let ctx = graph.getContext("2d");
    
    if (!axis_Check.checked){
        ctx.clearRect(0, 0, 31, ctx.canvas.height);
        ctx.clearRect(29, 229, ctx.canvas.width, 270);
        return;
    }


    ctx.moveTo(30, 10);
    ctx.lineTo(30, 270);
    ctx.lineTo(270, 270);

    ctx.fillText("(0,0)", 5, 280);

    ctx.stroke();

    
}

function compute_function(){

}

draw_axis();