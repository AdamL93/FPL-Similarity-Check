const fs = require('fs/promises');
require('dotenv').config();

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

    const gameWeekUrls = []
    const gameWeekData = {}; 

    // Retreives and stores gameweek picks data for the inputted team Id
    for (let gw = 1; gw <= currentGameWeek; gw++){

        // Creates array of all gameweek urls
        gameWeekUrls.push(`https://fantasy.premierleague.com/api/entry/${teamId}/event/${gw}/picks/`);

    }
    try {
        const responses = await Promise.all(gameWeekUrls.map(url => 
            fetch(url).then(response => response.json())
        ));

        responses.forEach((response, index) => {
            // extract pick data 
            const picks = response.picks.map(pick => pick.element);

            // Add current gameweek(index+1) and current gameweek picks data to dict
            gameWeekData[index+1] = picks;           
        })

    } catch (err) {
        console.log(`Error fetching gameweek data`);
    }
    return gameWeekData; 
}

/**
 * Retrieves gameweek data for two specified teams and calculates similarity percentages.
 *
 * @async
 * @function getGameweekData
 * @param {Object} request - The request object.
 * @param {Object} request.params - The parameters of the request.
 * @param {string} request.params.teamId - The ID of the first team.
 * @param {string} request.params.teamId2 - The ID of the second team.
 * @param {Object} response - The response object.
 * @returns {Promise<void>} - Returns a promise that resolves with the similarity data.
 */
const getGameweekData = async (request, response) => {

    // Gets team IDs from route properties
    const { teamId, teamId2 } = request.params; 

    // Gets the current gameweek 
    const currentGw = await getCurrentGameweek();

    try {
        // Loops through each gameweek api call until not found
        const team1Data = await retrievePickData(teamId, currentGw);
        const team2Data = await retrievePickData(teamId2, currentGw);

        // Gets number of matches per gameweek
        const similarityArray = [];
        let cumulativeSimilarity = 0;

        for (const key in team1Data) {
            let team1Array = team1Data[key];
            let team2Array = team2Data[key];

            const elementMatches = team1Array.filter(element => team2Array.includes(element));

            // Calculates similarity percentages per gameweek and stores in array
            let similarityPercentage = (elementMatches.length / 15) * 100;
            let roundedSimilarityPercentage = Math.round(similarityPercentage);
            cumulativeSimilarity += roundedSimilarityPercentage;
            similarityArray.push(roundedSimilarityPercentage);
        }

        let overallSimilarity = Math.round(cumulativeSimilarity / Object.keys(team1Data).length);
        similarityArray.push(overallSimilarity);

        //Send the similary data as a response after all gameweeks have been processed
        return response.status(200).send(similarityArray);

    } catch (err) {
            return response.status(404).json({ error: 'Unable to retrieve data' });
    }
};

module.exports = { getGameweekData };
