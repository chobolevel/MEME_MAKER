const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const lineWidth = document.querySelector("#line-width");
const color = document.querySelector("#color");
const colorOptions = Array.from(document.getElementsByClassName("color-option"));
const modeBtn = document.querySelector("#mode-btn");
const destroyBtn = document.querySelector("#destroy-btn");
const eraserBtn = document.querySelector("#eraser-btn");
const fileInput = document.querySelector("#file");
const saveBtn = document.querySelector("#save-btn");
const textInput = document.querySelector("#text");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
let isPainting = false;
let isFilling = false;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
canvas.lineWidth = lineWidth.value;

function onMouseMove(e) {
    if(isPainting) {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        return;
    }
    else {
        ctx.moveTo(e.offsetX, e.offsetY);
    }
}
function startPainting() {
    isPainting = true;
}
function endPainting() {
    isPainting = false;
    ctx.beginPath();
}
function onLineWidthChange(e) {
    ctx.lineWidth = e.target.value;
}
function onColorChange(e) {
    const color = e.target.value;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}
function onColorClick(e) {
    const col = e.target.dataset.color;
    ctx.strokeStyle = col;
    ctx.fillStyle = col;
    color.value = col;
}
function onModeClick() {
    if(isFilling) {
        isFilling = false;
        modeBtn.innerText = "DRAW";
    }
    else {
        isFilling = true;
        modeBtn.innerText = "FILL";
    }
}
function onCanvasClick() {
    if(isFilling) {
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}
function onDestoryClick() {
    const ans = confirm("Are you sure Destroy?");
    if(ans === true) {
        ctx.save();
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.restore();
    }
}
function onEraserClick() {
    ctx.strokeStyle = "white";
    isFilling = false;
    modeBtn.innerText = "FILL";
}
function onFileChange(e) {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = () => {
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        fileInput.value = null;
    }
}
function onSaveClick() {
    const url = canvas.toDataURL();
    const a = document.createElement();
    a.href = url;
    a.download = "myDrawing.png";
    a.click();
}
function onDoubleClick(addEventListener) {
    const txt = textInput.value;
    if(txt !== "") {
        ctx.save();
        ctx.lineWidth = 1;
        ctx.font = "68px serif";
        ctx.fillText(txt, e.offsetX, e.offsetY);
        ctx.restore();
    }
}

canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", endPainting);
canvas.addEventListener("mouseleave", endPainting);
canvas.addEventListener("click", onCanvasClick);
canvas.addEventListener("dbclick", onDoubleClick);
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);
colorOptions.forEach(color => color.addEventListener("click", onColorClick));
modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestoryClick);
eraserBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);