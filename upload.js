import * as mammoth from 'mammoth';
import { renderMarkdown } from './markdown';
import { drawPieChart } from './pie_chart.js';
import { analyzeImg } from './image.js';
import * as pdfjsLib from 'pdfjs-dist/webpack';


let contentType = 'text/plain';

const MAX_PROMPT_LEN = 34000;

async function analyzeText() {

    const token = localStorage.getItem('jwtToken');

    let fileContent = document.getElementById('file_content').textContent;

    // Truncate the content if it exceeds MAX_PROMPT_LEN
    if (fileContent.length > MAX_PROMPT_LEN) {
        console.warn(`Content exceeds the maximum length of ${MAX_PROMPT_LEN} characters. Truncating...`);
        fileContent = fileContent.slice(0, MAX_PROMPT_LEN);
    }

    // Show loading indicator
    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.style.display = 'block';

    document.getElementById('analysis_result').innerHTML = '';
    document.getElementById('chartsContainer').innerHTML = '';
    document.getElementById('justifications').innerHTML = '';

    const loadingDots = document.getElementById('loadingDots');
    let dotCount = 0;
    const dotInterval = setInterval(() => {
        loadingDots.textContent = '.'.repeat((dotCount++ % 4));
    }, 500);

    try {
        const response = await fetch("https://openaiserverlwt.azurewebsites.net/redsi",{
        //const response = await fetch('http://localhost:8080/redsi', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                prompt: fileContent
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        loadingIndicator.style.display = 'none';
        const data = await response.json();
        const parsedData = data.bot.trim() // trims any trailing spaces/'\n' 

        //document.getElementById('analysis_result').innerHTML = renderMarkdown(parsedData);
        //document.getElementById('analysis_result').innerHTML = data.bot;
        drawPieChart(parsedData);

    } catch (error) {
        console.error('Error:', error);
    }
}

const uploadFileLink = document.getElementById("uploadFile");
const fileSelectorDiv = document.getElementById('file_selector');
const fileInput = document.getElementById('fileInput');
const fileNameDisplay = document.getElementById('fileName');

uploadFileLink.addEventListener("click", async (event) => {
    if (contentType === 'image/jpeg') {
        return await analyzeImg(document.getElementById('image_content').src, '');
    } else {
        return await analyzeText();
    }
});

// Event listener for the div
fileSelectorDiv.addEventListener('click', function () {
    fileInput.click();
});

// Event listener for file input change

fileInput.addEventListener('change', function () {
    const file = fileInput.files[0]; // Get the selected file
    const fileNameDisplay = document.getElementById('fileName'); // Assuming an element to display file name
    
    if (!file) {
        alert('Please select a file to upload.');
        return;
    }

    // Extracting file name to display
    const fileName = file.name;

    const reader = new FileReader(); // Create a new FileReader object

    // Define the onload event to display file content after reading it
    reader.onload = function(e) {
        // Function to handle display result
        const displayTextResult = function(content) {
            // Clean the text by removing empty lines
            const cleanedText = content.replace(/\n\s*\n/g, '\n').trim(); 
            document.getElementById('file_content').textContent = cleanedText; // Display the cleaned text content
        };

        const displayDocxResult = function(result) {
            // Clean the text
            const cleanedText = result.value.replace(/\n\s*\n/g, '\n').trim(); 
            document.getElementById('file_content').textContent = cleanedText; // Display the cleaned text content
            contentType = 'text/plain'; // Set the content type to text
        };

        const displayImageResult = function(base64) {
            // Display the image using a data URL
            document.getElementById('image_content').src = base64;
            document.getElementById('file_content').textContent = ''; // Clear text content

            // Set the content type to image
            contentType = 'image/jpeg';
        };

        const handleError = function(error) {
            console.error('Error converting file:', error);
        };

        if (file.type === "text/plain") {
            const content = e.target.result; // The file content as a string
            displayTextResult(content);
        } else if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || fileName.endsWith('.docx')) {
            const arrayBuffer = e.target.result; // The file content as an array buffer
            mammoth.extractRawText({ arrayBuffer: arrayBuffer })
                   .then(displayDocxResult)
                   .then(updateFadeEffect)
                   .catch(handleError);
        } else if (file.type === "image/jpeg" || fileName.endsWith('.jpg') || fileName.endsWith('.jpeg')) {
            const base64Image = `data:image/jpeg;base64,${btoa(new Uint8Array(e.target.result).reduce((data, byte) => data + String.fromCharCode(byte), ''))}`;
            displayImageResult(base64Image);
        } else if (file.type === 'application/pdf' || fileName.endsWith('.pdf')) {
            //console.log('PDF file:', e.target.result);
            const typedarray = new Uint8Array(e.target.result);
            //console.log('Typed array:', typedarray);
            pdfjsLib.getDocument(typedarray).promise.then(pdf => {
                //console.log('PDF:', pdf);
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

        } else {
            alert('Unsupported file format. Please upload a text or DOCX file.');
        };

    };

    // Define the onerror event to catch any error during reading
    reader.onerror = function(e) {
        console.error('Error reading file:', e.target.error);
    };

    // Read the file content based on its type
    if (file.type === "text/plain") {
        fileNameDisplay.textContent = fileName;
        reader.readAsText(file, 'UTF-8'); // Read file as text
    } else if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || fileName.endsWith('.docx')) {
        fileNameDisplay.textContent = fileName;
        reader.readAsArrayBuffer(file); // Read file as array buffer
    } else if (file.type === "image/jpeg" || fileName.endsWith('.jpg') || fileName.endsWith('.jpeg') || file.type === 'application/pdf' || fileName.endsWith('.pdf')) {
        fileNameDisplay.textContent = fileName;
        reader.readAsArrayBuffer(file); // Read file as array buffer
    } else {
        alert('Unsupported file format. Please upload a text or DOCX file.');
    }

});

const updateFadeEffect = () => {
    const textArea = document.getElementById('file_content');
    const container = document.getElementById('file_content_area');
    const fadeEffect = document.getElementById('fade-effect');

    if (textArea.scrollHeight > container.clientHeight) {
        fadeEffect.style.display = 'block';
    } else {
        fadeEffect.style.display = 'none';
    }
};


