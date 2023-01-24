const router = require("express").Router();
const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");
const secret = "dungeonsanddragons";

checkAuthorization = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    jwt.verify(req.token, secret, (err, decoded) => {
      if (err) {
        if (err.expiredAt) {
          res.json({ message: "Expired token" });
        } else {
          res.json({ message: "Decoding failed!" });
        }
      } else {
        next();
      }
    });
  } else {
    res.json({ message: "No token found!" });
  }
};

//POST WINERY
router.post("/wineries", checkAuthorization, async (req, res) => {
  let winery = {};
  winery.name = req.body.name;
  winery.location = req.body.location;
  winery.foundingYear = req.body.foundingYear;
  await db.collection("wineries").add(winery);
  res.json(winery);
});

module.exports = router;
