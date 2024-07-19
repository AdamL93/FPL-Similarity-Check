const mongoose = require('mongoose')
const Schema = mongoose.Schema

const resultsSchema = new Schema({

    teamIds:{
        type: [Number],
        required: true,
        unique: false
    },
    resultsArrray: {
        type: [Number],
        required: true,
        unique: false
    },
    overallSimillalrity: {
        type: Number,
        required: true,
        unique: false
    }
    },{
    timestamps: true
});

const Results = mongoose.model('Results', resultsSchema)

module.exports = Results;