const Result = require('../models/results.model')
const mongoose = require('mongoose')



const saveResults = async (request, response) => {
    const {teamIds, resultsArray, overallSimilarity} = request.body

    //saves results to database
    try {
        const result = await Result.create({teamIds, resultsArray, overallSimilarity})
        response.status(200).json({
            message: "Result added to database",
            data: result
        });
    } catch (error) {
        console.log(error)
        response.status(400).json({error: error.message})
        }
    }

//Retreive a saved Result from the database 
const getResult = async (request,response) => {
    const {id} = request.params

    if (!isValidId(id)) {
        return response.status(404).json({error: 'Invalid ID'})
    }

    console.log("id being queried", {id})
    const result = await Result.findById(id)

    if (!result) {
        return response.status(404).json({error: 'Result can not be found: invalid Id'})
    }
    response.status(200).json(result)
}


//delete a saved Result from the database 
const deleteResult = async (request,response) => {
    const {id} = request.params

    console.log("id being queries", {id})

    if (!isValidId(id)) {
        return response.status(404).json({error: 'Invalid ID'})
    }

    console.log("id being queries", {id})

    const result = await Result.findOneAndDelete({_id: id})

    if (!result) {
        return response.status(404).json({error: 'Result can not be found: invalid Id'})
    }
    response.status(200).json(result)
}



const isValidId = (id) => {

    if (!mongoose.Types.ObjectId.isValid(id)){
        return false
    }
    return true
}

    module.exports = {
        saveResults,
        getResult,
        deleteResult
    }