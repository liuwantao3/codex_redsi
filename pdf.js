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