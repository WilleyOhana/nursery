const express = require('express');
const path = require('path');
require('dotenv').config();

const plantsRouter = require('./routes/api/plants');

const app = express();

const PORT = 3001 || process.env.PORT;

// Send React app, use CORS,
app.use(express.static(path.join(__dirname, "..", "react-nursery-database", "build")));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use("/plants", plantsRouter);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}.`)
})