const express = require('express');
const { getGameweekData } = require('../controllers/singleTeamController');
const { getCreatorGameweekData } = require('../controllers/multipleTeamController');
const { saveResults, getResult, deleteResult } = require('../controllers/databaseController');
const router = express.Router();

/**
 * Base route fucntionality
 * @name get/
 * @function
 * @memberof module:router
 */
router.get('/', (request, response) => {
    response.status(200).send('Successfull Api response');
});

/**
 * Route to save a result to the database.
 * @name post/SaveResults
 * @function
 * @memberof module:router
 * @param {Function} saveResults - Controller function to save results.
 */
router.post('/SaveResults', saveResults);

/**
 * Route to get a saved result from the database.
 * @name get/SavedResults/:id
 * @function
 * @memberof module:router
 * @param {Function} getResult - Controller function to get a saved result.
 */
router.get('/SavedResults/:id', getResult);

/**
 * Route to delete a saved result from the database.
 * @name delete/DeleteResult/:id
 * @function
 * @memberof module:router
 * @param {Function} deleteResult - Controller function to delete a saved result.
 */
router.delete('/DeleteResult/:id', deleteResult);

/**
 * Route to get gameweek data for two teams.
 * @name get/:teamId/:teamId2
 * @function
 * @memberof module:router
 * @param {Function} getGameweekData - Controller function to get gameweek data for two teams.
 */
router.get('/:teamId/:teamId2', getGameweekData);

/**
 * Route to get gameweek data for a content creator.
 * @name get/:teamId
 * @function
 * @memberof module:router
 * @param {Function} getCreatorGameweekData - Controller function to get gameweek comparison data for all content creators.
 */
router.get('/:teamId', getCreatorGameweekData);

module.exports = router;
