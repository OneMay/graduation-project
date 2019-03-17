const PageView = require('../models/pageView');
const EventView = require('../models/eventView');
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
        if (msg.buildTime === msg.time[0]) {
            query = nowData
        } else {
            query = nowData.filter((val) => {
                return !agoData.includes(val)
            })
        }

        let nowDataInObj = {
            [msg.time[0]]: query.length
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
        let Data = {};
        query.map(v => {
            Object.assign(Data, {
                [v._id]: parseInt(v.num_tutorial)
            })
        });
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
                $group: { _id: { province: "$province", ip: "$ip",user:"$user" } }
            }, {
                $group: { _id: "$_id.province", num_tutorial: { $sum: 1 } }
            },
            { "$limit": 10000000000 }
        ])
        let Data = query.map(v => {
            return {
                value: v.num_tutorial,
                name: v._id
            }
        });
        return Data;
    },
     //事件分析-访问城市分布
     async getCityByDay(msg) {
        let query = await PageView.aggregate([
            {
                "$match": {
                    system: msg.teamEn,
                    YYMMDD: { $gte: msg.time[0], $lte: msg.time[1] }
                }
            },
            {
                $group: { _id: { city: "$city", ip: "$ip" ,user:"$user"} }
            }, {
                $group: { _id: "$_id.city", num_tutorial: { $sum: 1 } }
            },
            { $sort: { "_id": -1 } },
            { "$limit": 10000000000 }
        ])
        let Data = query.map(v => {
            return {
                value: v.num_tutorial,
                name: v._id
            }
        });
        return Data;
    },
    //事件分析-访问操作系统分布
    async getOsByDay(msg) {
        let query = await PageView.aggregate([
            {
                "$match": {
                    system: msg.teamEn,
                    YYMMDD: { $gte: msg.time[0], $lte: msg.time[1] }
                }
            },
            {
                $group: { _id: { operatingSystem: "$operatingSystem", ip: "$ip" ,user:"$user"} }
            },
             {
                $group: { _id: "$_id.operatingSystem", num_tutorial: { $sum: 1 } }
            },
            { $sort: { "_id": -1 } },
            { "$limit": 10000000000 }
        ])
        let Data = query.map(v => {
            return {
                value: v.num_tutorial,
                name: v._id
            }
        });
        return Data;
    },
    //事件分析-用户访问时间段分布
    async getuserVisitTimeByDay(msg) {
        let query = await PageView.aggregate([
            {
                "$match": {
                    system: msg.teamEn,
                    YYMMDD: { $gte: msg.time[0], $lte: msg.time[1] }
                }
            },
            {
                $group: { _id: { user: "$user", ip: "$ip",hour:"$hour" } }
            },
             {
                $group: { _id: "$_id.hour", num_tutorial: { $sum: 1 } }
            },
            { $sort: { "_id": -1 } },
            { "$limit": 10000000000 }
        ])
        let Data = query.map(v => {
            return {
                value: v.num_tutorial,
                name: v._id+'点'
            }
        });
        return Data;
    },
    //事件分析-获取用户自定义的事件
    async getUserEvent(msg) {
        let actions = await EventView.aggregate([
            {
                "$match": {
                    system: msg.teamEn
                }
            },
            {
                $group: { _id: "$action" }
            },
            { $sort: { "_id": -1 } },
            { "$limit": 10000000000 }
        ])
        let actionsCateGory = await EventView.aggregate([
            {
                "$match": {
                    system: msg.teamEn
                }
            },
            {
                $group: { _id: { action: "$action", category: "$category" } }
            },
            { $sort: { "_id.action": -1 } },
            { "$limit": 10000000000 }
        ])
        let event = [];
        actions.map(v => {
            event.push({
                name: v._id,
                event: []
            })

        });
        let actionsCateGoryData = actionsCateGory.map(v => {
            return {
                action: v._id.action,
                category: v._id.category
            }
        });

        event.map((eventV, index) => {
            actionsCateGoryData.map((v, ind) => {
                if (eventV.name === v.action) {
                    eventV.event.push({
                        action: v.action,
                        category: v.category
                    })
                }
            })
        })
        return event;
    },
    //事件分析-单个用户自定义事件的使用数
    async getUserEventByOne(msg) {
        let query = await EventView.aggregate([
            {
                "$match": {
                    system: msg.teamEn,
                    YYMMDD: { $gte: msg.time[0], $lte: msg.time[1] },
                    category: msg.category,
                    action: msg.action
                }
            },
            {
                $group: { _id: "$YYMMDD", num_tutorial: { $sum: 1 } }
            },
            { $sort: { "num_tutorial": -1 } },
            { "$limit": 10000000000 }
        ])
        let Data = {};
        query.map(v => {
            Object.assign(Data, {
                [v._id]: parseInt(v.num_tutorial)
            })
        });
        return Data;
    },
    //录入的事件数据
    async getEventData(msg) {
        let query = await EventView.aggregate([
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
