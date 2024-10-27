// src/components/OrdersChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OrdersChart = ({ monthlyOrders }) => {
    const data = {
        labels: monthlyOrders?.map(order => `${order.year}-${order.month.toString().padStart(2, '0')}`) || [],
        datasets: [
            {
                label: 'Total Orders',
                data: monthlyOrders?.map(order => order.totalOrders) || [],
                backgroundColor: 'rgba(54, 162, 235, 0.7)', 
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
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
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="w-full max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">Monthly Orders</h2>
            <Bar data={data} options={options} />
        </div>
    );
};

export default OrdersChart;
