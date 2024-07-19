require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')


// creates instance of an express app
const app = express();

//imports the routes defined in the routes teams folder.
const fplRoutes = require('./routes/fplDatabase')

//middleware to parse incoming json requests
app.use(express.json())

//middle ware to log requests as they come in.
app.use((request, response, next) => {
    console.log(request.path, request.method)
    next()
})

// Uses routes in fplDatabase route file (attaches them to the app)
app.use('/api/fplDatabase', fplRoutes)


// connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
    
        // listen for requests from port number
        app.listen(process.env.PORT, () => {
            console.log('Listening on port 4000');
        })
    })
    .catch((error) => {
        console.log(error)
    })



