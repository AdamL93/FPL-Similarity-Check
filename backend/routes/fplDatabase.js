const express = require('express');
const { getGameweekData } = require('../controllers/singleTeamController')
const { getCreatorGameweekData } = require('../controllers/multipleTeamController')
const { saveResults, getResult, deleteResult } = require('../controllers/databaseController')
const router = express.Router();

//route handler
router.get('/', () => {})

//Post/Save a Result to database
router.post('/SaveResults', saveResults)

//GET a saved Result from database
router.get('/SavedResults/:id', getResult)

//GET a saved Result from database
router.delete('/DeleteResult/:id', deleteResult)

//get teamid details from database
router.get('/:teamId/:teamId2', getGameweekData )

//get results from database for content creators.
router.get('/:teamId', getCreatorGameweekData)




module.exports = router