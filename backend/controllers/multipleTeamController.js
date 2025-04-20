const fs = require('fs/promises');
require('dotenv').config();

/**
 * Array of content creator IDs.
 * @type {number[]}
 */
const contentCreatorIds = [
    7632, 14076];

/**
 * Retrieves the current gameweek.
 *
 * @async
 * @function getCurrentGameweek
 * @returns {Promise<number>} - The current gameweek ID.
 */
async function getCurrentGameweek() {
    const response = await fetch('https://fantasy.premierleague.com/api/bootstrap-static/');
    const data = await response.json();
    const currentGW = data.events.find(event => event.is_current);
    return currentGW.id;
}


/**
 * Retrieves gameweek pick data for a team up to the current gameweek.
 *
 * @async
 * @function retrievePickData
 * @param {number} currentGameWeek - The current gameweek number to fetch data for.
 * @param {string} teamId - The team ID to fetch pick data for.
 * @returns {Promise<Object>} - Resolves to an object with gameweek numbers as keys and player IDs as values.
 * @throws {Error} - Throws an error if the API request fails for any gameweek.
 */

const retrievePickData = async (teamId, currentGameWeek) => {

    const gameWeekData = {}; 

    // Retreives and stores gameweek picks data for the inputted team Id
    for (let gw = 1; gw <= currentGameWeek; gw++){

        // Team id data
        const teamIdUrl = `https://fantasy.premierleague.com/api/entry/${teamId}/event/${gw}/picks/`;

        try {
            const response = await fetch(teamIdUrl);
            if (!response.ok) {
                throw new Error(`Failed to fetch data for ${teamId}, ${gw}`);
            }

            const jsonData = await response.json();

            // extract pick data 
            const picks = jsonData.picks.map(pick => pick.element);
    
            // Add gameweek and current gameweek picks data to dict
            gameWeekData[gw] = picks;

        } catch (err) {
            console.log(`Error fetching gameweek ${gw} data`);
        }
    }
    return gameWeekData;  
}


/**
 * Retrieves gameweek data for a specified team and compares it with content creators' gameweek data.
 *
 * @async
 * @function getCreatorGameweekData
 * @param {Object} request - The request object.
 * @param {Object} request.params - The parameters of the request.
 * @param {string} request.params.teamId - The ID of the team to retrieve data for.
 * @param {Object} response - The response object.
 * @returns {Promise<void>} - Returns a promise that resolves with the similarity data.
 */
const getCreatorGameweekData = async (request, response) => {
    const { teamId } = request.params;
    let combinedArrays = [];
    const currentGameWeek = await getCurrentGameweek()

    // Populates pick data for inputted team Id
    let inputGameWeekData = await retrievePickData(teamId,currentGameWeek)

    try {

        // Cycles through content creators and gets the pick data
        for (let i = 0; i < contentCreatorIds.length; i++) {

            //retreives the current content creator id
            let contentCreatorId = contentCreatorIds[i];

            // initialises dict and populates the pick data for the current creator id (fresh dict every loop)
            let contentCreatorData = await retrievePickData(contentCreatorId, currentGameWeek);

            // Calculates similarity percentages per gameweek.
            const similarityArray = [];
            let cumulativeSimilarity = 0;

            for (const key in inputGameWeekData) {
                let gameweek1Array = inputGameWeekData[key];
                let gameweek2Array = contentCreatorData[key];

                const elementMatches = gameweek1Array.filter(element => gameweek2Array.includes(element));

                let similarityPercentage = (elementMatches.length / 15) * 100;
                let roundedSimilarityPercentage = Math.round(similarityPercentage);
                cumulativeSimilarity += roundedSimilarityPercentage;
                similarityArray.push(roundedSimilarityPercentage);
            }

            let overallSimilarity = Math.round(cumulativeSimilarity / Object.keys(inputGameWeekData).length);
            similarityArray.push(overallSimilarity);
            const teamResultsObject = { [contentCreatorIds[i]]: similarityArray };
            combinedArrays.push(teamResultsObject);
        }

        return response.status(200).send(combinedArrays);
    } catch (err) {
        return response.status(404).json({ error: 'Unable to retrieve data' });
    }
};

module.exports = { getCreatorGameweekData };
