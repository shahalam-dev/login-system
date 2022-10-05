const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();

const port = process.env.PORT || 5050;

const login = require("./routes/login_system.route");

//------ middleware ------------//
app.use(cors());
app.use(express.json());
//------------------------------//

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xw0zer9.mongodb.net/login-system`;
mongoose.connect(uri, () => {
  console.log("DB connected");
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

// all api routes
app.use("/user", login);

app.listen(port, () => {
  console.log(`LogIn system server listening on port ${port}`);
});
