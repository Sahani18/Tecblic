const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const bookRoute = require("./route/books");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect(process.env.DATABASE, {
    autoIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch(() => {
    console.log("OOPSS !! SOMETHING WENT WRONG");
  });

//middlewares
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

//port
const port = process.env.PORT || 8000;

app.use("/api", bookRoute);

app.listen(port, () => console.log(`Server is up & running at ${port}`));
