const eventMethods = require('../public/eventMethods')
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
        const newUserNum = newUserTotal[msg.time[0]];
        let ratioTotal = await eventMethods.getoverviewNewUser(ratioParams);
        const rationewUserNum = ratioTotal[ratioParams.time[0]];
        let basisTotal = await eventMethods.getoverviewNewUser(basisParams);
        const basisnewUserNum = basisTotal[basisParams.time[0]];
        const ratioTotalTo = rationewUserNum > 0 ? rationewUserNum : 1;
        const basisTotalTo = basisnewUserNum > 0 ? basisnewUserNum : 1;
        let ratioper_cent = commen.compose(commen.currytoDecimal(2), commen.curryMul(100), commen.curryDiv(ratioTotalTo), commen.currySub)
        let basisper_cent = commen.compose(commen.currytoDecimal(2), commen.curryMul(100), commen.curryDiv(basisTotalTo), commen.currySub)
        const ratio = ratioper_cent(newUserNum, rationewUserNum);
        const basis = basisper_cent(newUserNum, basisnewUserNum);

        let newUserData = {
            loading: false,
            name: "新增用户数",
            _id: "uewUser",
            conf: "今日",
            number: newUserNum,
            numbertoDecimal: commen.currytoDecimal(0, newUserNum),
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
    * 事件分析-日活
    */
    async userViewByDay(ctx, next, resolve) {
        const msg = ctx.request.body;
        const start_date = moment(msg.time[0]);
        const end_date = moment(msg.time[1]);
        let number = end_date.diff(start_date, "day") + 1;
        const xAxisData = commen.curryArrPushByTime(number)(msg.time[1]);

        const uvData = await eventMethods.getUserViewByDay(msg);
        const seriesData = xAxisData.map(v => {

            return uvData[v] ? uvData[v] : 0;
        })
        const sum = seriesData.reduce((total, currentValue) => total + currentValue, 0);
        const averageFunc = commen.compose(Math.ceil, commen.curryDiv);
        const average = averageFunc(number, sum);
        let userViewData = {
            loading: false,
            name: "日活",
            unit: '人',
            xAxisData: xAxisData,
            seriesData: seriesData,
            average: average,
            sum: sum
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
    * 事件分析-新增用户数
    */
    async newUserByDay(ctx, next, resolve) {
        const msg = ctx.request.body;
        const start_date = moment(msg.time[0]);
        const end_date = moment(msg.time[1]);
        let number = end_date.diff(start_date, "day") + 1;
        const xAxisData = commen.curryArrPushByTime(number)(msg.time[1]);

        const seriesData = await new Promise(function (resolve, reject) {
            const arr = []
            xAxisData.map(async (v, index) => {
                let params = {
                    teamEn: msg.teamEn,
                    time: [v, v],
                    buildTime: msg.buildTime
                };
                let data = await eventMethods.getoverviewNewUser(params);
                arr[index] = data[v];

                !arr.includes() && arr.length === number ? resolve(arr) : ''
            })
        });
        const sum = seriesData.reduce((total, currentValue) => total + currentValue, 0);
        const averageFunc = commen.compose(Math.ceil, commen.curryDiv);
        const average = averageFunc(number, sum);
        let newUserData = {
            loading: false,
            name: "新增用户数",
            unit: '人',
            xAxisData: xAxisData,
            seriesData: seriesData,
            average: average,
            sum: sum
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
    * 事件分析-人均页面浏览量(pv/uv)
    */
    async pageViewByDayAverage(ctx, next, resolve) {
        const msg = ctx.request.body;
        const start_date = moment(msg.time[0]);
        const end_date = moment(msg.time[1]);
        let number = end_date.diff(start_date, "day") + 1;
        const xAxisData = commen.curryArrPushByTime(number)(msg.time[1]);

        const uvData = await eventMethods.getUserViewByDay(msg);
        const seriesDataUV = xAxisData.map(v => {

            return uvData[v] ? uvData[v] : 0;
        })

        const pvData = await pageMethods.getPageViewByDay(msg);
        const averageFunc = commen.compose(Math.ceil, commen.curryDiv);
        const seriesDataPV = xAxisData.map(v => {

            return pvData[v] ? pvData[v] : 0;
        })
        const averagePUV = seriesDataPV.map((v, index) => {
            return seriesDataUV[index] > 0 ? averageFunc(seriesDataUV[index], v) : 0;
        })
        const sum = averagePUV.reduce((total, currentValue) => total + currentValue, 0);
        const average = averageFunc(number, sum);
        let userViewData = {
            loading: false,
            name: "人均页面浏览量",
            unit: '次',
            xAxisData: xAxisData,
            seriesData: averagePUV,
            average: average,
            sum: sum
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
    * 事件分析-省份分布
    */
    async provinceByDay(ctx, next, resolve) {
        const msg = ctx.request.body;
        const start_date = moment(msg.time[0]);
        const end_date = moment(msg.time[1]);
        let number = end_date.diff(start_date, "day") + 1;

        const provinceData = await eventMethods.getProvinceByDay(msg);
        const sum = provinceData.length;
        const averageFunc = commen.compose(Math.ceil, commen.curryDiv);
        const average = averageFunc(number, sum);
        let data = {
            loading: false,
            name: "Web访问省份分布",
            unit: '个',
            seriesData: provinceData,
            average: average,
            sum: sum
        }

        Object.assign(responseData, {
            code: 200,
            message: 'ok',
            data: data
        })
        ctx.body = responseData;
        resolve(next())
    },
    /**
    * 事件分析-城市分布
    */
    async cityByDay(ctx, next, resolve) {
        const msg = ctx.request.body;
        const start_date = moment(msg.time[0]);
        const end_date = moment(msg.time[1]);
        let number = end_date.diff(start_date, "day") + 1;

        const cityData = await eventMethods.getCityByDay(msg);
        const sum = cityData.length;
        const averageFunc = commen.compose(Math.ceil, commen.curryDiv);
        const average = averageFunc(number, sum);
        let data = {
            loading: false,
            name: "Web访问城市分布",
            unit: '个',
            seriesData: cityData,
            average: average,
            sum: sum
        }

        Object.assign(responseData, {
            code: 200,
            message: 'ok',
            data: data
        })
        ctx.body = responseData;
        resolve(next())
    },
    /**
    * 事件分析-操作系统分布
    */
    async OSByDay(ctx, next, resolve) {
        const msg = ctx.request.body;
        const start_date = moment(msg.time[0]);
        const end_date = moment(msg.time[1]);
        let number = end_date.diff(start_date, "day") + 1;

        const OSData = await eventMethods.getOsByDay(msg);
        const sum = OSData.length;
        const averageFunc = commen.compose(Math.ceil, commen.curryDiv);
        const average = averageFunc(number, sum);
        let data = {
            loading: false,
            name: "Web访问操作系统分布",
            unit: '种',
            seriesData: OSData,
            average: average,
            sum: sum
        }

        Object.assign(responseData, {
            code: 200,
            message: 'ok',
            data: data
        })
        ctx.body = responseData;
        resolve(next())
    },
    /**
    * 事件分析-用户访问时间段分布
    */
    async userVisitTimeByDay(ctx, next, resolve) {
        const msg = ctx.request.body;
        const start_date = moment(msg.time[0]);
        const end_date = moment(msg.time[1]);
        let number = end_date.diff(start_date, "day") + 1;

        const timeData = await eventMethods.getuserVisitTimeByDay(msg);
        const sum = timeData.length;
        const averageFunc = commen.compose(Math.ceil, commen.curryDiv);
        const average = averageFunc(number, sum);
        let data = {
            loading: false,
            name: "用户访问时间段分布",
            unit: '时间段',
            seriesData: timeData,
            average: average,
            sum: sum
        }

        Object.assign(responseData, {
            code: 200,
            message: 'ok',
            data: data
        })
        ctx.body = responseData;
        resolve(next())
    },
    /**
    * 事件分析-获取用户自定义事件
    */
    async userEvent(ctx, next, resolve) {
        const msg = ctx.request.body;
        const event = await eventMethods.getUserEvent(msg);
        Object.assign(responseData, {
            code: 200,
            message: 'ok',
            data: event
        })
        ctx.body = responseData;
        resolve(next())
    },
    /**
     * 事件分析-单个用户自定义事件使用量
     */
    async userEventByOne(ctx, next, resolve) {
        const msg = ctx.request.body;
        const start_date = moment(msg.time[0]);
        const end_date = moment(msg.time[1]);
        let number = end_date.diff(start_date, "day") + 1;
        const xAxisData = commen.curryArrPushByTime(number)(msg.time[1]);

        const Data = await eventMethods.getUserEventByOne(msg);
        const seriesData = xAxisData.map(v => {

            return Data[v] ? Data[v] : 0;
        })
        let userEventData = {
            xAxisData: xAxisData,
            seriesData: seriesData,
        }

        Object.assign(responseData, {
            code: 200,
            message: 'ok',
            data: userEventData
        })
        ctx.body = responseData;
        resolve(next())
    },
    /**
     * 事件数据
     */
    async eventData(ctx, next, resolve) {
        const msg = ctx.request.body;
        const data = await eventMethods.getEventData(msg);

        Object.assign(responseData, {
            code: 200,
            message: 'ok',
            data: data
        })
        ctx.body = responseData;
        resolve(next())
    },
}
