const express = require('express');
const router = express.Router();
// const fetch = require('node-fetch'); // Make sure to install the 'node-fetch' package

router.post('/', async (req, res) => {
    try {
        const cities = req.body.cities;
        const apiKey = '4b59f4e5a7f4e16614aa3ff48c539709';
        const weatherList = {};

        for (let cityName of cities) {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
            const data = await response.json();
            if (data.main) {
                const tempString = `${Math.round(data.main.temp)}C`
                weatherList[cityName] = tempString;
            }
        }

        res.json({ weather: weatherList });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
