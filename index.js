const express = require("express")
const route = require("./src/route/route")
const app = express()
app.use(express.json())
require('dotenv').config({path:"./.env"});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();  
});

app.use("/", route)
app.listen(process.env.PORT || 3001, () => {
  console.log("server running on port "+`${process.env.PORT}` || 3001)
})