const express = require('express')
const app = express();
const port = 8000;

const weatherRouter = require('./routes/weather')

app.use(express.json());

app.use('/getWeather',weatherRouter)

app.get('/', (req, res) => {
  res.send('Hello, World!');
});




app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});