const express = require('express')
const {
    createTeam,
    getTeams,
    getTeam,
    deleteTeam,
    updateTeam
} = require('../controllers/teamController')

const router = express.Router()


// GET all teams
router.get('/', getTeams)
    
// GET a single team data
router.get('/:id', getTeam)


// POST a new team
router.post('/', createTeam)

// DELETE a team

router.delete('/:id', deleteTeam)

// UPDATE a team

router.patch('/:id', updateTeam)



module.exports = router
