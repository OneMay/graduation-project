const PageView = require('../models/pageView');

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
                $group: { _id: { user: "$user", system: "$system", time: "$YYMMDD" }, num_tutorial: { $sum: 1 } }
            },
            { "$limit": 10000000000 }
        ])

        return query.length;
    },
    //概览-新增用户
    async getoverviewNewUser(msg) {
        let query = await PageView.aggregate([
            {
                "$match": {
                    system: msg.teamEn,
                    YYMMDD: { $gte: msg.time[0], $lte: msg.time[1] },
                    user: { $nin: ["", "mirror-anonymous"] }
                }
            },
            {
                $group: { _id: { user: "$user", system: "$system", time: "$YYMMDD" }, num_tutorial: { $sum: 1 } }
            },
            { "$limit": 10000000000 }
        ])

        return query.length;
    }
}