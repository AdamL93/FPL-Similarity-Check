const fs = require('fs/promises');
require('dotenv').config();

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

    // Loops through each gameweek api call until not found
    for (let gw = 1; gw <= 38; gw++) {

    // Define Api endpoints url's
     const teamIdUrl = `https://fantasy.premierleague.com/api/entry/${teamId}/event/${gw}/picks/`
     const teamId2Url = `https://fantasy.premierleague.com/api/entry/${teamId2}/event/${gw}/picks/`

    }
    try {

        // Fetch URL data and format into Json
        const response = await fetch(teamIdUrl);
        const jsonData = await response.json();

        // Add the gw and pick data to a list/dict



        const team1Data = jsonData.filter(item => item.team_id === Number(teamId));
        const team2Data = jsonData.filter(item => item.team_id === Number(teamId2));

        
        // Gets pick data from both teams
        team1Data.forEach(entry => {
            const gameWeek = entry.game_week;
            const picks = entry.data.picks.map(pick => pick.element);
            gameweekData1[gameWeek] = picks;
        });

        team2Data.forEach(entry => {
            const gameWeek = entry.game_week;
            const picks = entry.data.picks.map(pick => pick.element);
            gameweekData2[gameWeek] = picks;
        });

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

        return response.status(200).send(similarityArray);
    } catch (err) {
        return response.status(404).json({ error: 'Unable to retrieve data' });
    }
};

module.exports = { getGameweekData };
