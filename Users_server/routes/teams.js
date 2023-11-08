const express = require('express')
const router = express.Router()
const { getDB } = require('../database');
const { get } = require('mongoose');



router.post('/', async (req, res) => {
    
    try {
        const db = getDB();
        console.log(db)

        const newTeam = req.body;


        const teamscollection =  db.collection('teams')


        const teams = [];

        for (let user of newTeam) {
            let found = false;
        
            teams.forEach(element => {
                if (element.domain === user.domain) {
                    if (element.available === user.available) {
                        found = true;
                    }
                }
            });
        
            if (!found) {
                teams.push(user);
            }
        }
        


        const teamLength = await teamscollection.find({}).toArray();

        const result = await teamscollection.insertOne({
                    'id': parseInt(teamLength.length+1),
                    'team': teams
        });

        if (result.acknowledged) {
            res.status(201).json({ message: 'User created successfully' });
        }
        else {
    
            res.status(500).json({ error: 'User creation failed' });
        }
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const db = getDB();
        const userId = parseInt(req.params.id);

        const teamsCollection = db.collection('teams');

        const team = await teamsCollection.findOne({ id: userId });

        if (!team) {
            res.status(404).json({ error: 'Team not found' });
            return;
        }

        res.json(team);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




module.exports = router;