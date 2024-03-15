// const fs = require("fs");
const express = require("express");
const morgan = require("morgan");


const app = express();
const PORT = 8000;

const customRouter =  require("./routes/customerRoutes")

// middleware untuk membaca json dari request body
app.use(express.json());

// middleware dari third party
app.use(morgan('dev'));

// middleware kita sendiri
app.use((req, res, next) => {
  console.log("Hellow FSW 1, ini middleware kita sendiri....");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const defaultRouter = (req, res, next) => {
  res.send("<p>halo my friend</p>");
};


// // localhost:8000
// app.get("/", defaultRouter);

app.use("/api/v1/customers", customRouter);

module.exports = app;