const express = require('express');
const {getGameweekData} = require('../controllers/singleTeamController')
const router = express.Router();

//route handler
router.get('/', () => {})


//get teamid details from database. colon in :teamid signifies its a parameter that can change
router.get('/:teamId', getGameweekData)


module.exports = router 