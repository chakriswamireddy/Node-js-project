const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

const rawData = fs.readFileSync('db.json');
const data = JSON.parse(rawData);


app.get('/', (req, res) => {
  res.json(data);
});


app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});
