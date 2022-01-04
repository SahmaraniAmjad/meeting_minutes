const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const sql = require("./app/models/db.js");
var User = require("./app/models/User.model.js");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.json({ message: "server is running"});
})

require("./app/routes/user.routes.js")(app);

var http = require('http').createServer(app);

const port = process.env.PORT || 8081;

http.listen(port, () => {
  console.log(`app is running on port ${port}`);
});

module.exports.httpObject = http;