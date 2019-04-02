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
            _id: "newUser",
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
     * 概览-人均页面浏览量
     */
    async overviewPageViewAverage(ctx, next, resolve) {
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

        const uvDataObj = await eventMethods.getUserViewByDay(msg);
        const uvData =  uvDataObj[msg.time[0]] ?uvDataObj[msg.time[0]] :0
        const pvDataObj= await pageMethods.getPageViewByDay(msg);
        const pvData =  pvDataObj[msg.time[0]] ?pvDataObj[msg.time[0]] :0
        const averageFunc = commen.compose(Math.ceil, commen.curryDiv);
        const averagePUV = averageFunc(uvData, pvData);

        const YesterdayVVDataObj = await eventMethods.getUserViewByDay(YesterdayTimeParams);
        const YesterdayVVData = YesterdayVVDataObj[YesterdayTime] ?YesterdayVVDataObj[YesterdayTime] :0
        const YesterdayVTDataObj = await pageMethods.getPageViewByDay(YesterdayTimeParams);
        let YesterdayVTData = YesterdayVTDataObj[YesterdayTime] ?YesterdayVTDataObj[YesterdayTime]:0
        const  YesterdayVTDataaverage = averageFunc(YesterdayVVData, YesterdayVTData);
        const YesterdayVTDataTotal = YesterdayVTDataaverage>0?YesterdayVTDataaverage:1;


        const lastWeekVVDataObj = await eventMethods.getUserViewByDay(lastWeekTimeParams);
        const lastWeekVVData = lastWeekVVDataObj[lastWeekTime] ?lastWeekVVDataObj[lastWeekTime] :0
        const lastWeekVTDataObj = await pageMethods.getPageViewByDay(lastWeekTimeParams);
        let lastWeekVTData = lastWeekVTDataObj[lastWeekTime] ?lastWeekVTDataObj[lastWeekTime] :0
        const  lastWeekVTDataaverage = averageFunc(lastWeekVVData, lastWeekVTData);
        const lastWeekVTDataTotal = lastWeekVTDataaverage>0?lastWeekVTDataaverage:1;

        let ratioper_cent = commen.compose(commen.currytoDecimal(2), commen.curryMul(100), commen.curryDiv(YesterdayVTDataTotal), commen.currySub)
        let basisper_cent = commen.compose(commen.currytoDecimal(2), commen.curryMul(100), commen.curryDiv(lastWeekVTDataTotal), commen.currySub)
        const ratio = ratioper_cent(averagePUV, YesterdayVTDataaverage );
        const basis = basisper_cent(averagePUV, lastWeekVTDataaverage );
        let visitTimeData = {
            loading: false,
            name: "人均页面浏览量",
            _id: "averagePv",
            conf: "今日",
            number: averagePUV,
            numbertoDecimal: commen.currytoDecimal(0, averagePUV),
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
            data: visitTimeData
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
     /**
     * 事件分析-访问次数
     */
    async visitViewByDay(ctx, next, resolve) {
        const msg = ctx.request.body;
        const start_date = moment(msg.time[0]);
        const end_date = moment(msg.time[1]);
        let number = end_date.diff(start_date, "day") + 1;
        const xAxisData = commen.curryArrPushByTime(number)(msg.time[1]);

        const Data = await eventMethods.getVisitView(msg);
        const seriesData = xAxisData.map(v => {

            return Data[v] ? Data[v] : 0;
        })
        const sum = seriesData.reduce((total, currentValue) => total + currentValue, 0);
        const averageFunc = commen.compose(Math.ceil, commen.curryDiv);
        const average = averageFunc(number, sum);
        let visitViewData = {
            loading: false,
            name: "访问次数",
            unit: '次',
            xAxisData: xAxisData,
            seriesData: seriesData,
            average: average,
            sum: sum
        }

        Object.assign(responseData, {
            code: 200,
            message: 'ok',
            data: visitViewData
        })
        ctx.body = responseData;
        resolve(next())
    },
    /**
     * 概览-访问次数
     */
    async overviewVisitView(ctx, next, resolve) {
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
        let VV = await eventMethods.getVisitView(msg);
        const VVTotal =VV[msg.time[0]] ? VV[msg.time[0]] : 0;
        let YesterdayVVTotal = await eventMethods.getVisitView(YesterdayTimeParams);
        const YesterdayVV =YesterdayVVTotal[YesterdayTime] ? YesterdayVVTotal[YesterdayTime]  : 0;
        let lastWeekVVTotal = await eventMethods.getVisitView(lastWeekTimeParams);
        const lastWeekVV =lastWeekVVTotal[lastWeekTime] ? lastWeekVVTotal[lastWeekTime]  : 0;
        const YesterdayVVTotalTo =YesterdayVVTotal[YesterdayTime]&& YesterdayVVTotal[YesterdayTime] > 0 ? YesterdayVVTotal[YesterdayTime] : 1;
        const lastWeekVVTotalTo = lastWeekVVTotal[lastWeekTime]&&lastWeekVVTotal[lastWeekTime] > 0 ? lastWeekVVTotal[lastWeekTime] : 1;
        let ratioper_cent = commen.compose(commen.currytoDecimal(2), commen.curryMul(100), commen.curryDiv(YesterdayVVTotalTo), commen.currySub)
        let basisper_cent = commen.compose(commen.currytoDecimal(2), commen.curryMul(100), commen.curryDiv(lastWeekVVTotalTo), commen.currySub)
        const ratio = ratioper_cent(VVTotal, YesterdayVV);
        const basis = basisper_cent(VVTotal, lastWeekVV);

        let visitViewData = {
            loading: false,
            name: "访问次数",
            _id: "vv",
            conf: "今日",
            number: VVTotal,
            numbertoDecimal: commen.currytoDecimal(0, VVTotal),
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
            data: visitViewData
        })
        ctx.body = responseData;
        resolve(next())
    },
     /**
     * 事件分析-平均访问时长
     */
    async visitTimeByDay(ctx, next, resolve) {
        const msg = ctx.request.body;
        const start_date = moment(msg.time[0]);
        const end_date = moment(msg.time[1]);
        let number = end_date.diff(start_date, "day") + 1;
        const xAxisData = commen.curryArrPushByTime(number)(msg.time[1]);

        const VVData = await eventMethods.getVisitView(msg);
        const seriesVVData = xAxisData.map(v => {

            return VVData[v] ? VVData[v] : 0;
        })
        const VTData = await eventMethods.getAverageVisitTime(msg);
        let seriesVTData = xAxisData.map(v => {

            return VTData[v] ? VTData[v]['total'] : 0;
        })
        const VTDataNum = xAxisData.map(v => {

            return VTData[v] ? VTData[v]['num'] : 0;
        })
        seriesVVData.map((value,index)=>{
            let div =  commen.curryDiv(VTDataNum[index], seriesVTData[index]);
            let mul = commen.curryMul(div,value);
            let sums = commen.curryAdd(seriesVTData[index],mul) 
            seriesVTData[index] =   commen.currytoDecimal(2, commen.curryDiv(value,sums) ) 
        })
        const sum = seriesVTData.reduce((total, currentValue) =>parseFloat( total) + parseFloat(currentValue), 0);
        const averageFunc = commen.compose(commen.currytoDecimal(2), commen.curryDiv);
        const average = averageFunc(number, sum);
        let visitTimeData = {
            loading: false,
            name: "平均访问时长",
            unit: '秒',
            xAxisData: xAxisData,
            seriesData: seriesVTData,
            average: average,
            sum: sum
        }

        Object.assign(responseData, {
            code: 200,
            message: 'ok',
            data: visitTimeData
        })
        ctx.body = responseData;
        resolve(next())
    },
     /**
     * 概览-平均访问时长
     */
    async overviewVisitTime(ctx, next, resolve) {
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

        const VVDataObj = await eventMethods.getVisitView(msg);
        const VVData = VVDataObj[msg.time[0]] ?VVDataObj[msg.time[0]] :0

        const VTDataObj = await eventMethods.getAverageVisitTime(msg);
        let VTData = VTDataObj[msg.time[0]] ?VTDataObj[msg.time[0]]['total'] :0
        const VTDataNum = VTDataObj[msg.time[0]] ?VTDataObj[msg.time[0]]['num'] :0
        function getValue(VTData,VTDataNum,VVData){
            let div =  commen.curryDiv(VTDataNum,VTData);
            let mul = commen.curryMul(div,VVData);
            let sums = commen.curryAdd(VTData,mul) ;
         return   commen.curryDiv(VVData,sums) 
        }
        VTData = getValue(VTData,VTDataNum,VVData);


        const YesterdayVVDataObj = await eventMethods.getVisitView(YesterdayTimeParams);
        const YesterdayVVData = YesterdayVVDataObj[YesterdayTime] ?YesterdayVVDataObj[YesterdayTime] :0
        const YesterdayVTDataObj = await eventMethods.getAverageVisitTime(YesterdayTimeParams);
        let YesterdayVTData = YesterdayVTDataObj[YesterdayTime] ?YesterdayVTDataObj[YesterdayTime]['total'] :0
        const YesterdayVTDataNum = YesterdayVTDataObj[YesterdayTime] ?YesterdayVTDataObj[YesterdayTime]['num'] :0
        YesterdayVTData = getValue(YesterdayVTData,YesterdayVTDataNum,YesterdayVVData);
        const YesterdayVTDataTotal = YesterdayVTData>0?YesterdayVTData:1;


        const lastWeekVVDataObj = await eventMethods.getVisitView(lastWeekTimeParams);
        const lastWeekVVData = lastWeekVVDataObj[lastWeekTime] ?lastWeekVVDataObj[lastWeekTime] :0
        const lastWeekVTDataObj = await eventMethods.getAverageVisitTime(lastWeekTimeParams);
        let lastWeekVTData = lastWeekVTDataObj[lastWeekTime] ?lastWeekVTDataObj[lastWeekTime]['total'] :0
        const lastWeekVTDataNum = lastWeekVTDataObj[lastWeekTime] ?lastWeekVTDataObj[lastWeekTime]['num'] :0
        lastWeekVTData = getValue(lastWeekVTData,lastWeekVTDataNum,lastWeekVVData);
        const lastWeekVTDataTotal = lastWeekVTData>0?lastWeekVTData:1;

        let ratioper_cent = commen.compose(commen.currytoDecimal(2), commen.curryMul(100), commen.curryDiv(YesterdayVTDataTotal), commen.currySub)
        let basisper_cent = commen.compose(commen.currytoDecimal(2), commen.curryMul(100), commen.curryDiv(lastWeekVTDataTotal), commen.currySub)
        const ratio = ratioper_cent(VTData, YesterdayVTData);
        const basis = basisper_cent(VTData, lastWeekVTData);
        let visitTimeData = {
            loading: false,
            name: "平均访问时长",
            _id: "vt",
            conf: "今日",
            number: VTData,
            numbertoDecimal: commen.currytoDecimal(2, VTData),
            unit: "秒",
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
            data: visitTimeData
        })
        ctx.body = responseData;
        resolve(next())
    },
     /**
     * 概览-平均访问页数
     * 平均访问页数=浏览量/访问次数
     */
    async overviewAverageVisitPage(ctx, next, resolve) {
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

        const VVDataObj = await eventMethods.getVisitView(msg);
        const VVData = VVDataObj[msg.time[0]] ?VVDataObj[msg.time[0]] :0

        const VTDataObj = await pageMethods.getPageViewByDay(msg);
        let VTData = VTDataObj[msg.time[0]] ?VTDataObj[msg.time[0]] :0

        const averageFunc = commen.compose(Math.ceil, commen.curryDiv);
        const averageVP = averageFunc(VVData, VTData);


        const YesterdayVVDataObj = await eventMethods.getVisitView(YesterdayTimeParams);
        const YesterdayVVData = YesterdayVVDataObj[YesterdayTime] ?YesterdayVVDataObj[YesterdayTime] :0
        const YesterdayVTDataObj = await pageMethods.getPageViewByDay(YesterdayTimeParams);
        let YesterdayVTData = YesterdayVTDataObj[YesterdayTime] ?YesterdayVTDataObj[YesterdayTime] :0
        const YesterdayaverageVP = averageFunc(YesterdayVVData, YesterdayVTData);
        const YesterdayVTDataTotal = YesterdayaverageVP>0?YesterdayaverageVP:1;


        const lastWeekVVDataObj = await eventMethods.getVisitView(lastWeekTimeParams);
        const lastWeekVVData = lastWeekVVDataObj[lastWeekTime] ?lastWeekVVDataObj[lastWeekTime] :0
        const lastWeekVTDataObj = await pageMethods.getPageViewByDay(lastWeekTimeParams);
        let lastWeekVTData = lastWeekVTDataObj[lastWeekTime] ?lastWeekVTDataObj[lastWeekTime] :0
        const lastWeekaverageVP = averageFunc(lastWeekVVData, lastWeekVTData);
        const lastWeekVTDataTotal = lastWeekaverageVP>0?lastWeekaverageVP:1;

        let ratioper_cent = commen.compose(commen.currytoDecimal(2), commen.curryMul(100), commen.curryDiv(YesterdayVTDataTotal), commen.currySub)
        let basisper_cent = commen.compose(commen.currytoDecimal(2), commen.curryMul(100), commen.curryDiv(lastWeekVTDataTotal), commen.currySub)
        const ratio = ratioper_cent(averageVP, YesterdayaverageVP);
        const basis = basisper_cent(averageVP, lastWeekaverageVP);
        let visitTimeData = {
            loading: false,
            name: "平均访问页数",
            _id: "vp",
            conf: "今日",
            number: averageVP,
            numbertoDecimal: commen.currytoDecimal(0, averageVP),
            unit: "页",
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
            data: visitTimeData
        })
        ctx.body = responseData;
        resolve(next())
    },
     /**
     * 事件分析-平均访问页数
     */
    async visitPageByDay(ctx, next, resolve) {
        const msg = ctx.request.body;
        const start_date = moment(msg.time[0]);
        const end_date = moment(msg.time[1]);
        let number = end_date.diff(start_date, "day") + 1;
        const xAxisData = commen.curryArrPushByTime(number)(msg.time[1]);

        const VVData = await eventMethods.getVisitView(msg);
        const seriesVVData = xAxisData.map(v => {

            return VVData[v] ? VVData[v] : 0;
        })
        const VTData = await pageMethods.getPageViewByDay(msg);
        let seriesVTData = xAxisData.map(v => {

            return VTData[v] ? VTData[v]: 0;
        })
       
        seriesVVData.map((value,index)=>{
            let div =  commen.curryDiv(value, seriesVTData[index]);
            seriesVTData[index] =   Math.ceil(div )
        })
        const sum = seriesVTData.reduce((total, currentValue) =>parseFloat( total) + parseFloat(currentValue), 0);
        const averageFunc = commen.compose(Math.ceil, commen.curryDiv);
        const average = averageFunc(number, sum);
        let visitTimeData = {
            loading: false,
            name: "平均访问页数",
            unit: '页',
            xAxisData: xAxisData,
            seriesData: seriesVTData,
            average: average,
            sum: sum
        }

        Object.assign(responseData, {
            code: 200,
            message: 'ok',
            data: visitTimeData
        })
        ctx.body = responseData;
        resolve(next())
    },
}