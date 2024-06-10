require('dotenv').config()
const express = require('express')


// express app
const app = express();
const teamRoutes = require('./routes/teams')

//middle ware to log requests as they come in.

app.use(express.json())

app.use((request, response, next) => {
    console.log(request.path, request.method)
    next()
})

// Uses routes in route teams file (attaches them to the app)
app.use('/api/teams', teamRoutes)


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



