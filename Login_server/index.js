const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const usersRouter = require('./routers/users')

app.use(cors()); 
app.use(bodyParser.json()); 

app.use('/',usersRouter);

const { connectToDatabase } = require('./database');
connectToDatabase();


// app.get('/', (req, res) => {
//   res.send('Hello, this is an Express server!');
// });

const port = process.env.PORT || 8000; // Port number for your server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

