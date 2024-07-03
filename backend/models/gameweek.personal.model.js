const mongoose = require('mongoose');

// Create a model without a schema
const GameweekDataModel = mongoose.model('GameweekData', {}, 'gameweek_data_personal');

module.exports = GameweekDataModel;