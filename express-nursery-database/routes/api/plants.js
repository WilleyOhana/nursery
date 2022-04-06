const express = require('express');
const db = require('../../database');

const router = express.Router();


// Get all plants
router.get('/', (req, res, next) => {
    console.log('API request for all plants')
    
    db.getAllPlants((error, results) => {
        if(error) {
            res.status(500).send('Server Error');
            return;
        }

        res.send(results);
    })
});

// Add a new plant to database
router.post('/:plantName/:quantity/:description/:addedBy', (req, res, next) => {
    console.log('API request to add a new plant');

    const newPlant = {
        name: req.params.plantName,
        quantity: req.params.quantity,
        description: req.params.description,
        addedBy: req.params.addedBy
    }

    db.addNewPlant(newPlant, (error, results) => {
        if(error) {
            res.status(500).send('Server Error');
            return;
        }

        res.send(results);
    })
}) 

module.exports = router;