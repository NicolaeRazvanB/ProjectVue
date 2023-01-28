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

//POST WINERY
router.post("/wineries", checkAuthorization, async (req, res) => {
  let winery = {
    name: req.body.name,
    location: req.body.location,
    foundingYear: req.body.foundingYear,
  };
  await db.collection("wineries").add(winery);
  res.json(winery);
});

//GET ALL WINERIES
router.get("/wineries", async (req, res) => {
  let wineries = [];
  const result = await db.collection("wineries").get();

  result.forEach((doc) => {
    let winery = {
      id: doc.id,
      name: doc.data().name,
      location: doc.data().location,
      foundingYear: doc.data().foundingYear,
    };
    wineries.push(winery);
  });
  res.json(wineries);
});

//GET WINERY BY ID
router.get("/wineries/:id", async (req, res) => {
  let doc = await db.collection("wineries").doc(req.params.id).get();
  let winery = {
    id: doc.id,
    name: doc.data().name,
    location: doc.data().location,
    foundingYear: doc.data().foundingYear,
  };
  res.json(winery);
});

//PUT WINERY
router.put("/wineries/:id", checkAuthorization, async (req, res) => {
  const response = await db
    .collection("wineries")
    .doc(req.params.id)
    .update(req.body);

  res.json("Edit successfull");
});

//DELETE WINERY AND ASOCIATED WINES
router.delete("/wineries/:id", checkAuthorization, async (req, res) => {
  const wineries = await db
    .collection("wineries")
    .doc(req.params.id)
    .collection("wines")
    .listDocuments()
    .then((x) => {
      x.map((x) => {
        x.delete();
      });
    });
  let response = await db.collection("wineries").doc(req.params.id).delete();
  res.json("Winery deleted");
});
module.exports = router;
