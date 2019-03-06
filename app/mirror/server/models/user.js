/**
 * 创建模型
 */
var mongoose = require('mongoose');
var UserSchema = require('../schemas/user');
var User = mongoose.model('user', UserSchema); //编译生成

module.exports = User;