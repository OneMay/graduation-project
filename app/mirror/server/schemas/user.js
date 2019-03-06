/**
 * 定义用户结构
 */

const mongoose = require('mongoose');
//用户表的结构
const UserSchema = new mongoose.Schema({
    //用户名
    mobile: {
        unique: true,
        type: String
    },
    password: String,
    adminCode: {
        type: Number,
        default: 50
    }
});

module.exports = UserSchema;