import { analyzeImg } from "./image";

function adjustCanvasSize(canvas, width, height) {
    let pixelRatio = window.devicePixelRatio || 1;
    //console.log('Pixel ratio:', pixelRatio);
    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    canvas.style.width = `${width / pixelRatio}px`;
    canvas.style.height = `${height / pixelRatio}px`;
    canvas.getContext('2d').scale(pixelRatio, pixelRatio);
}

let erasing = false; // eraser mode flag
const canvasForm = document.getElementById('alter_image_form');
const imageComments = document.getElementById('image_comments');

// Event listener for chat form submission
canvasForm.addEventListener('submit', (e) => {
    e.preventDefault();
    analyzeImg(getCanvasBase64(canvas), imageComments.value);
});

canvasForm.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    analyzeImg(getCanvasBase64(canvas), imageComments.value);
  }
})

const canvas = document.getElementById('altered_image_canvas');//1.获取画布
const ctx = canvas.getContext('2d');//2.获取上下文
const strokeStyleSelect = document.getElementById('strokeColorSelect');//改变颜色控件
const strokeLineWidth = document.getElementById('strokeLineWidth');//改变线条宽度控件

//按下标记
let isOnOff = false;
let oldX = null;
let oldY = null;

//设置画笔颜色
let lineColor = '#000';  //默认线条颜色为黑色

//设置画笔线宽
let lineWidth = 5;
strokeLineWidth.value = lineWidth; //初始化输入框的值,显示初始线条宽度

// Set up tool buttons
const pencilBtn = document.getElementById('pencilBtn');
pencilBtn.addEventListener('click', () => {
    erasing = false;
    // Optionally, change the cursor or provide feedback that the pencil tool is selected
    canvas.style.cursor = 'crosshair'; 
    pencilBtn.style.backgroundColor = 'lightblue';
    eraserBtn.style.backgroundColor = 'transparent';
    strokeLineWidth.value = 5; // Set pencil width to 5 by default
    lineWidth = 5; // Set pencil width to 5 by default
});

const eraserBtn = document.getElementById('eraserBtn');
eraserBtn.addEventListener('click', () => {
    erasing = true;
    // Optionally, change the cursor or provide feedback that the eraser tool is selected
    canvas.style.cursor = 'cell'; // Change cursor to cell for eraser

    pencilBtn.style.backgroundColor = 'transparent';
    eraserBtn.style.backgroundColor = 'lightblue';
    strokeLineWidth.value = 30; // Set eraser width to 30 by default
    lineWidth = 30; // Set eraser width to 30 by default
});

const clearBtn = document.getElementById('clearBtn');
clearBtn.addEventListener('click', () => {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, drawWidth, drawHeight);
});

//添加鼠标移动事件
canvas.addEventListener('mousemove', draw, false);
//添加鼠标按下事件
canvas.addEventListener('mousedown', down, true);
//添加鼠标按下事件
canvas.addEventListener('mouseup', up, false);

function getMousePos(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    //let pixelRatio = window.devicePixelRatio || 1;
    let pixelRatio = 1;
    return {
        x: ( event.clientX - rect.left ) * pixelRatio,
        y: ( event.clientY - rect.top ) * pixelRatio
    };
}

function down(event) {
    isOnOff = true;
    const mousePos = getMousePos(canvas, event);
    oldX = mousePos.x;
    oldY = mousePos.y;
}

function up() {
    isOnOff = false;
}

function draw(event) {
    if (isOnOff === true) {
        const mousePos = getMousePos(canvas, event);
        let newX = mousePos.x;
        let newY = mousePos.y;

        ctx.beginPath();
        ctx.moveTo(oldX, oldY);
        ctx.lineTo(newX, newY);
        //ctx.strokeStyle = lineColor;
        ctx.strokeStyle = erasing ? 'white' : lineColor; // eraser uses white color
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.stroke();

        oldX = newX;
        oldY = newY;
    }
}

strokeStyleSelect.onchange = function () {
    lineColor = strokeStyleSelect.value;
};

strokeLineWidth.oninput = function () {
    lineWidth = strokeLineWidth.value;
};

document.addEventListener('paste', (event) => {
    const clipboardItems = event.clipboardData.items;
    for (let i = 0; i < clipboardItems.length; i++) {
        if (clipboardItems[i].type.indexOf('image') !== -1) {
            const blob = clipboardItems[i].getAsFile();
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = new Image();
                img.onload = function() {

                    // Calculate new dimensions and position
                    let drawWidth = img.width;
                    let drawHeight = img.height;
                    let offsetX = 0;
                    let offsetY = 0;

                    if (img.width > canvas.width || img.height > canvas.height) {
                        const ratio = Math.min(canvas.width / img.width, canvas.height / img.height);
                        drawWidth = img.width * ratio;
                        drawHeight = img.height * ratio;
                        //console.log('ratio:', ratio);
                    }

                    //ctx.clearRect(0, 0, canvas.width, canvas.height);
                    // Fill the canvas with white
                    ctx.fillStyle = 'white';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0, drawWidth, drawHeight); // Draw at original size, starting from top-left corner
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(blob);
            break;
        }
    }
});

// Convert canvas content to Base64 string
function getCanvasBase64(canvas) {
    // Example: return canvas content as PNG
    const base64 = canvas.toDataURL("image/jpeg");
    //console.log('Base64:', base64);
    return base64; // You can specify "image/jpeg" or other formats if needed
}

// Set up initial white background on canvas
window.addEventListener('load', () => {
    // Set a white background
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.fillStyle = 'grey';
    ctx.lineWidth = 1;
    ctx.font = '12px Arial';
    ctx.fillText('请粘贴到这里...', 10, 30);

    canvas.style.cursor = 'crosshair';

    pencilBtn.style.backgroundColor = 'lightblue';
    eraserBtn.style.backgroundColor = 'transparent';
});

window.addEventListener('resize', () => {
    //adjustCanvasSize(canvas, canvas.offsetWidth, canvas.offsetHeight);
}
);

// set up touch events for mobile and writing pad
canvas.addEventListener('touchstart', function(e) {
    e.preventDefault();
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousedown", {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}, false);

canvas.addEventListener('touchend', function(e) {
    e.preventDefault();
    var mouseEvent = new MouseEvent("mouseup", {});
    canvas.dispatchEvent(mouseEvent);
}
, false);

canvas.addEventListener('touchmove', function(e) {
    e.preventDefault();
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}
, false);

// Prevent scrolling when touching the canvas
document.body.addEventListener('touchstart', function(e) {
    if (e.target == canvas) {
        e.preventDefault();
    }
}
, false);

document.body.addEventListener('touchend', function(e) {
    if (e.target == canvas) {
        e.preventDefault();
    }
}
, false);

document.body.addEventListener('touchmove', function(e) {
    if (e.target == canvas) {
        e.preventDefault();
    }
}
, false);
