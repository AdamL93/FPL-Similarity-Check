const express = require('express')

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
router.post('/', (request, response) => {
    response.json({mssg: 'POST a new team'})
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