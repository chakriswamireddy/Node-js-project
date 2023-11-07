

const express = require('express');
const router = express.Router();
const { getDB } = require('../database');





router.get('/:id', async (req, res) => {
    try {
      const db = getDB();
      const userId = parseInt(req.params.id)  ; 
  
      const usersCollection = db.collection('users');
  
      
      const user = await usersCollection.findOne({ id: userId });
  
      if (!user) {
  
        console.log(user)
        res.status(404).json({ error: 'User not found' });
        return;
      }
  
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
  
  
  
  
  router.put('/:id', async (req, res) => {
    try {
      const db = getDB();
      const userId = parseInt(req.params.id); 
  
      const usersCollection = db.collection('users');
  
      const updatedUserData = req.body;
  

      const result = await usersCollection.updateOne(
        { id: userId }, 
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
  






router.delete('/:id', async (req, res) => {
  try {
    const db = getDB();
    const userId = parseInt(req.params.id); 

    const usersCollection = db.collection('users');

    
    const result = await usersCollection.deleteOne({ id: userId }); 

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

module.exports = router;



  module.exports = router;