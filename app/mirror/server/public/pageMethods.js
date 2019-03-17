const PageView = require('../models/pageView');

module.exports = {
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
    },
    //页面分析-每个页面的PV
    async getPageViewByPage(msg) {
        let query = await PageView.aggregate([
            {
                "$match": {
                    system: msg.teamEn,
                    YYMMDD: { $gte:msg.time[0], $lte:msg.time[1] }
                }
            },
            {
                $group:  { _id: "$pageUrl",num_tutorial: { $sum: 1 } }
            } ,
            {$sort:{"num_tutorial" : -1}},
            { "$limit": 10000000000 }    
        ])

        return query;
    },
    //页面分析-单个页面的PV
    async getPageViewByUrl(msg) {
        let query = await PageView.aggregate([
            {
                "$match": {
                    system: msg.teamEn,
                    YYMMDD: { $gte:msg.time[0], $lte:msg.time[1] },
                    pageUrl:msg.pageUrl
                }
            },
            {
                $group:  { _id: "$YYMMDD",num_tutorial: { $sum: 1 } }
            } ,
            {$sort:{"num_tutorial" : -1}},
            { "$limit": 10000000000 }    
        ])
        let agoData ={};
        query.map(v=>{ Object.assign(agoData,{
            [v._id]:parseInt(v.num_tutorial)
        })});
        return agoData;
    },
    //页面数据-录入的页面数据
    async getPageData(msg) {
        let query = await PageView.aggregate([
            {
                "$match": {
                    system: msg.teamEn
                }
            },
            {$sort:{"timeFormat" : -1}},
            { "$limit": 1000 }    
        ])

        return query;
    }
}