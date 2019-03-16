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
        let yesterday = moment(msg.time[0]).subtract(1, 'days').format("YYYY-MM-DD");
        yesterday < msg.buildTime ? yesterday = msg.buildTime : '';
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
                $group: { _id: "$user" }
            },
            { "$limit": 10000000000 }
        ])

        let query = [];
        let agoData = agoDataObj.map(v => v._id);
        let nowData = nowDataObj.map(v => v._id);
       
        nowDataObj.map(v=>{ });
        query = nowData.filter((val) => {
            return !agoData.includes(val)
        })
        let nowDataInObj = {
            [msg.time[0]]:query.length
        };
        return nowDataInObj;
    },
    //概览-日活
    async getoverviewUserView(msg) {
        let query = await PageView.aggregate([
            {
                "$match": {
                    system: msg.teamEn,
                    YYMMDD: { $gte: msg.time[0], $lte: msg.time[1], },
                    user: { $nin: ["", "mirror-anonymous"] }
                }
            },
            {
                $group: { _id: "$user" }
            },
            { "$limit": 10000000000 }
        ])
        return query.length;
    },
    //事件分析-日活
    async getUserViewByDay(msg) {
        let query = await PageView.aggregate([
            {
                "$match": {
                    system: msg.teamEn,
                    YYMMDD: { $gte: msg.time[0], $lte: msg.time[1], },
                    user: { $nin: ["", "mirror-anonymous"] }
                }
            },
            {
                $group: { _id: { user: "$user", time: '$YYMMDD' }, }
            },
            {
                $group: { _id: "$_id.time", num_tutorial: { $sum: 1 } }
            },
            { $sort: { _id: 1 } },
            { "$limit": 10000000000 }
        ])
        let Data ={};
        query.map(v=>{ Object.assign(Data,{
            [v._id]:parseInt(v.num_tutorial)
        })});
        return Data;
    },
    //事件分析-访问省份分布
    async getProvinceByDay(msg) {
        let query = await PageView.aggregate([
            {
                "$match": {
                    system: msg.teamEn,
                    YYMMDD: { $gte: msg.time[0], $lte: msg.time[1] }
                }
            },
            {
                $group:  { _id:{province:"$province",ip:"$ip"}}
            } ,{
                $group:  { _id:"$_id.province",num_tutorial: { $sum: 1 }}
            } , 
            { "$limit": 10000000000 }
        ])
        let Data =query.map(v=>{ 
            return {
                value:v.num_tutorial,
                name:v._id
            }
        });
        return Data;
    },
}