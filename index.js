const express = require('express');
const app = express();

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// GetGenerations
apiRouter.get('/generation', (_req, res) => {
  res.send(generations);
});

// SubmitGeneration
apiRouter.post('/generation', (req, res) => {
  generations = updateGenerations(req.body, generations);
  res.send(generations);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

let generations = [ {
    "name": "Thomas",
    "job": "Manager",
    "download": "Download"
  },
  {
    "name": "Mark",
    "job": "Salesman",  
    "download": "Download"
  },
  {
    "name": "Seth",
    "job": "Receptionist",
    "download": "Download"
  },
  {
    "name": "Donald",
    "job": "Driver",
    "download": "Download"
  },
  {
    "name": "Robert",
    "job": "Secretary",
    "download": "Download"
  }];

function updateGenerations(newGenerations, generations) {

//   let found = false;
//   for (const [i, prevScore] of scores.entries()) {
//     if (newScore.score > prevScore.score) {
//       scores.splice(i, 0, newScore);
//       found = true;
//       break;
//     }
//   }

  if (!found) {
    generations.push(newGenerations);
  }

//   if (scores.length > 10) {
//     scores.length = 10;
//   }

  return generations;
}

