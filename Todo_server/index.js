const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const todosRouter = require('./routes/todos')

app.use(cors()); 
app.use(bodyParser.json()); 

app.use('/',todosRouter);

const { connectToDatabase } = require('./database');
connectToDatabase();




const port = process.env.PORT || 8000; // Port number for your server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

