/**
 * 定义pv集合
 */
const mongoose = require('mongoose');
const EventViewSchema = mongoose.Schema({
    eventType:{
        type:String,
        default:'eventView'
    },
    action:String,
    category:String,
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
EventViewSchema.index({ system:1,timeFormat: 1,YYMMDD:1,time:1,hour:1,operatingSystem:1,pageUrl:1,user:1,ip:1,category:1,action:1})
module.exports = EventViewSchema;