const GameWeekDataModel = require('../models/gameweek.personal.model')
const mongoose = require('mongoose')
const fs = require('fs/promises');
require('dotenv').config()



const getGameweekData = async (request, response) => {

    const { teamId } = request.params //gets teamid from route properties
    try {
        const data = await fs.readFile('../Creating_database/json_data/personal_league_gameweek_data.json', { encoding: 'utf8' });
        console.log(`successfully read data for ${teamId}`)
        return response.status(200).json(data);
    } catch (err) {
        return response.status(404).json({error: 'unable to retreive data'});
    }
};


module.exports = {getGameweekData};

/*const getGameweekData = async (request, response) => {
    const { teamId } = request.params //gets teamid from route properties

    const db = mongoose.connection.db;

    const gameweekData = await GameWeekDataModel.findOne({})

    if (!gameweekData) {
        return response.status(404).json({message: 'Invalid Team Id'})
    }
    console.log(gameweekData);
    response.json(gameweekData)
}
*/

