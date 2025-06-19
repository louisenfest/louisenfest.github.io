// backup-firebase.js
const fs = require("fs");
const admin = require("firebase-admin");

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function backupFirestore() {
  const collections = await db.listCollections();
  const backupData = {};

  for (const col of collections) {
    if (col.id === "evaluation") continue;

    const snapshot = await col.get();
    backupData[col.id] = {};
    snapshot.forEach(doc => {
      backupData[col.id][doc.id] = doc.data();
    });
  }

  fs.writeFileSync("backup.json", JSON.stringify(backupData, null, 2));
  console.log("✅ Backup gespeichert: backup.json");
}

backupFirestore().catch(console.error);
