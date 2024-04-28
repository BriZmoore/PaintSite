const canvas = document.getElementById("canvas");
const body = document.querySelector("body");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var theColor = '';
var lineW = 5;
let prevX = null;
let prevY = null;
let draw = false;

body.style.backgroundColor = "#FFFFFF";
var theInput = document.getElementById("favcolor");

//allows to choose your own background color
theInput.addEventListener("input", function(){
    theColor = theInput.value;
    body.style.backgroundColor = theColor;
    }, false);

const ctx = canvas.getContext("2d");
ctx.lineWidth = lineW;

document.getElementById("ageInputId").oninput = function(){
    draw = null;
    lineW = document.getElementById("ageInputId").value;
    document.getElementById("ageOutputId").innerHTML = lineW;
    ctx.lineWidth = lineW;

};

let clrs = document.querySelectorAll(".clr");
clrs = Array.from(clrs);
clrs.forEach(clr => {
    clr.addEventListener("click", () => {
        ctx.strokeStyle = clr.dataset.clr;
    })
})

let clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
});
let saveBtn = document.querySelector(".save");
saveBtn.addEventListener("click", () => {
    let data = canvas.toDataURL("image/png");
    let a = document.createElement("a");
    a.href = data;
    a.download = "sketch.png";
    a.click();
})
window.addEventListener("mousedown", (e) => draw = true);
window.addEventListener("mouseup", (e) => draw = false);

window.addEventListener("mousemove", (e) => {
    if(prevX == null || prevY == null || !draw){
        prevX = e.clientX;
        prevY = e.clientY;
        return
    }
    let currentX = e.clientX;
    let currentY = e.clientY;

    ctx.beginPath();
    ctx.moveTo(prevX,prevY);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();

    prevX= currentX;
    prevY= currentY;
})
let isDrawingLine = false; // Flag to track if drawing a line is in progress
let startX, startY; // Variables to store start coordinates of the line
let straightLineMode = false; // Flag to track if straight line mode is active

// Event listener for mouse down event
canvas.addEventListener("mousedown", (e) => {
    // Set flag to true and store start coordinates if straight line mode is active
    if (straightLineMode) {
        isDrawingLine = true;
        startX = e.clientX - canvas.getBoundingClientRect().left;
        startY = e.clientY - canvas.getBoundingClientRect().top;
    }
});

// Event listener for mouse up event
canvas.addEventListener("mouseup", (e) => {
    // If drawing a line is in progress and straight line mode is active
    if (isDrawingLine && straightLineMode) {
        // Get end coordinates
        let endX = e.clientX - canvas.getBoundingClientRect().left;
        let endY = e.clientY - canvas.getBoundingClientRect().top;
        
        // Draw a straight line from start to end coordinates
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        
        // Reset flag
        isDrawingLine = false;
    }
});

// Event listener for mouse move event to preview the line
canvas.addEventListener("mousemove", (e) => {
    // If drawing a line is in progress and straight line mode is active
    if (isDrawingLine && straightLineMode) {
        // Get current mouse coordinates
        let currentX = e.clientX - canvas.getBoundingClientRect().left;
        let currentY = e.clientY - canvas.getBoundingClientRect().top;
        
        // Clear previous preview and draw a new preview line
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(currentX, currentY);
        ctx.stroke();
    }
});

// Event listener for the straight line button
document.getElementById("straightLineBtn").addEventListener("click", () => {
    // Toggle straight line mode
    straightLineMode = !straightLineMode;
});