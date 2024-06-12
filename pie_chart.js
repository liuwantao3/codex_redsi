import { Chart, registerables } from 'chart.js';

const backgroundColor = [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)'
                ];
const borderColor = [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)'
        ];

Chart.register(...registerables);

export function drawPieChart(rawData){

    const regex = /```json\s*([\s\S]*?)\s*```/g;
    let match;
    const jsonContents = [];

    while ((match = regex.exec(rawData)) !== null) {
        // match[1] contains the JSON content inside the code block
        jsonContents.push(match[1].trim());
    }

    if (jsonContents.length > 0) {
        try {
            const jsonObject = JSON.parse(jsonContents[0]);
            console.log(jsonObject);
            // // Prepare data for the pie chart
            // const labels = Object.keys(jsonObject.analysis);
            // const dataValues = Object.values(jsonObject.analysis);

            // // Initialize the pie chart
            // const ctx = document.getElementById('myPieChart').getContext('2d');
            // new Chart(ctx, {
            //     type: 'pie',
            //     data: {
            //         labels: labels,
            //         datasets: [{
            //             label: '分析评分',
            //             data: dataValues,
            //             backgroundColor: [
            //                 'rgba(255, 99, 132, 0.2)',
            //                 'rgba(54, 162, 235, 0.2)',
            //                 'rgba(255, 206, 86, 0.2)',
            //                 'rgba(75, 192, 192, 0.2)',
            //                 'rgba(153, 102, 255, 0.2)',
            //                 'rgba(255, 159, 64, 0.2)',
            //                 'rgba(255, 99, 132, 0.2)',
            //                 'rgba(54, 162, 235, 0.2)'
            //             ],
            //             borderColor: [
            //                 'rgba(255, 99, 132, 1)',
            //                 'rgba(54, 162, 235, 1)',
            //                 'rgba(255, 206, 86, 1)',
            //                 'rgba(75, 192, 192, 1)',
            //                 'rgba(153, 102, 255, 1)',
            //                 'rgba(255, 159, 64, 1)',
            //                 'rgba(255, 99, 132, 1)',
            //                 'rgba(54, 162, 235, 1)'
            //             ],
            //             borderWidth: 1
            //         }]
            //     },
            //     options: {
            //         responsive: true
            //     }
            // });

            const totalScore = 16; // Total score for reference

            // Prepare and render individual pie charts
            const chartsContainer = document.getElementById('chartsContainer');
            chartsContainer.innerHTML = ''; // Clear previous charts if any

            let index = 0;
            for (let key in jsonObject.analysis) {
                const value = jsonObject.analysis[key];
                const chartId = `chart-${key}`;

                // Create canvas element for each pie chart
                const chartWrapper = document.createElement('div');
                chartWrapper.classList.add("chart-wrapper");
                if (key === "总体评级") 
                    chartWrapper.innerHTML = `
                        <h3>${key} ${value}级</h3>
                        <canvas id="${chartId}" width="200" height="200"></canvas>
                    `;
                else
                    chartWrapper.innerHTML = `
                        <h4>${key} ${value}级</h4>
                        <canvas id="${chartId}" width="100" height="100"></canvas>
                    `;

                chartsContainer.appendChild(chartWrapper);

                const options = {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            enabled: false,
                            callbacks: {
                                label: function(tooltipItem) {
                                    return 'This is the same message for all segments';
                                }
                            }
                        }
                    },
                    hover: {
                        mode: 'dataset', // 'nearest', 'index', etc.
                        animationDuration: 400, // Duration of the hover animation in milliseconds
                        onHover: function(event, chartElement) {
                            if (chartElement.length) {
                                event.native.target.style.cursor = 'pointer';
                            } else {
                                event.native.target.style.cursor = 'default';
                            }
                        }
                    }
                }

                // Initialize the pie chart for the specific score
                const ctx = document.getElementById(chartId).getContext('2d');
                new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: ['Score'],
                        datasets: [{
                            label: key,
                            data: [value, totalScore - value],
                            backgroundColor: [
                                backgroundColor[index],
                                'rgba(255, 99, 132, 0)'
                            ],
                            borderColor: [
                                borderColor[index],
                                borderColor[index]
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: options
                });

                index++;
            }

            // Populate justifications
            const justificationsDiv = document.getElementById('justifications');
            for (let key in jsonObject.justification) {
                let value = jsonObject.justification[key];
                const para = document.createElement('p');
                para.innerHTML = `<strong>${key}:</strong> ${value}`;
                justificationsDiv.appendChild(para);


            }
        } catch (error) {
            console.error("Invalid JSON content:", error);
        }
    } else {
        console.log("No JSON content found.");
    }
}