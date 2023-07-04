const express = require("express")
const route = require("./src/route/route")
const app = express()
app.use(express.json())
require('dotenv').config({path:"./.env"});
const cors = require('cors');

app.use(cors());

app.use("/", route)
app.listen(process.env.PORT || 3001, () => {
  console.log("server running on port "+`${process.env.PORT}` || 3001)
})