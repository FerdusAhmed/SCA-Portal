const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.MONGODB_URI;
//  DNS issue solution for MongoDB Atlas
const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

const connectDB = async function run() {
  await client.connect();
  db = client.db("nexus-school");
  let feedbackCollection = db.collection("studentFeedback");

  await feedbackCollection.createIndex(
    { feedbackAt: 1 },
    { expireAfterSeconds: 86400 },
  );

  // NEW: users collection unique index for student_id
  let usersCollection = db.collection("users");
  await usersCollection.createIndex(
    { student_id: 1 },
    { unique: true, sparse: true }
  );

  console.log("Mongodb connected!");
};

// export
const getDB = () => {
  if (!db) throw new Error('Database not connected');
  return db;
};
module.exports = { connectDB, getDB };
