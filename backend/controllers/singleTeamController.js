const fs = require('fs/promises');
require('dotenv').config()

const getGameweekData = async (request, response) => {
    const gameweekData1 = {};
    const gameweekData2 = {};

    const { teamId, teamId2 } = request.params //gets teamid from route properties
    try {
        const data = await fs.readFile('../Creating_database/json_data/personal_league_gameweek_data.json', { encoding: 'utf8' });
        const jsonData = JSON.parse(data);

        const team1Data = jsonData.filter(item => item.team_id === Number(teamId));
        const team2Data = jsonData.filter(item => item.team_id === Number(teamId2));

        console.log(typeof team1Data)
        console.log(typeof team2Data)
        console.log(`successfully read data for ${teamId} and ${teamId2}`)
        

        console.log("data received")

        // collects pick data from both teams
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

        console.log(gameweekData1.length)
        //comparison logic here
        
        //gets number of matches per gameweek.
        const similarityArray = []
        let cumulativeSimilarity = 0

        for (const key in gameweekData1) {

            let gameweek1Array = gameweekData1[key]
            let gameweek2Array = gameweekData2[key]
            
            

            const elementMatches = gameweek1Array.filter(element => gameweek2Array.includes(element));
            //console.log(`Gameweek ${key} matches:`, elementMatches.length);

         //calculates simialrity percentages per gameweek and stores in array.
            let similarityPercentage = (elementMatches.length/15)*100
            let roundedSimilarityPercentage = Math.round(similarityPercentage)
            cumulativeSimilarity += roundedSimilarityPercentage
            console.log(`Gameweek ${key} simlarity: ${roundedSimilarityPercentage} %`);
            similarityArray.push("Gameweek " + key + ": " + roundedSimilarityPercentage + "%")

          }
        let overallSimilarity = Math.round(cumulativeSimilarity/Object.keys(gameweekData1).length)
        similarityArray.push("Overall Similarity: " + overallSimilarity + "%")

          
        

        console.log("similarity Array:", similarityArray)
        
        return response.status(200).send(similarityArray);


    } catch (err) {
        return response.status(404).json({error: 'unable to retreive data'});
    }
};

module.exports = {getGameweekData};