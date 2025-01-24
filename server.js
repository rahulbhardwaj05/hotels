const express = require("express");
const app = express();
const db = require("./db");

const person = require("./models/person");
const menu = require("./models/menu");

const bodyParser = require("body-parser");
const { Error } = require("mongoose");
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Hello, welcome to my best hotels");
});




// import the router file
const personRoutes = require('./Routes/personRoutes')
app.use('/person', personRoutes)


const menuItem = require('./Routes/menuRoutes')
app.use('/menu',menuItem)

app.listen(3000, () => {
  console.log("listening on port 3000......");
});
