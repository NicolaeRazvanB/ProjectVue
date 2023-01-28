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
          res.json("Expired token");
        } else {
          res.json("Decoding failed!");
        }
      } else {
        next();
      }
    });
  } else {
    res.json("No token found!");
  }
};

//POST WINE TO A WINERY
router.post("/wineries/wines/:id", async (req, res) => {
  let wine = {
    name: req.body.name,
    type: req.body.type,
    variety: req.body.variety,
    color: req.body.color,
  };

  let response = await db
    .collection("wineries")
    .doc(req.params.id)
    .collection("wines")
    .add(wine);

  res.json(response);
});

//GET ALL WINES OF A WINERY
router.get("/wineries/wines/:id", async (req, res) => {
  const response = await db
    .collection("wineries")
    .doc(req.params.id)
    .collection("wines")
    .get();
  let wines = [];
  response.forEach((doc) => {
    let wine = {
      id: doc.id,
      name: doc.data().name,
      type: doc.data().type,
      variety: doc.data().variety,
      color: doc.data().color,
    };

    wines.push(wine);
  });
  res.json(wines);
});

//PUT WINE
router.put(
  "/wineries/wines/:id/:wineId",
  checkAuthorization,
  async (req, res) => {
    let wine = {
      name: req.body.name,
      type: req.body.type,
      variety: req.body.variety,
      color: req.body.color,
    };

    let response = await db
      .collection("wineries")
      .doc(req.params.id)
      .collection("wines")
      .doc(req.params.wineId)
      .update(wine);

    res.json(response);
  }
);

//DELETE WINE
router.delete(
  "/wineries/wines/:id/:wineId",
  checkAuthorization,
  async (req, res) => {
    let response = await db
      .collection("wineries")
      .doc(req.params.id)
      .collection("wines")
      .doc(req.params.wineId)
      .delete();

    res.json("Delete succesfull");
  }
);

module.exports = router;
