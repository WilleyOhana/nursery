const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const plantsRouter = require('./routes/api/plants');

const app = express();

const PORT = 3001 || process.env.PORT;

// Send React app, use CORS
app.use(express.static(path.join(__dirname, "..", "react-nursery-database", "build")));
app.use(cors());

app.use("/plants", plantsRouter);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}.`)
})