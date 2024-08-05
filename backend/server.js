require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');

/**
 * Creates an instance of an Express app.
 * @type {Object}
 */
const app = express();

// Imports the routes defined in the routes folder.
const fplRoutes = require('./routes/fplDatabase');

/**
 * Middleware to parse incoming JSON requests.
 */
app.use(express.json());

/**
 * Middleware to log requests as they come in.
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 * @param {Function} next - The next middleware function.
 */
app.use((request, response, next) => {
    console.log(request.path, request.method);
    next();
});

/**
 * Uses routes in fplDatabase route file (attaches them to the app).
 * @name /api/fplDatabase
 * @function
 * @memberof module:app
 */
app.use('/api/fplDatabase', fplRoutes);

/**
 * Connects to the MongoDB database.
 * Listens for requests on the specified port.
 */
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        /**
         * Starts the server to listen for requests.
         * @param {number} port - The port number which the server listens on.
         */
        app.listen(process.env.PORT, () => {
            console.log('Connected to MongoDB');
            console.log('Listening on port 4000');
        });
    })
    .catch((error) => {
        console.log(error);
    });
