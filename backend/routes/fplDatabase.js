const express = require('express');
const {getGameweekData} = require('../controllers/singleTeamController')
const {getCreatorGameweekData} = require('../controllers/multipleTeamController')
const Result = require('../models/results.model')
const router = express.Router();

//route handler
router.get('/', () => {})


//get teamid details from database. colon in :teamid signifies its a parameter that can change
router.get('/:teamId/:teamId2', getGameweekData )

//get results from database for content creators.
router.get('/:teamId', getCreatorGameweekData)

//Post/Save a Resullt
router.post('/SavedResults', async (request, response) => {
    const {teamIds, resultsArray, overallSimilarity} = request.body

    try {
        const result = await Result.create({teamIds, resultsArray, overallSimilarity})
        response.status(200).json({
            message: "Result added to database",
            data: result
        });
    } catch (error) {
        console.log(error)
        response.status(400).json({error: error.message})
        }
    })

//GET a  saved Result
router.get('/:id', (request, response) => {
    response.json({mssg: 'GET A RESULT'})
})


module.exports = router