const mongoose = require('mongoose');
const TeamSchema = require('../schemas/team');
var Team = mongoose.model('team', TeamSchema); 

module.exports = Team;