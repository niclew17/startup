const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');
const express = require('express');
const app = express();

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// Connect to the database cluster
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const collection = db.collection('users');

// Test that you can connect to the database
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

//Adds a new user, given a username and password
// collection.insertOne({username:'', password:'', generations:[]});

// GetGenerations
apiRouter.get('/generation', (_req, res) => {
  collection.findOne({username:'', password:''}).then(user=>{
    res.send(user.generations);
  }).catch((err)=>{
    console.log(err);
    res.status(500).send("Error")});
});

// SubmitGeneration
apiRouter.post('/generation', (req, res) => {
  updateGenerations(req.body).finally(res.send());
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

async function updateGenerations(newGeneration) {
  await collection.updateOne({username:'', password:''},{
    $push: {
      generations: { ...newGeneration }
    }
  });
}

