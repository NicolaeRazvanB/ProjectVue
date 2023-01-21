const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const logger = require("morgan"); //importing a HTTP logger

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(logger("dev")); //using the HTTP logger library

app.listen(port, () => {
  console.log(`Backend listening on port ${port}!`);
});
