const express = require("express");
const cors = require("cors");
const Transaction = require("./models/transaction");
const {connectToMongoDB} = require('./models/connect')
// const mongoose = require("mongoose");
require("dotenv").config();

// lF8uy4IXAmF30dZM

connectToMongoDB('mongodb://localhost:27017/money-tracker').then(()=>{
    console.log("mongo DB connected")
})

const app = express();
app.use(express.json());
app.use(cors());

app.get("/api/test", (req, res) => {
  res.send({ body: "testing successfull" });
});

app.post("/api/transaction", async (req, res) => {
//   await mongoose.connect(process.env.MONGO_URL);
  const { name, price, description, datetime } = req.body;
  const transaction = await Transaction.create({
    name,
    price,
    description,
    datetime,
  });
  res.json(transaction);
});

app.get("/api/transaction", async (req, res) => {
//   await mongoose.connect(process.env.MONGO_URL);
//   const { name, price, description, datetime } = req.body;
  const transactions = await Transaction.find()
  res.json(transactions);
});

app.listen(3001, () => {
  console.log("server is listing on port 3001");
});
