const mongoose = require('mongoose');
const PageViewSchema = require('../schemas/pageView');
const PageView = mongoose.model('pageView',PageViewSchema);

module.exports = PageView;