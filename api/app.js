const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const logger = require("morgan");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(logger("dev"));
const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");
const serviceAccount = require("../api/projectvue-f17cb-firebase-adminsdk-isgck-1dd46ef013.json");
initializeApp({
  credential: cert(serviceAccount),
});
const dbFirebase = getFirestore();

//REQUESTS
app.listen(port, () => {
  console.log(`Backend listening on port ${port}!`);
});
