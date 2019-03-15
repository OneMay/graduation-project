const PageView = require('../models/pageView');
const moment = require('moment')

module.exports = {
    //概览-累计用户
    async getoverviewUser(msg) {
        let query = await PageView.aggregate([
            {
                "$match": {
                    system: msg.teamEn,
                    YYMMDD: { $gte: msg.time[0], $lte: msg.time[1] },
                    user: { $nin: ["", "mirror-anonymous"] }
                }
            },
            {
                $group: { _id: { user: "$user", system: "$system" }, num_tutorial: { $sum: 1 } }
            },
            { "$limit": 10000000000 }
        ])

        return query.length;
    },
    //概览-新增用户
    async getoverviewNewUser(msg) {
        let yesterday = moment( msg.time[0]).subtract(1, 'days').format("YYYY-MM-DD");
        yesterday<msg.buildTime?yesterday=msg.buildTime:'';
        let agoDataObj = await PageView.aggregate([
            {
                "$match": {
                    system: msg.teamEn,
                    YYMMDD: { $gte: msg.buildTime, $lte: yesterday },
                    user: { $nin: ["", "mirror-anonymous"] }
                }
            },
            {
                $group: { _id: "$user", num_tutorial: { $sum: 1 } }
            },
            { "$limit": 10000000000 }
        ])
        let nowDataObj = await PageView.aggregate([
            {
                "$match": {
                    system: msg.teamEn,
                    YYMMDD: { $gte: msg.time[0], $lte: msg.time[1] },
                    user: { $nin: ["", "mirror-anonymous"] }
                }
            },
            {
                $group: { _id:  "$user"  }
            },
            { "$limit": 10000000000 }
        ])

        let query=[];
        let agoData = agoDataObj.map(v=>v._id);
        let nowData= nowDataObj.map(v=>v._id) ;
        query= nowData.filter((val)=>{
            return !agoData.includes(val)
        })
        return query.length;
    },
    //概览-日活
    async getoverviewUserView(msg) {
        let query = await PageView.aggregate([
            {
                "$match": {
                    system: msg.teamEn,
                    YYMMDD: { $gte:msg.time[0], $lte:msg.time[1], },
                    user: { $nin: ["", "mirror-anonymous"] }
                }
            },
            {
                $group:  { _id: "$user"}
            } ,
            { "$limit": 10000000000 }    
        ])
        return query.length;
    },
    //概览-pv
    async getoverviewPageView(msg) {
        let query = await PageView.aggregate([
            {
                "$match": {
                    system: msg.teamEn,
                    YYMMDD: { $gte:msg.time[0], $lte:msg.time[1] }
                }
            },
            { "$limit": 10000000000 }    
        ])
        return query.length;
    },
    //页面分析-每日页面浏览量
    async getPageViewByDay(msg) {
        let query = await PageView.aggregate([
            {
                "$match": {
                    system: msg.teamEn,
                    YYMMDD: { $gte:msg.time[0], $lte:msg.time[1] }
                }
            },
            {
                $group:  { _id: "$YYMMDD",num_tutorial: { $sum: 1 } }
            } ,
            {$sort:{"_id" : 1}},
            { "$limit": 10000000000 }    
        ])
        let agoData ={};
        query.map(v=>{ Object.assign(agoData,{
            [v._id]:parseInt(v.num_tutorial)
        })});
        return agoData;
    }
}