const GameWeekDataModel = require('../models/gameweek.personal.model')
const mongoose = require('mongoose')
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

        console.log(gameweekData1)

        //comparison logic here

    


        console.log("test console log")
        
        return response.status(200).json(JSON.stringify(gameweekData, null, 2));


    } catch (err) {
        return response.status(404).json({error: 'unable to retreive data'});
    }
};

module.exports = {getGameweekData};