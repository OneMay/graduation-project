/**
 * 定义团队集合结构
 */
const mongoose = require('mongoose');
const TeamSchema = mongoose.Schema({
    teamZn: {
        type: String,
        trim: true
    },
    teamEn: {
        type: String,
        unique: true,
        trim: true
    },
    domainName: {
        type: String,
        //unique:true,
        trim: true
    },
    teamMember: [{
        type: String,
        trim: true

    }],
    teamOwner: {
        type: String,
        trim: true
    },
    meta:{
        buildTime:{
            type:Date,
            default:Date.now()
        }
    }
})

module.exports = TeamSchema;