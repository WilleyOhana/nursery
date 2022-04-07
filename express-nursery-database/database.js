const mariadb = require('mariadb');
const { v4: uuidv4 } = require('uuid');

var pool = mariadb.createPool({
    host: process.env.IP_ADDRESS,
    user: process.env.DB_USER,
    password: '',
    database: "nursery",
    connectionLimit: 10
});


// Return list of all plants
const getAllPlants = async (callback) => {
    const query = "SELECT * FROM plants";

    try {
        const connection = await pool.getConnection();

        const data = await connection.query(query);

        if(!data) {
            callback(true);
            return;
        }

        callback(false, data);

    } catch (error) {
        console.error(error);
        callback(true);
        return;
    }
}

// Add a new plant
const addNewPlant = async (plant, callback) => {
    const newID = uuidv4();
    const query = `INSERT INTO plants VALUES ("${newID}", "${plant.name}", ${plant.quantity}, "${plant.description}", "${plant.addedBy}")`;

    try {
        const connection = await pool.getConnection();

        const response = await connection.query(query);

        callback(false, response);

    } catch (error) {
        console.error(error);
        callback(true);
        return;
    }
}

// Delete a plant
const deletePlant = async (id, callback) => {

    const query = `DELETE FROM plants WHERE id="${id}"`;

    try {
        const connection = await pool.getConnection();

        const response = await connection.query(query);

        callback(false, response);
    } catch (error) {
        console.error(error);
        callback(true);
        return;
    }
}

module.exports = {
    getAllPlants,
    addNewPlant,
    deletePlant
};