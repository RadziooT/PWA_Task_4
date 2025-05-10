let preparedData = [];
let chart;

async function fetchData() {
    try {
        document.getElementById('no-connection').style.display = 'none'
        document.getElementById('chartWrapper').style.display = 'block'
        const response = await fetch('https://api.sampleapis.com/bitcoin/historical_prices');
        const data = await response.json();
        console.log(data)
        preparedData = data.map(entry => ({
            ...entry,
            Date: new Date(entry.Date)
        })).sort((a, b) => a.Date - b.Date);
        renderChart(preparedData);
    } catch (err) {
        document.getElementById('chartWrapper').style.display = 'none'
        document.getElementById('no-connection').style.display = 'block'
    }
}

function renderChart(data) {
    const labels = data.map(d => d.Date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' }));
    const prices = data.map(d => d.Price);

    if (chart) chart.destroy();

    const ctx = document.getElementById('bitcoinChart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [{
                label: '',
                data: prices,
                borderColor: 'orange',
                tension: 0.2,
                fill: false,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            const index = context.dataIndex;
                            const d = data[index];
                            return [
                                `Price: $${d.Price.toLocaleString()}`,
                                `Change: ${d.ChangePercentFromLastMonth}%`,
                                `Volume: ${d.Volume}`
                            ];
                        }
                    }
                },
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Price (USD)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Month + Year'
                    }
                }
            }
        }
    });
}

document.getElementById('rangeForm').addEventListener('submit', e => {
    e.preventDefault();
    const start = new Date(document.getElementById('startDate').value);
    const end = new Date(document.getElementById('endDate').value);

    const filteredData = preparedData.filter(d => d.Date >= start && d.Date <= end);
    renderChart(filteredData);
});

document.addEventListener('DOMContentLoaded', fetchData);