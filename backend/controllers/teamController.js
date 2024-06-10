const Team = require('../models/team.model')
const mongoose = require('mongoose')

// get all teams
const getTeams = async (request, response) => {
    const teams = await Team.find({}).sort({createdAt: -1})
    response.status(200).json(teams)
}

// get a single team
const getTeam = async (request, response) => {
    const {id} = request.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return response.status(404).json({error: 'Team id is not valid'})
    }
    const team = await Team.findById(id)
    if (!team) {
        return response.status(404).json({error: 'Team does not exist'})
    }
    
    response.status(200).json(team)
}


//create new team
const createTeam = async (request, response) => {
    const {teamName, teamId} = request.body
    // add to databse
    try {
        const team = await Team.create({teamName, teamId})
        response.status(200).json(team)
    } catch  (error) {
        response.status(400).json({error: error.message})
    }
}

//delete a workout
const deleteTeam = async (request,response) => {
    const {id} = request.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).json("Id is not valid")
    }
    const team = await Team.findOneAndDelete({_id: id})

    if (!team) {
        return response.status(400).json("Team does not exist")
    }

    response.status(200).json(team)

    
}

//update a workout.

const updateTeam = async (request,response) => {
    const {id} = request.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).json("Id is not valid")
    }
    const team = await Team.findOneAndUpdate({_id: id}, {
        ...request.body
    })

    if (!team) {
        return response.status(400).json("Team does not exist")
    }

    response.status(200).json(team)
}



module.exports = {
    createTeam,
    getTeams,
    getTeam,
    deleteTeam,
    updateTeam
}