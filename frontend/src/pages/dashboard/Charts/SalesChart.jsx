// SalesChart.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SalesChart = ({ monthlySales }) => {
    // Format month labels as "Jan 2024", "Feb 2024", etc.
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const labels = monthlySales.map(sale => `${monthNames[sale.month - 1]} ${sale.year}`);

    // Prepare data for Chart.js
    const chartData = {
        labels: labels,  // Use formatted month-year labels
        datasets: [
            {
                label: 'Monthly Sales (₱)',
                data: monthlySales.map(sale => sale.totalSales),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
            },
        },
    };

    return (
        <div className="w-full max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">Monthly Sales</h2>
            <Line data={chartData} options={options} />
        </div>
    
    )
    
};

export default SalesChart;
