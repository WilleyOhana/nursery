const express = require('express');
const multer = require('multer');
const db = require('../../database');
const { v4: uuidv4 } = require('uuid');
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Get all plants
router.get('/', (req, res, next) => {
    console.log('API request for all plants')
    
    db.getAllPlants((error, results) => {
        if(error) {
            res.status(500).send('Server Error');
            return;
        }

        res.status(200).send(results);
    })
});


const upload = multer();
const pipeline = promisify(require('stream').pipeline);
// Add a new plant to database
// Requires a plant name, a quantity, a description, and who it was added by in the request params
router.post('/add-plant', upload.single('picture'), async (req, res, next) => {
    console.log('API request to add a new plant');

    const { file, body: { name, quantity, description }} = req;

    if(file.detectedFileExtension !== ".jpg" && file.detectedFileExtension !== ".png") {
        next(new Error("Invalid File Type"));
        return;
    }

    const fileName = name + uuidv4() + file.detectedFileExtension;
    await pipeline(file.stream, fs.createWriteStream(path.join(__dirname, "..", "..", "images", fileName)));
    
    res.send('File uploaded as ' + fileName);

    const newPlant = {
        name: name,
        quantity: quantity,
        description: description,
        addedBy: "Marinn Carpenter"
    }

    // Add plant to MariaDB
    db.addNewPlant(newPlant, (error, results) => {
        if(error) {
            res.status(500).send('Server Error');
            return;
        }
        
        res.status(200).send("Plant successfully added");
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

        res.status(200).send('Plant successfully deleted');
    })
})

module.exports = router;