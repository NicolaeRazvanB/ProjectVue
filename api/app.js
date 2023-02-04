const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const logger = require("morgan");
const db = require("./db");
const secret = "dungeonsanddragons";
const { generateWineries, generateWines } = require("../api/utils");
const wineryRouter = require("../api/routes/winery");
const wineRouter = require("../api/routes/wine");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(logger("dev"));

app.use("/", wineryRouter);
app.use("/", wineRouter);

app.use((error, request, response, next) => {
  console.error(`[ERROR]: ${error}`);
  response.status(500).json(error);
});

//REGISTER USER
app.post("/register", async (req, res) => {
  let data = req.body;
  let isEmail = false;
  const userRef = db.collection("users");
  const snapshot = await userRef.where("email", "==", data.email).get();
  if (!snapshot.empty) {
    isEmail = true;
  }

  if (isEmail) {
    res.send("User already exists");
  } else {
    bcrypt.hash(data.password, saltRounds).then(async function (hash) {
      data.password = hash;
      const user = await db.collection("users").add(data);
      res.send("Register OK");
    });
  }
});

//LOGIN USER
app.post("/login", async (req, res) => {
  let data = req.body;
  let emailFound = false;
  const usersRef = db.collection("users");
  const snapshot = await usersRef.where("email", "==", data.email).get();
  if (snapshot.empty) {
    let response = {};
    response.message = "Email not found";
    res.json(response);
  } else {
    emailFound = true;
    snapshot.forEach((doc) => {
      bcrypt
        .compare(data.password, doc.data().password)
        .then(async function (result) {
          if (result) {
            let token = jwt.sign(
              {
                email: doc.data().email,
              },
              secret,
              { expiresIn: "7 days" }
            );
            let response = {};
            response.token = token;
            response.message = "Acces granted";
            res.json(response);
          } else {
            let response = {};
            response.message = "Invalid password";
            res.json(response);
          }
        });
    });
  }
});

//POPULATE DB WINERIES
app.get("/populateWineries", async (req, res) => {
  let wineryMockList = generateWineries();
  wineryMockList.forEach(async (winery) => {
    await db.collection("wineries").add(winery);
  });

  res.send("Populate ok");
});

//POPULATE DB WINES
app.get("/populateWines", async (req, res) => {
  let wineries = await db.collection("wineries").get();
  wineries.forEach((winery) => {
    let winesList = generateWines();
    winesList.forEach(async (wine) => {
      await db
        .collection("wineries")
        .doc(winery.id)
        .collection("wines")
        .add(wine);
    });
  });
  res.send("Populate ok");
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}!`);
});
