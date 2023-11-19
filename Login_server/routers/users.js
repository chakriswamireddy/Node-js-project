const express = require('express');
const router = express.Router();
const { getDB } = require('../database');
const { get } = require('mongoose');


// login the user

router.get('/', async (req, res) => {
    try {
      const db = getDB();
      console.log(db)

      const usersCollection = db.collection('loginusers');

      const credentials = res.body;
      
      const email = req.query.email || ''
      const password = req.query.password || ''

      const query ={}

      if(email && password) {
        
        query.email = {$regex: `^${email}$`,$options:"i"}
        query.password = {$regex: `^${password}$`, $options:"i"};
      }


  
      const users = await usersCollection.find(query).toArray();
  
  
      res.json({
        users,
    });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


//updating user

router.put('/:email', async (req, res) => {
    try {
      const db = getDB();
      const userEmail = req.params.email; 

  
      const usersCollection = db.collection('loginusers');
  
      const updatedUserData = req.body;
  

      const result = await usersCollection.updateOne(
        { email: userEmail }, 
        { $set: updatedUserData } 
      );
  
      if (result.acknowledged) {
        res.json({ message: 'User updated successfully' });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  //deleting user

  router.delete('/:email', async (req, res) => {
    try {
      const db = getDB();
      const userEmail = req.params.email; 
  
      const usersCollection = db.collection('loginusers');
  
      
      const result = await usersCollection.deleteOne({ email:userEmail }); 
  
      if (result.deletedCount === 1) {
          
        res.json({ message: 'User deleted successfully' });
      } else {
          console.log(result.deletedCount)
        res.status(404).json({ error: 'User not found' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });




// creating user

router.post('/', async (req, res) => {
    try {
      const db = getDB();
      const usersCollection = db.collection('loginusers');
      const newUserData = req.body;
  
      const result = await usersCollection.insertOne(newUserData);
  
      if (result.acknowledged) {
  
        res.status(201).json({ message: 'User created successfully' });
  
      } else {
        // console.log(result.insertedCount)
        res.status(500).json({ error: 'User creation failed' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });




  module.exports = router;



