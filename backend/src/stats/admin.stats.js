const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Order = require('../orders/order.model');
const Book = require('../books/book.model');

router.get("/", async (req, res) => {
    try {
        // 1. Total number of orders
        const totalOrders = await Order.countDocuments();

        // 2. Total sales (sum of all totalPrice from orders)
        const totalSales = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: "$totalPrice" },
                }
            }
        ]);

        // 3. Hot books statistics
        const hotBooksCount = await Book.aggregate([
            { $match: { tag: "Hot" } },
            { $count: "hotBooksCount" }
        ]);

        const hotBooks = hotBooksCount.length > 0 ? hotBooksCount[0].hotBooksCount : 0;

        // 4. Total number of books
        const totalBooks = await Book.countDocuments();

        // 5. Monthly sales (group by month and sum total sales for each month)
        const monthlySales = await Order.aggregate([
            {
                $group: {
                    _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
                    totalSales: { $sum: "$totalPrice" },
                    totalOrders: { $sum: 1 }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]);

        // Add padding for missing months if necessary
        const paddedMonthlySales = [];
        const currentYear = new Date().getFullYear();

        for (let year = currentYear - 1; year <= currentYear; year++) {
            for (let month = 1; month <= 12; month++) {
                const data = monthlySales.find(sale => sale._id.year === year && sale._id.month === month);
                paddedMonthlySales.push({
                    year,
                    month,
                    totalSales: data ? data.totalSales : 0,
                    totalOrders: data ? data.totalOrders : 0
                });
            }
        }

        // 6. Monthly Orders Count (count orders per month)
        const monthlyOrders = await Order.aggregate([
            {
                $group: {
                    _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
                    totalOrders: { $sum: 1 }  // Count each order
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]);

        // Pad monthlyOrders for missing months
        const paddedMonthlyOrders = [];
        for (let year = currentYear - 1; year <= currentYear; year++) {
            for (let month = 1; month <= 12; month++) {
                const data = monthlyOrders.find(order => order._id.year === year && order._id.month === month);
                paddedMonthlyOrders.push({
                    year,
                    month,
                    totalOrders: data ? data.totalOrders : 0  // Use totalOrders instead of totalRevenue
                });
            }
        }

        // Return admin stats, including paddedMonthlyOrders for OrdersChart
        res.status(200).json({
            totalOrders,
            totalSales: totalSales[0]?.totalSales || 0,
            hotBooks,
            totalBooks,
            monthlySales: paddedMonthlySales,
            monthlyOrders: paddedMonthlyOrders  // Include monthlyOrders for the OrdersChart
        });


    } catch (error) {
        console.error("Error fetching admin stats:", error);
        res.status(500).json({ message: "Failed to fetch admin stats" });
    }


    
});

module.exports = router;
