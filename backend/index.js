const express = require('express');
const app = express();
const cors = require("cors");

const mongoose = require('mongoose');
const port = process.env.port || 5000;
require('dotenv').config()

// MIDDLEWARE
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}))

// ROUTES
const bookRoutes = require('./src/books/book.route')
app.use("/api/books", bookRoutes )

async function main() {
    await mongoose.connect(process.env.DB_URL);
    app.use("/", (req, res) => {
      res.send("Fully Booked Server is running!")
    });    
}

main().then(() => console.log("Mongodb connected successfully!"))
      .catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Fully Booked app listening on port ${port}`)
})



