const express = require('express');
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
const port = process.env.port || 5000;
require('dotenv').config()

// MIDDLEWARE
app.use(express.json());

app.use((err, req, res, next)=>  {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error!'
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message
  })
})

app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}))




// ROUTES
const bookRoutes = require('./src/books/book.route');
const orderRoutes = require('./src/orders/order.route');
const userRoutes = require('./src/users/user.route');
const adminRoutes = require('./src/stats/admin.stats')

app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);

// ROOT ROUTE
app.use("/", (req, res) => {
  res.send("Fully Booked Server is running!");
});

async function main() {
    await mongoose.connect(process.env.DB_URL);
    console.log("Mongodb connected successfully!")
}

main().catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Fully Booked app listening on port ${port}`);
});
