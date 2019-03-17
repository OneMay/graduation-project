const pageMethods = require('../public/pageMethods')
const moment = require('moment');
const commen = require('../public/commen');

let responseData = {
    code: 200,
    message: 'ok',
    data: null
}
module.exports = {
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
        let pageViewTotal = await pageMethods.getoverviewPageView(msg);
        let YesterdayPageViewTotal = await pageMethods.getoverviewPageView(YesterdayTimeParams);
        let lastWeekPageViewTotal = await pageMethods.getoverviewPageView(lastWeekTimeParams);
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

        const pvData = await pageMethods.getPageViewByDay(msg);
        const seriesData = xAxisData.map(v => {
            
            return pvData[v] ? pvData[v] : 0;
        })
        const sum = seriesData.reduce((total,currentValue)=>total+currentValue,0);
        const averageFunc = commen.compose(Math.ceil,commen.curryDiv);
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
    },
    /**
     * 页面分析-每个页面浏览量
     */
    async pageViewByPage(ctx, next, resolve) {
        const msg = ctx.request.body;
        const pvData = await pageMethods.getPageViewByPage(msg);
        const result = pvData.map(v=>{
            return {
                url:v._id,
                pv:v.num_tutorial
            }
        })

        Object.assign(responseData, {
            code: 200,
            message: 'ok',
            data: result
        })
        ctx.body = responseData;
        resolve(next())
    },
    /**
     * 页面分析-单个url的pv
     */
    async pageViewByUrl(ctx, next, resolve) {
        const msg = ctx.request.body;
        const start_date = moment(msg.time[0]);
        const end_date = moment(msg.time[1]);
        let number = end_date.diff(start_date, "day") + 1;
        const xAxisData = commen.curryArrPushByTime(number)(msg.time[1]);

        const pvData = await pageMethods.getPageViewByUrl(msg);
        const seriesData = xAxisData.map(v => {
            
            return pvData[v] ? pvData[v] : 0;
        })
        let pageViewData = {
            xAxisData: xAxisData,
            seriesData: seriesData,
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
     * 页面数据
     */
    async pageData(ctx, next, resolve) {
        const msg = ctx.request.body;
        const data = await pageMethods.getPageData(msg);

        Object.assign(responseData, {
            code: 200,
            message: 'ok',
            data: data
        })
        ctx.body = responseData;
        resolve(next())
    },
}
