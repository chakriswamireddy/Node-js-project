// routes/users.js
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
    // console.log(page);
    // console.log(skip);

    const usersCollection = db.collection('users');



       const searchName = req.query.name || '' ;

       const available = req.query.available || '' ;
       const gender = req.query.gender || '' 

       const domain = req.query.domain || '';



       const query = {
        // $or: [
        //   { first_name: { $regex: searchName, $options: 'i' } },
        //   { last_name: { $regex: searchName, $options: 'i' } }
        // ],

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


   

    const filteredUsers = await usersCollection.find(query).skip(skip).limit(limit).toArray();


    const searchNameLowerCase = searchName.toLowerCase();

    const users = filteredUsers.filter(user => {
      const firstNameLowerCase = user.first_name.toLowerCase();
      const lastNameLowerCase = user.last_name.toLowerCase();
    
      return firstNameLowerCase.includes(searchNameLowerCase) || lastNameLowerCase.includes(searchNameLowerCase);
    });






    const totalUsers = await usersCollection.countDocuments();


    res.json({
      users,
      totalUsers,
      page,
      limit,
  });
  } catch (err) {
    console.error(err);
    // console.log(getDB())
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
      // console.log(result.insertedCount)
      res.status(500).json({ error: 'User creation failed' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




// Add more routes and CRUD operations as needed

// router.get('/:id', async (req, res) => {
//   try {
//     const db = getDB();
//     const userId = parseInt(req.params.id)  ; // Get the user's ID from the URL parameter

//     const usersCollection = db.collection('users');

//     // Query the database to find a user by their ID
//     const user = await usersCollection.findOne({ id: userId });

//     if (!user) {

//       console.log(user)
//       res.status(404).json({ error: 'User not found' });
//       return;
//     }

//     res.json(user);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });



// // routes/users.js


// router.put('/:id', async (req, res) => {
//   try {
//     const db = getDB();
//     const userId = parseInt(req.params.id); // Convert ID to integer

//     const usersCollection = db.collection('users');

//     // Validate and get the updated user data from the request body
//     const updatedUserData = req.body;

//     // Check if the updated user data is valid (you can implement validation logic)

//     // Update the user with the specified ID
//     const result = await usersCollection.updateOne(
//       { id: userId }, // Query to find the user by ID
//       { $set: updatedUserData } // Set the updated data
//     );

//     if (result.modifiedCount === 1) {
//       res.json({ message: 'User updated successfully' });
//     } else {
//       res.status(404).json({ error: 'User not found' });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// module.exports = router;




module.exports = router;