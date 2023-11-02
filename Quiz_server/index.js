const express = require('express');
const fs = require('fs');

const app = express();

const cors = require('cors');
app.use(cors());

const port = 8000;

const rawData = fs.readFileSync('quizdata.json');
const data = JSON.parse(rawData);


app.get('/', (req, res) => {
  res.json(data);
});


app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});


module.exports = app;
