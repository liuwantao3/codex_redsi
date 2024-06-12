import * as mammoth from 'mammoth';
import { renderMarkdown } from './markdown';
import { drawPieChart } from './pie_chart.js';

const MAX_PROMPT_LEN = 34000;

async function uploadFile() {

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
        console.log("Received JSON:", parsedData);
        //document.getElementById('analysis_result').innerHTML = renderMarkdown(parsedData);
        //document.getElementById('analysis_result').innerHTML = data.bot;
        drawPieChart(parsedData);
        console.log('Success:', parsedData);

    } catch (error) {
        console.error('Error:', error);
    }
}

const uploadFileLink = document.getElementById("uploadFile");
const fileSelectorDiv = document.getElementById('file_selector');
const fileInput = document.getElementById('fileInput');
const fileNameDisplay = document.getElementById('fileName');

uploadFileLink.addEventListener("click", async (event) => {
    await uploadFile();
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
        } else {
            alert('Unsupported file format. Please upload a text or DOCX file.');
        }

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
    } else {
        alert('Unsupported file format. Please upload a text or DOCX file.');
    }

});

const updateFadeEffect = () => {
    const textArea = document.getElementById('file_content');
    const container = document.getElementById('file_content_area');
    const fadeEffect = document.getElementById('fade-effect');

    console.log('Scroll height:', textArea.scrollHeight);
    console.log('Client height:', container.clientHeight);
    if (textArea.scrollHeight > container.clientHeight) {
        fadeEffect.style.display = 'block';
    } else {
        fadeEffect.style.display = 'none';
    }
};

