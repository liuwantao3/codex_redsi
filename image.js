// Description: This file contains the functions to handle image analysis.
import renderMathInElement from "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.mjs";
import { renderMarkdown } from './markdown.js';
//import { parse, HtmlGenerator } from 'latex.js';

export async function analyzeImg(url, comments) {

    const token = localStorage.getItem('jwtToken');

    let fileContent = document.getElementById('file_content').textContent;

    // Show loading indicator
    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.style.display = 'flex';

    document.getElementById('analysis_result').innerHTML = '';
    document.getElementById('chartsContainer').innerHTML = '';
    document.getElementById('justifications').innerHTML = '';

    const loadingDots = document.getElementById('loadingDots');
    let dotCount = 0;
    const dotInterval = setInterval(() => {
        loadingDots.textContent = '.'.repeat((dotCount++ % 4));
    }, 500);

    try {
        const response = await fetch("https://openaiserverlwt.azurewebsites.net/image",{
        //const response = await fetch('http://localhost:8080/image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                prompt: {
                    type: "image_url",
                    comments: comments,
                    image_url: url,
                }
            })
        });

        if (response.status === 401 || response.status === 403) {
            const loginContainer = document.getElementById("login_container");
            loginContainer.style.display = "block";
      
            //chatContainer.style.display = 'none';
      
            //messageContainer.innerHTML = ''; //clean the previous chat contents and token
            localStorage.removeItem('jwtToken');
        } else {

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            loadingIndicator.style.display = 'none';
            const data = await response.json();
            const parsedData = data.bot.trim() // trims any trailing spaces/'\n' 
    
            document.getElementById('analysis_result').innerHTML = parsedData;
            
            renderMathInElement(document.getElementById('analysis_result'), {
                delimiters: [
                    {left: '$$', right: '$$', display: true},
                    {left: '$', right: '$', display: false},
                    {left: '\\(', right: '\\)', display: false},
                    {left: '\\[', right: '\\]', display: true}
                    // {left: '\\begin{equation}', right: '\\end{equation}', display: true},
                    // {left: '\\begin{equation*}', right: '\\end{equation*}', display: true}
                ],
                ignoredTags: [
                    'script', 'noscript', 'style', 'textarea', 'annotation', 'annotation-xml'
                ],
                throwOnError : false,
                output : 'mathml'
              });

        }
    
    } catch (error) {
        console.error('Error:', error);
    }
}