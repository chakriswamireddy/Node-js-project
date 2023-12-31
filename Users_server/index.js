const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


const usersRouter = require('./routes/users');
const userByIdRouter = require('./routes/userById')
const teamsRouter = require('./routes/teams')


const app = express();
const port = process.env.PORT || 8000;

const { connectToDatabase } = require('./database');
connectToDatabase();


app.use(cors()); 
app.use(bodyParser.json()); 


app.use('/api/users', usersRouter);

app.use('/api/users', userByIdRouter );

app.use('/api/team',teamsRouter)





app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;