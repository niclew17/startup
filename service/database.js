const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');
const { response } = require('express');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('users');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

function getUser(username) {
  return userCollection.findOne({ username: username });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(username, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    username: username,
    password: passwordHash,
    token: uuid.v4(),
    generations: []
  };
  await userCollection.insertOne(user);

  return user;
}

async function fetchChat(token, inData){
  const jsonData = JSON.stringify(inData, null, 2);
  let userMessage = "Please take the following information and compare the Resume with the Job Description and the Job Position, give feedback as to if the candidate would perform well based off of the given information. Here is the information." + jsonData;
  const API_URL = "https://api.openai.com/v1/chat/completions";
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${config.KEY}`,
    },  
    body: JSON.stringify({
      model: "gpt-3.5-turbo-0613",
      messages: [{ role: "user", content: userMessage }],
    }),
  };
  let data;
  try {
    data = await fetch(API_URL, requestOptions).then((res) => res.json());
  } catch(err) { return `We got ${err}`; }
  let chatResponse = data.choices[0].message.content.trim();
  await userCollection.updateOne({ token: token },{
    $push: {
      generations: {  
        "name": inData["Applicant Name"],
        "job": inData["Job Position"],
        "response": chatResponse
      }
    }
  });  
  return chatResponse;
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  fetchChat
};
