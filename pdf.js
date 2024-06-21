import * as pdfjsLib from 'pdfjs-dist/webpack';

const fileInput = document.getElementById('fileInput');

document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
        const reader = new FileReader();
        reader.onload = function() {
            const typedarray = new Uint8Array(this.result);
            console.log('TypedArray:', typedarray);
            pdfjsLib.getDocument(typedarray).promise.then(pdf => {
                console.log('PDF:', pdf);
                const numPages = pdf.numPages;
                let pageTextPromises = [];
                for (let i = 1; i <= numPages; i++) {
                    pageTextPromises.push(
                        pdf.getPage(i).then(page => {
                            return page.getTextContent().then(textContent => {
                                return textContent.items.map(item => item.str).join(" ");
                            });
                        })
                    );
                }
                Promise.all(pageTextPromises).then(pagesText => {
                    document.getElementById('file_content').textContent = pagesText.join("\n\n");
                });
            }, err => {
                console.error("Error: " + err);
            });
        };
        reader.readAsArrayBuffer(file);
    } else {
        alert("Please select a valid PDF file.");
    }
});

```html
Announcement: We’re just weeks away from MCAPS Start! 汇总
添加了Sales见解X
Maureen Costello 在 Microsoft Viva Engage 网络的 Industry Solutions Delivery 社区开始了一个新的对话。

对话关于 MCAPS 的公告，预计将有超过 60,000 名员工参加。

该活动将介绍 FY25 的优先事项。

Maureen Costello 提醒尚未注册的人尽快注册。

该活动被指示为不可错过的。

转到Sales
点赞图标
评论图标
分享图标
AI生成的内容可能不正确。

``` 

import { analyzeImg } from "./image";

function adjustCanvasSize(canvas, width, height) {
    let pixelRatio = window.devicePixelRatio || 1;
    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    canvas.style.width = `${width / pixelRatio}px`;
    canvas.style.height = `${height / pixelRatio}px`;
    canvas.getContext('2d').scale(pixelRatio, pixelRatio);
}

const canvasForm = document.getElementById('alter_image_form');
const imageComments = document.getElementById('image_comments');

canvasForm.addEventListener('submit', (e) => {
    e.preventDefault();
    analyzeImg(getCanvasBase64(canvas), imageComments.value);
});

canvasForm.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        analyzeImg(getCanvasBase64(canvas), imageComments.value);
    }
})

const canvas = document.getElementById('altered_image_canvas');
const ctx = canvas.getContext('2d');
const strokeLineWidth = document.getElementById('strokeLineWidth');

let isOnOff = false;
let oldX = null;
let oldY = null;
let lineColor = '#000'; // default line color
let lineWidth = 5;
let erasing = false; // eraser mode flag

// Initialize line width input
strokeLineWidth.value = lineWidth;

canvas.addEventListener('mousemove', draw, false);
canvas.addEventListener('mousedown', down, true);
canvas.addEventListener('mouseup', up, false);

function getMousePos(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    let pixelRatio = 1;
    return {
        x: (event.clientX - rect.left) * pixelRatio,
        y: (event.clientY - rect.top) * pixelRatio
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
    if (isOnOff) {
        const mousePos = getMousePos(canvas, event);
        let newX = mousePos.x;
        let newY = mousePos.y;

        ctx.beginPath();
        ctx.moveTo(oldX, oldY);
        ctx.lineTo(newX, newY);
        ctx.strokeStyle = erasing ? 'white' : lineColor; // eraser uses white color
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.stroke();

        oldX = newX;
        oldY = newY;
    }
}

// Set up tool buttons
const pencilBtn = document.getElementById('pencilBtn');
pencilBtn.addEventListener('click', () => {
    erasing = false;
    // Optionally, change the cursor or provide feedback that the pencil tool is selected
});

const eraserBtn = document.getElementById('eraserBtn');
eraserBtn.addEventListener('click', () => {
    erasing = true;
    // Optionally, change the cursor or provide feedback that the eraser tool is selected
});

// Update line width from input
strokeLineWidth.oninput = function () {
    lineWidth = strokeLineWidth.value;
};

// Based on your previous code:
// Clipboard paste handling, canvas setup, and touch events remain the same

document.addEventListener('paste', (event) => {
    const clipboardItems = event.clipboardData.items;
    for (let i = 0; i < clipboardItems.length; i++) {
        if (clipboardItems[i].type.indexOf('image') !== -1) {
            const blob = clipboardItems[i].getAsFile();
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = new Image();
                img.onload = function() {
                    let drawWidth = img.width;
                    let drawHeight = img.height;

                    if (img.width > canvas.width || img.height > canvas.height) {
                        const ratio = Math.min(canvas.width / img.width, canvas.height / img.height);
                        drawWidth = img.width * ratio;
                        drawHeight = img.height * ratio;
                    }

                    ctx.fillStyle = 'white';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0, drawWidth, drawHeight);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(blob);
            break;
        }
    }
});

function getCanvasBase64(canvas) {
    const base64 = canvas.toDataURL("image/jpeg");
    return base64;
}

window.addEventListener('load', () => {
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.fillStyle = 'grey';
    ctx.lineWidth = 1;
    ctx.font = '12px Arial';
    ctx.fillText('请粘贴到这里...', 10, 30);
});

window.addEventListener('resize', () => {});

canvas.addEventListener('touchstart', function(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent("mousedown", {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}, false);

canvas.addEventListener('touchend', function(e) {
    e.preventDefault();
    const mouseEvent = new MouseEvent("mouseup", {});
    canvas.dispatchEvent(mouseEvent);
}, false);

canvas.addEventListener('touchmove', function(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}, false);

document.body.addEventListener('touchstart', function(e) {
    if (e.target === canvas) {
        e.preventDefault();
    }
}, false);

document.body.addEventListener('touchend', function(e) {
    if (e.target === canvas) {
        e.preventDefault();
    }
}, false);

document.body.addEventListener('touchmove', function(e) {
    if (e.target === canvas) {
        e.preventDefault();
    }
}, false);