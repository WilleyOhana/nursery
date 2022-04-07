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
// Requires a plant name, a quantity, a description, and who it was added by in the request params
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

// Delete a plant from the database
// Requires a plantID to be sent in the request params
router.delete('/:plantID', (req, res, next) => {
    console.log('API request to delete a plant');

    const plantID = req.params.plantID;

    db.deletePlant(plantID, (error, results) => {
        if(error) {
            res.status(500).send('Server Error');
            return;
        }

        res.send(results);
    })
})

module.exports = router;