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
    stayTime:{
        type:Number,
        default:0
    },
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
PageViewSchema.index({ system:1,timeFormat: 1,YYMMDD:1,time:1,hour:1,operatingSystem:1,pageUrl:1,user:1,ip:1})
module.exports = PageViewSchema;