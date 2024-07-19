const mongoose = require('mongoose')
const Schema = mongoose.Schema

const resultsSchema = new Schema({

    teamIds:{
        type: [String],
        required: true,
        unique: false
    },
    resultsArray: {
        type: [Number],
        required: true,
        unique: false
    },
    overallSimilarity: {
        type: Number,
        required: true,
        unique: false
    }
    },{
    timestamps: true
});

const Results = mongoose.model('Result', resultsSchema)

module.exports = Results;