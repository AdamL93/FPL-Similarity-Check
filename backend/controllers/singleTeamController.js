const GameWeekDataModel = require('../models/gameweek.personal.model')
const mongoose = require('mongoose')
require('dotenv').config()




const getGameweekData = async (request, response) => {
    const { teamId } = request.params //gets teamid from route properties

    const db = mongoose.connection.db;

    const gameweekData = await GameWeekDataModel.findOne({})

    if (!gameweekData) {
        return response.status(404).json({message: 'Invalid Team Id'})
    }
    console.log(gameweekData);
    response.json(gameweekData)
}

module.exports = {getGameweekData};