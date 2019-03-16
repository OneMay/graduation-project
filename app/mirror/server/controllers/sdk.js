const sdkMethods = require('../public/sdkMethods')
const Pageview = require('../models/pageView');
const Eventview = require('../models/eventView');
const moment = require('moment');

let responseData = {
    code: 200,
    message: 'ok',
    data: null
}
module.exports = {
    /**
     * sdk信息录入
     */
    async EP_EVENT_BUS(ctx, next, resolve) {
        let msg = ctx.request.body;
        const ip =   ctx.req.headers['x-forwarded-for'] ||ctx.req.headers['x-real-ip']||
           ctx.req.connection.remoteAddress ||
           ctx.req.socket.remoteAddress ||
           ctx.req.connection.socket.remoteAddress;
      // const ip = '59.68.33.24';
        let ipData = await sdkMethods.getIpInfo(ip);
        if(msg.eventType==="pageView" && msg.entities.system){
           
            let pageview = new Pageview({
                eventType:msg.eventType,
                timeFormat:msg.timeFormat,
                time:msg.time,
                YYMMDD:moment(msg.timeFormat).format('YYYY-MM-DD'),
                hour:moment(msg.timeFormat).hour(),
                browserName:msg.entities.browserName,
                browserVersion:msg.entities.browserVersion,
                operatingSystem:msg.entities.operatingSystem,
                browserCharset:msg.entities.browserCharset,
                browserLanguage:msg.entities.browserLanguage,
                pageTitle:msg.entities.pageTitle,
                pageUrl:msg.entities.pageUrl,
                previousPageUrl:msg.entities.previousPageUrl,
                screenHeight:msg.entities.screenHeight,
                screenWidth:msg.entities.screenWidth,
                system:msg.entities.system,
                user:msg.entities.user,
                version:msg.entities.version,
                ip:ip,
                address:ipData.address,
                province:ipData.province,
                city:ipData.city
            });
            await sdkMethods.insertPageView(pageview);
           
            Object.assign(responseData, {
                code: 200,
                message: 'ok',
                data: null
            })
            ctx.body = responseData;
            resolve(next())
        }
        else if(msg.eventType==="eventView" && msg.entities.system){
            let eventView = new Eventview({
                eventType:msg.eventType,
                timeFormat:msg.timeFormat,
                time:msg.time,
                YYMMDD:moment(msg.timeFormat).format('YYYY-MM-DD'),
                hour:moment(msg.timeFormat).hour(),
                browserName:msg.entities.browserName,
                browserVersion:msg.entities.browserVersion,
                operatingSystem:msg.entities.operatingSystem,
                browserCharset:msg.entities.browserCharset,
                browserLanguage:msg.entities.browserLanguage,
                pageTitle:msg.entities.pageTitle,
                pageUrl:msg.entities.pageUrl,
                previousPageUrl:msg.entities.previousPageUrl,
                screenHeight:msg.entities.screenHeight,
                screenWidth:msg.entities.screenWidth,
                system:msg.entities.system,
                user:msg.entities.user,
                version:msg.entities.version,
                ip:ip,
                address:ipData.address,
                province:ipData.province,
                city:ipData.city,
                action:msg.entities.action,
                category:msg.entities.category,
            });
            await sdkMethods.insertEventView(eventView);
           
            Object.assign(responseData, {
                code: 200,
                message: 'ok',
                data: null
            })
            ctx.body = responseData;
            resolve(next())

        }else{
            Object.assign(responseData, {
                code: 444,
                message: 'fail',
                data: '配置出错啦o(╥﹏╥)o'
            })
            ctx.body = responseData;
            resolve(next())
        }

    },
}