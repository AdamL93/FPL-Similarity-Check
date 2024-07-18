const express = require('express');
const {getGameweekData} = require('../controllers/singleTeamController')
const {getCreatorGameweekData} = require('../controllers/multipleTeamController')
const router = express.Router();

//route handler
router.get('/', () => {})


//get teamid details from database. colon in :teamid signifies its a parameter that can change
router.get('/:teamId/:teamId2', getGameweekData )

//get results from database for content creators.
router.get('/:teamId', getCreatorGameweekData)


module.exports = router