const mariadb = require('mariadb');
const { v4: uuidv4 } = require('uuid');

var pool = mariadb.createPool({
    host: '192.168.4.29',
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
        console.log(error);
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
        console.log(error);
        callback(true);
        return;
    }
}

module.exports = {
    getAllPlants,
    addNewPlant
};