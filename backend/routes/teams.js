const express = require('express')
const Team = require('../models/team.model')

const router = express.Router()


// GET all teams
router.get('/', (request, response) => {
    response.json({mssg: 'GET all teams'})
})
    
// GET a single team data
router.get('/:id', (request, response) => {
    response.json({mssg: 'GET a single Team'})
})


// POST a new team
router.post('/', async (request, response) => {
    const {teamName, teamId} = request.body

    try {
        const team = await Team.create({teamName, teamId})
        response.status().json(team)
    } catch  (error) {
        response.status(400).json({error: error.message})
    }
})

// DELETE a team

router.delete('/:id', (request, response) => {
    response.json({mssg: 'DELTE a team'})
})

// UPDATE a team

router.patch('/:id', (request, response) => {
    response.json({mssg: 'UPDATE a new team'})
})

module.exports = router