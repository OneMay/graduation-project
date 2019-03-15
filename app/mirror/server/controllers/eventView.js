const eventMethods = require('../public/eventMethods')
const Eventview = require('../models/eventView');
const moment = require('moment');
const commen = require('../public/commen');

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
    /**
     * 概览-新增用户
     */
    async overviewNewUser(ctx, next, resolve) {
        let msg = ctx.request.body;
        let ratioYesterdayTime = moment(msg.time[0]).subtract(1, 'days').format("YYYY-MM-DD");
        let basisWeekTime = moment(msg.time[0]).subtract(7, 'days').format("YYYY-MM-DD");
        let ratioParams = {
            teamEn: msg.teamEn,
            time: [ratioYesterdayTime, ratioYesterdayTime],
            buildTime: msg.buildTime
        };
        let basisParams = {
            teamEn: msg.teamEn,
            time: [basisWeekTime, basisWeekTime],
            buildTime: msg.buildTime
        };
        let newUserTotal = await eventMethods.getoverviewNewUser(msg);
        let ratioTotal = await eventMethods.getoverviewNewUser(ratioParams);
        let basisTotal = await eventMethods.getoverviewNewUser(basisParams);
        const ratioTotalTo = ratioTotal > 0 ? ratioTotal : 1;
        const basisTotalTo = basisTotal > 0 ? basisTotal : 1;
        let ratioper_cent = commen.compose(commen.currytoDecimal(2), commen.curryMul(100), commen.curryDiv(ratioTotalTo), commen.currySub)
        let basisper_cent = commen.compose(commen.currytoDecimal(2), commen.curryMul(100), commen.curryDiv(basisTotalTo), commen.currySub)
        const ratio = ratioper_cent(newUserTotal, ratioTotal);
        const basis = basisper_cent(newUserTotal, basisTotal);

        let newUserData = {
            loading: false,
            name: "新增用户数",
            _id: "uewUser",
            conf: "今日",
            number: newUserTotal,
            numbertoDecimal: commen.currytoDecimal(0, newUserTotal),
            unit: "人",
            ratio: {
                trend: parseFloat(ratio) === 0 ? 0 : (parseFloat(ratio) > 0 ? 1 : -1),
                number: ratio + '%'
            },
            basis: {
                trend: parseFloat(basis) === 0 ? 0 : (parseFloat(basis) > 0 ? 1 : -1),
                number: basis + "%"
            }
        }
        Object.assign(responseData, {
            code: 200,
            message: 'ok',
            data: newUserData
        })
        ctx.body = responseData;
        resolve(next())
    },
    /**
     * 概览-日活
     */
    async overviewUserView(ctx, next, resolve) {
        let msg = ctx.request.body;
        let YesterdayTime = moment(msg.time[0]).subtract(1, 'days').format("YYYY-MM-DD");
        let lastWeekTime = moment(msg.time[0]).subtract(7, 'days').format("YYYY-MM-DD");
        let YesterdayTimeParams = {
            teamEn: msg.teamEn,
            time: [YesterdayTime, YesterdayTime]
        };
        let lastWeekTimeParams = {
            teamEn: msg.teamEn,
            time: [lastWeekTime, lastWeekTime]
        };
        let userViewTotal = await eventMethods.getoverviewUserView(msg);
        let YesterdayUserViewTotal = await eventMethods.getoverviewUserView(YesterdayTimeParams);
        let lastWeekUserViewTotal = await eventMethods.getoverviewUserView(lastWeekTimeParams);
        const YesterdayUserViewTotalTo = YesterdayUserViewTotal > 0 ? YesterdayUserViewTotal : 1;
        const lastWeekUserViewTotalTo = lastWeekUserViewTotal > 0 ? lastWeekUserViewTotal : 1;
        let ratioper_cent = commen.compose(commen.currytoDecimal(2), commen.curryMul(100), commen.curryDiv(YesterdayUserViewTotalTo), commen.currySub)
        let basisper_cent = commen.compose(commen.currytoDecimal(2), commen.curryMul(100), commen.curryDiv(lastWeekUserViewTotalTo), commen.currySub)
        const ratio = ratioper_cent(userViewTotal, YesterdayUserViewTotal);
        const basis = basisper_cent(userViewTotal, lastWeekUserViewTotal);

        let userViewData = {
            loading: false,
            name: "日活",
            _id: "uv",
            conf: "今日",
            number: userViewTotal,
            numbertoDecimal: commen.currytoDecimal(0, userViewTotal),
            unit: "人",
            ratio: {
                trend: parseFloat(ratio) === 0 ? 0 : (parseFloat(ratio) > 0 ? 1 : -1),
                number: ratio + '%'
            },
            basis: {
                trend: parseFloat(basis) === 0 ? 0 : (parseFloat(basis) > 0 ? 1 : -1),
                number: basis + "%"
            }
        }
        Object.assign(responseData, {
            code: 200,
            message: 'ok',
            data: userViewData
        })
        ctx.body = responseData;
        resolve(next())
    },
    /**
     * 概览-页面浏览量
     */
    async overviewPageView(ctx, next, resolve) {
        let msg = ctx.request.body;
        let YesterdayTime = moment(msg.time[0]).subtract(1, 'days').format("YYYY-MM-DD");
        let lastWeekTime = moment(msg.time[0]).subtract(7, 'days').format("YYYY-MM-DD");
        let YesterdayTimeParams = {
            teamEn: msg.teamEn,
            time: [YesterdayTime, YesterdayTime]
        };
        let lastWeekTimeParams = {
            teamEn: msg.teamEn,
            time: [lastWeekTime, lastWeekTime]
        };
        let pageViewTotal = await eventMethods.getoverviewPageView(msg);
        let YesterdayPageViewTotal = await eventMethods.getoverviewPageView(YesterdayTimeParams);
        let lastWeekPageViewTotal = await eventMethods.getoverviewPageView(lastWeekTimeParams);
        const YesterdayPageViewTotalTo = YesterdayPageViewTotal > 0 ? YesterdayPageViewTotal : 1;
        const lastWeekPageViewTotalTo = lastWeekPageViewTotal > 0 ? lastWeekPageViewTotal : 1;
        let ratioper_cent = commen.compose(commen.currytoDecimal(2), commen.curryMul(100), commen.curryDiv(YesterdayPageViewTotalTo), commen.currySub)
        let basisper_cent = commen.compose(commen.currytoDecimal(2), commen.curryMul(100), commen.curryDiv(lastWeekPageViewTotalTo), commen.currySub)
        const ratio = ratioper_cent(pageViewTotal, YesterdayPageViewTotal);
        const basis = basisper_cent(pageViewTotal, lastWeekPageViewTotal);

        let pageViewData = {
            loading: false,
            name: "页面浏览量",
            _id: "pv",
            conf: "今日",
            number: pageViewTotal,
            numbertoDecimal: commen.currytoDecimal(0, pageViewTotal),
            unit: "次",
            ratio: {
                trend: parseFloat(ratio) === 0 ? 0 : (parseFloat(ratio) > 0 ? 1 : -1),
                number: ratio + '%'
            },
            basis: {
                trend: parseFloat(basis) === 0 ? 0 : (parseFloat(basis) > 0 ? 1 : -1),
                number: basis + "%"
            }
        }
        Object.assign(responseData, {
            code: 200,
            message: 'ok',
            data: pageViewData
        })
        ctx.body = responseData;
        resolve(next())
    },
    /**
     * 页面分析-每日页面浏览量
     */
    async pageViewByDay(ctx, next, resolve) {
        const msg = ctx.request.body;
        const start_date = moment(msg.time[0]);
        const end_date = moment(msg.time[1]);
        let number = end_date.diff(start_date, "day") + 1;
        const xAxisData = commen.curryArrPushByTime(number)(msg.time[1]);

        const pvData = await eventMethods.getPageViewByDay(msg);
        const seriesData = xAxisData.map(v => {
            
            return pvData[v] ? pvData[v] : 0;
        })
        const sum = seriesData.reduce((total,currentValue)=>total+currentValue,0);
        const averageFunc = commen.compose(commen.currytoDecimal(0),commen.curryDiv);
        const average = averageFunc(number,sum);
        let pageViewData = {
            loading: false,
            xAxisData: xAxisData,
            seriesData: seriesData,
            average:average,
            sum:sum
        }

        Object.assign(responseData, {
            code: 200,
            message: 'ok',
            data: pageViewData
        })
        ctx.body = responseData;
        resolve(next())
    }
}
