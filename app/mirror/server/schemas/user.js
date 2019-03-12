/**
 * 定义用户结构
 */

const mongoose = require('mongoose');
//用户表的结构
const UserSchema = new mongoose.Schema({
    //用户名
    mobile: {
        unique: true,
        trim: true,
        type: String
    },
    password:  {
        trim: true,
        type: String
    },
    adminCode: {
        type: Number,
        default: 50
    }
});

module.exports = UserSchema;