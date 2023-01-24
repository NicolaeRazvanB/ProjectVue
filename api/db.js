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

const db = getFirestore();
module.exports = db;
