
const express = require('express');
const router = express.Router();
const { getDB } = require('../database');
const { get } = require('mongoose');

router.get('/', async (req, res) => {
  try {
    const db = getDB();
    console.log(db)

    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const skip = (page-1) * limit;


    const usersCollection = db.collection('users');


       const searchName = req.query.name || '' ;

       const available = req.query.available || '' ;
       const gender = req.query.gender || '' 

       const domain = req.query.domain || '';



       const query = {
        $or: [
          { first_name: { $regex: searchName, $options: 'i' } },
          { last_name: { $regex: searchName, $options: 'i' } }
        ],

      };

      if(gender) {
        query.gender = {$regex: `^${gender}$`, $options:"i"};
      }
      if (domain) {
        query.domain = {$regex: `^${domain}$`, $options:'i'}
      }
      if(available) {
        query.available = available === 'true' ;
      }



       const users = await usersCollection.find(query).skip(skip).limit(limit).toArray();

    const totalUsers = await usersCollection.countDocuments();


    res.json({
      users,
      totalUsers,
      page,
      limit,
  });
  } catch (err) {
    console.error(err);
    console.log(getDB())
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/', async (req, res) => {
  try {
    const db = getDB();
    const usersCollection = db.collection('users');
    const newUserData = req.body;

    const result = await usersCollection.insertOne(newUserData);

    if (result.acknowledged) {

      res.status(201).json({ message: 'User created successfully' });

    } else {
      console.log(result.insertedCount)
      res.status(500).json({ error: 'User creation failed' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});









module.exports = router;