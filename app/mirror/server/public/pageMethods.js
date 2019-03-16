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
    }
}