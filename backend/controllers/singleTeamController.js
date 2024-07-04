const GameWeekDataModel = require('../models/gameweek.personal.model')
const mongoose = require('mongoose')
const fs = require('fs/promises');
require('dotenv').config()


const getGameweekData = async (request, response) => {

    const { teamId } = request.params //gets teamid from route properties
    try {
        const data = await fs.readFile('../Creating_database/json_data/personal_league_gameweek_data.json', { encoding: 'utf8' });
        const jsonData = JSON.parse(data);

        const team_data = JSON.stringify(jsonData.filter(item => item.team_id === Number(teamId)), null, 2);

        console.log(typeof team_data)
        console.log(`successfully read data for ${teamId}`)

        // Return formatted data as JSON response
        console.log("data received")
        return response.status(200).json(team_data);

    } catch (err) {
        return response.status(404).json({error: 'unable to retreive data'});
    }
};

module.exports = {getGameweekData};