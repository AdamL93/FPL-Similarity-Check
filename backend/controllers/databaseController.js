const Result = require('../models/results.model');
const mongoose = require('mongoose');

/**
 * Saves results to the database.
 *
 * @async
 * @function saveResults
 * @param {Object} request - The request object.
 * @param {Object} request.body - The body of the request.
 * @param {Array<string>} request.body.teamIds - The IDs of the teams.
 * @param {Array<Object>} request.body.resultsArray - The array of results.
 * @param {number} request.body.overallSimilarity - The overall similarity score.
 * @param {Object} response - The response object.
 * @returns {Promise<void>} - Returns a promise that resolves when the result is saved.
 */
const saveResults = async (request, response) => {
    const {teamIds, resultsArray, overallSimilarity} = request.body;

    console.log('Request body', request.body);

    try {
        const result = await Result.create({
            teamIds,
            resultsArray,
            overallSimilarity
        });
        console.log("Successfully added to the database");
        response.status(200).json({
            message: "Result added to database",
            data: result
        });
    } catch (error) {
        console.log(error);
        response.status(400).json({error: error.message});
    }
};

/**
 * Retrieves a saved result from the database.
 *
 * @async
 * @function getResult
 * @param {Object} request - The request object.
 * @param {Object} request.params - The parameters of the request.
 * @param {string} request.params.id - The ID of the result.
 * @param {Object} response - The response object.
 * @returns {Promise<void>} - Returns a promise that resolves when the result is retrieved.
 */
const getResult = async (request, response) => {
    const {id} = request.params;
    console.log("getResult has been called");

    if (!isValidId(id)) {
        return response.status(404).json({error: 'Invalid ID'});
    }

    console.log("id being queried", {id});
    const result = await Result.findById(id);

    if (!result) {
        return response.status(404).json({error: 'Result cannot be found: invalid Id'});
    }
    response.status(200).json(result);
};

/**
 * Deletes a saved result from the database.
 *
 * @async
 * @function deleteResult
 * @param {Object} request - The request object.
 * @param {Object} request.params - The parameters of the request.
 * @param {string} request.params.id - The ID of the result.
 * @param {Object} response - The response object.
 * @returns {Promise<void>} - Returns a promise that resolves when the result is deleted.
 */
const deleteResult = async (request, response) => {
    const {id} = request.params;

    console.log("id being queried", {id});

    if (!isValidId(id)) {
        return response.status(404).json({error: 'Invalid ID'});
    }

    console.log("id being queried", {id});

    const result = await Result.findOneAndDelete({_id: id});

    if (!result) {
        return response.status(404).json({error: 'Result cannot be found: invalid Id'});
    }
    response.status(200).json(result);
};

/**
 * Checks if the provided ID is valid.
 *
 * @function isValidId
 * @param {string} id - The ID to be validated.
 * @returns {boolean} - Returns true if the ID is valid, otherwise false.
 */
const isValidId = (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return false;
    }
    return true;
};

module.exports = {
    saveResults,
    getResult,
    deleteResult
};
