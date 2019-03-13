/**
 * 定义pv集合
 */
const mongoose = require('mongoose');
const PageViewSchema = mongoose.Schema({
    eventType:{
        type:String,
        default:'pageView'
    },
    timeFormat:String,
    time:Number,
    YYMMDD:String,
    hour:Number,
    browserName:String,
    browserVersion:String,
    operatingSystem:String,
    browserCharset:String,
    browserLanguage:String,
    pageTitle:String,
    pageUrl:String,
    previousPageUrl:String,
    screenHeight:Number,
    screenWidth:Number,
    system:{
        type:String,
        required:true
    },
    user:String,
    version:String,
    ip:String,
    address:String,
    province:String,
    city:String
})

module.exports = PageViewSchema;