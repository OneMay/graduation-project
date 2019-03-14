const eventMethods = require('../public/eventMethods')
const Eventview = require('../models/eventView');
const moment = require('moment');

let responseData = {
    code: 200,
    message: 'ok',
    data: null
}
module.exports = {
    /**
     * 概览-累计用户量
     */
    async overviewUser(ctx, next, resolve) {
        let msg = ctx.request.body;
        let userTotal = await eventMethods.getoverviewUser(msg);  
            Object.assign(responseData, {
                code: 200,
                message: 'ok',
                data: userTotal
            })
            ctx.body = responseData;
            resolve(next())
    },
}