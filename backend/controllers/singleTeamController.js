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
    const gameweekData1 = {};
    const gameweekData2 = {};

    // Gets team IDs from route properties
    const { teamId, teamId2 } = request.params; 

    // Gets the current gameweek 
    const currentGw = await getCurrentGameweek();

    try {
        // Loops through each gameweek api call until not found
        for (let gw = 1; gw <= currentGw; gw++) {

            // Define Api endpoints url's
            const teamIdUrl = `https://fantasy.premierleague.com/api/entry/${teamId}/event/${gw}/picks/`
            const teamId2Url = `https://fantasy.premierleague.com/api/entry/${teamId2}/event/${gw}/picks/`

            // Fetch URL data and format into Json
            const response1 = await fetch(teamIdUrl);
            const jsonData1 = await response1.json();

            const response2 = await fetch(teamId2Url);
            const jsonData2 = await response2.json();;

            //extract the picks data
            const picks1 = jsonData1.picks.map(pick => pick.element);
            const picks2 = jsonData2.picks.map(pick => pick.element);

            // Add the gw and pick data to a dict
            gameweekData1[gw] = picks1;
            gameweekData2[gw] = picks2;
        }

        // Gets number of matches per gameweek
        const similarityArray = [];
        let cumulativeSimilarity = 0;

        for (const key in gameweekData1) {
            let gameweek1Array = gameweekData1[key];
            let gameweek2Array = gameweekData2[key];

            const elementMatches = gameweek1Array.filter(element => gameweek2Array.includes(element));

            // Calculates similarity percentages per gameweek and stores in array
            let similarityPercentage = (elementMatches.length / 15) * 100;
            let roundedSimilarityPercentage = Math.round(similarityPercentage);
            cumulativeSimilarity += roundedSimilarityPercentage;
            similarityArray.push(roundedSimilarityPercentage);
        }

        let overallSimilarity = Math.round(cumulativeSimilarity / Object.keys(gameweekData1).length);
        similarityArray.push(overallSimilarity);

        //Send the similary data as a response after all gameweeks have been processed
        return response.status(200).send(similarityArray);

    } catch (err) {
            return response.status(404).json({ error: 'Unable to retrieve data' });
    }
};

module.exports = { getGameweekData };
