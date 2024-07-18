const fs = require('fs/promises');
require('dotenv').config()

const contentCreatorIds =  [
    7632,14076,4237,6312,275269,
    3322,4845,908,602,16256,
    1596,11349,12,4746,256075,
    6770,23891,8366,4305040,18675
    ,12315,2514,329799,7726,9906,
    8258,36965,51396,393272,
    4650,387,358,4393,5986,946,
    1974,14165,17482,1072,3717,
    1672,2134,12090,2361,4664,
    8302,7665,5090
]

const getCreatorGameweekData = async (request, response) => {

    const { teamId } = request.params
    let combinedArrays = [];

    try {
        const inputData = await fs.readFile('../Api_files/json_data/personal_league_gameweek_data.json', { encoding: 'utf8' });
        const creatorData = await fs.readFile('../Api_files/json_data/Content_Creator_gameweek_data.json', { encoding: 'utf8' });

        const creatorJsonData = JSON.parse(creatorData);
        const jsonData = JSON.parse(inputData);


        for (let i = 0; i < contentCreatorIds.length; i++) {

            let contentCreatorId = contentCreatorIds[i]
            const gameweekData1 = {};
            const gameweekData2 = {};

            const team1Data = jsonData.filter(item => item.team_id === Number(teamId));
            const team2Data = creatorJsonData.filter(item => item.team_id === Number(contentCreatorId));

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

            //gets number of matches per gameweek.
            const similarityArray = []
            let cumulativeSimilarity = 0
 
            for (const key in gameweekData1) {
    
                let gameweek1Array = gameweekData1[key]
                let gameweek2Array = gameweekData2[key]
                
                const elementMatches = gameweek1Array.filter(element => gameweek2Array.includes(element));
    
            //calculates similarity percentages per gameweek and stores in array.
                let similarityPercentage = (elementMatches.length/15)*100
                let roundedSimilarityPercentage = Math.round(similarityPercentage)
                cumulativeSimilarity += roundedSimilarityPercentage
                similarityArray.push(roundedSimilarityPercentage)
            }

            let overallSimilarity = Math.round(cumulativeSimilarity/Object.keys(gameweekData1).length)
            similarityArray.push(overallSimilarity)
            const teamResultsObject = { [contentCreatorIds[i]]: similarityArray };
            combinedArrays.push(teamResultsObject) 
        }
        console.log(combinedArrays)
        return response.status(200).send(combinedArrays);

    } catch (err) {
        return response.status(404).json({error: 'unable to retreive data'});
    }
}

module.exports = {getCreatorGameweekData};