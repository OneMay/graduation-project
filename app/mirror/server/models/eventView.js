const mongoose = require('mongoose');
const EventViewSchema = require('../schemas/eventView');
const EventView = mongoose.model('eventView',EventViewSchema);

module.exports = EventView;