// Setup empty JS object to act as endpoint for all routes

projectData = {};

// Express to run server and routes

const express = require("express");

// Start up an instance of app

const app = express();

/* Dependencies */

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

const port = 3000;

// Spin up the server
// Callback to debug

const server = app.listen(port, () => {
  console.log(`Server running on: ${port}`);
});

// Initialize all route with a callback function
app.get("/all", sendData);

// Callback function to complete GET '/all'
function sendData(request, response) {
  response.send(projectData);
}

// Post Route

app.post("/add", addEntry);

function addEntry(request, response) {
  data = request.body;

  if (data) {
    (projectData.temperature = data.temperature),
      (projectData.feelings = data.feelings),
      (projectData.date = data.date);
    response.send({ status: 200 });
  } else {
    response.send({ status: 500 });
  }
}
