const GameWeekDataModel = require('../models/gameweek.personal.model')
const mongoose = require('mongoose')
const fs = require('fs/promises');
require('dotenv').config()




const getGameweekData = async (request, response) => {
    const gameweekData = {};
    const { teamId } = request.params //gets teamid from route properties
    try {
        const data = await fs.readFile('../Creating_database/json_data/personal_league_gameweek_data.json', { encoding: 'utf8' });
        const jsonData = JSON.parse(data);

        const teamData = jsonData.filter(item => item.team_id === Number(teamId));

        console.log(typeof teamData)
        console.log(`successfully read data for ${teamId}`)

        // Return formatted data as JSON response
        console.log("data received")

        teamData.forEach(entry => {
            const gameWeek = entry.game_week;
            const picks = entry.data.picks.map(pick => pick.element);
            gameweekData[gameWeek] = picks;
        });
        console.log("test console log")
        
        return response.status(200).json(JSON.stringify(gameweekData, null, 2));


    } catch (err) {
        return response.status(404).json({error: 'unable to retreive data'});
    }
};

module.exports = {getGameweekData};