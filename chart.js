const e_chart = document.querySelector(".chart");

const canvas = document.createElement("canvas");
canvas.width = 50;
canvas.height = 50;
e_chart.appendChild(canvas);

const context = canvas.getContext("2d");
context.lineWidth = 8;

// circle radius 20px
const RADIUS = 20;

function drawCircle(color, ratio, anticlockwise){
    context.strokeStyle = color;
    context.beginPath();
    context.arc(canvas.width/2, canvas.height/2, RADIUS, 0, ratio*2*Math.PI, anticlockwise);
    context.stroke;
}


function updateChart(income, outcome){
    context.clearRect(0, 0, canvas.width, canvas.height);
    let ratio = income/ (income+outcome);
    drawCircle("#FFFFFF", -ratio, true);
    drawCircle("#F0624D", 1-ratio, false);
}