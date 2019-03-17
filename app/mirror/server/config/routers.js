const Router = require('koa-router');
const User = require('../controllers/user');
const SDK = require('../controllers/sdk');
const Team = require('../controllers/team');
const EventView = require('../controllers/eventView');
const PageView = require('../controllers/pageView');

module.exports = function () {
    let router = new Router({
        prefix: '/api'
    });
    // router.use(function (ctx, next) {

    //     if (ctx.session.user_id) {
    //         User.findOne({
    //             _id: ctx.session.user_id
    //         }).then(function (userInfo) {
    //             if (userInfo) {
    //                 ctx.cookies.set('userInfo', JSON.stringify({
    //                     _id: userInfo._id
    //                 }), {
    //                         maxAge: 2 * 60 * 60 * 1000,   // cookie有效时长
    //                         httpOnly: false,  // 是否只用于http请求中获取
    //                         overwrite: true
    //                     });
    //                 next()
    //             } else {
    //                 ctx.cookies.set('userInfo', null, {
    //                     'httpOnly': false,
    //                     'path': '/'
    //                 });
    //                 next()
    //                 return;
    //             }
    //         })
    //     } else {
    //         ctx.cookies.set('userInfo', null, {
    //             'httpOnly': false,
    //             'path': '/'
    //         });
    //         next()
    //         return;
    //     }
    // })
    //注册
    router.post('/user/add', async (ctx, next) => {
        return new Promise(function (resolve, reject) {
            User.addUser(ctx, next, resolve);
        });
    }, function (ctx, next) {
        ctx.body = ctx.body;
    });
    //登录
    router.post('/user/login', async (ctx, next) => {
        return new Promise(function (resolve, reject) {
            User.userLogin(ctx, next, resolve);
        });
    }, function (ctx, next) {
        ctx.body = ctx.body;
    });
    //登出
    router.post('/user/logout', async (ctx, next) => {
        return new Promise(function (resolve, reject) {
            User.userLogout(ctx, next, resolve);
        });
    }, function (ctx, next) {
        ctx.body = ctx.body;
    });
    //所有用户
    router.post('/user/all', async (ctx, next) => {
        return new Promise(function (resolve, reject) {
            User.findAllUser(ctx, next, resolve);
        });
    }, function (ctx, next) {
        ctx.body = ctx.body;
    });
    //sdk
     router.post('/report/send_message/EP_EVENT_BUS', async (ctx, next) => {
        return new Promise(function (resolve, reject) {
            SDK.EP_EVENT_BUS(ctx, next, resolve);
        });
    }, function (ctx, next) {
        ctx.body = ctx.body;
    });
     //添加团队
     router.post('/team/add', async (ctx, next) => {
        return new Promise(function (resolve, reject) {
            Team.teamAdd(ctx, next, resolve);
        });
    }, function (ctx, next) {
        ctx.body = ctx.body;
    });
    //所在的所有团队
    router.post('/team/allIn', async (ctx, next) => {
        return new Promise(function (resolve, reject) {
            Team.findTeamByUser(ctx, next, resolve);
        });
    }, function (ctx, next) {
        ctx.body = ctx.body;
    });
    //不在此团队的用户
    router.post('/user/user_no_in', async (ctx, next) => {
        return new Promise(function (resolve, reject) {
            User.findNoMemberUser(ctx, next, resolve);
        });
    }, function (ctx, next) {
        ctx.body = ctx.body;
    });
    //在此团队的用户
    router.post('/user/user_in', async (ctx, next) => {
        return new Promise(function (resolve, reject) {
            User.findemberUser(ctx, next, resolve);
        });
    }, function (ctx, next) {
        ctx.body = ctx.body;
    });
    //更新此团队的用户
    router.post('/team/update_member', async (ctx, next) => {
        return new Promise(function (resolve, reject) {
            Team.updateMember(ctx, next, resolve);
        });
    }, function (ctx, next) {
        ctx.body = ctx.body;
    });
    //概览-累计用户数
    router.post('/overview/userTotal', async (ctx, next) => {
        return new Promise(function (resolve, reject) {
            EventView.overviewUser(ctx, next, resolve);
        });
    }, function (ctx, next) {
        ctx.body = ctx.body;
    });
     //概览-新增用户数
     router.post('/overview/newuserTotal', async (ctx, next) => {
        return new Promise(function (resolve, reject) {
            EventView.overviewNewUser(ctx, next, resolve);
        });
    }, function (ctx, next) {
        ctx.body = ctx.body;
    });
    //概览-日活
    router.post('/overview/userviewTotal', async (ctx, next) => {
        return new Promise(function (resolve, reject) {
            EventView.overviewUserView(ctx, next, resolve);
        });
    }, function (ctx, next) {
        ctx.body = ctx.body;
    });
    //概览-页面浏览量
    router.post('/overview/pageviewTotal', async (ctx, next) => {
        return new Promise(function (resolve, reject) {
            PageView.overviewPageView(ctx, next, resolve);
        });
    }, function (ctx, next) {
        ctx.body = ctx.body;
    });
     //页面分析-每日页面浏览量
     router.post('/pageview/pageviewTotal', async (ctx, next) => {
        return new Promise(function (resolve, reject) {
            PageView.pageViewByDay(ctx, next, resolve);
        });
    }, function (ctx, next) {
        ctx.body = ctx.body;
    });
    //事件分析-日活
    router.post('/event/userview', async (ctx, next) => {
        return new Promise(function (resolve, reject) {
            EventView.userViewByDay(ctx, next, resolve);
        });
    }, function (ctx, next) {
        ctx.body = ctx.body;
    });
    //事件分析-新增用户数
    router.post('/event/newuser', async (ctx, next) => {
        return new Promise(function (resolve, reject) {
            EventView.newUserByDay(ctx, next, resolve);
        });
    }, function (ctx, next) {
        ctx.body = ctx.body;
    });
    //事件分析-人均页面访问量
    router.post('/event/pageaveragebyuser', async (ctx, next) => {
        return new Promise(function (resolve, reject) {
            EventView.pageViewByDayAverage(ctx, next, resolve);
        });
    }, function (ctx, next) {
        ctx.body = ctx.body;
    });
    //事件分析-访问省份分布
    router.post('/event/province', async (ctx, next) => {
        return new Promise(function (resolve, reject) {
            EventView.provinceByDay(ctx, next, resolve);
        });
    }, function (ctx, next) {
        ctx.body = ctx.body;
    });
    //事件分析-访问城市分布
    router.post('/event/city', async (ctx, next) => {
        return new Promise(function (resolve, reject) {
            EventView.cityByDay(ctx, next, resolve);
        });
    }, function (ctx, next) {
        ctx.body = ctx.body;
    });
    //事件分析-访问城市分布
    router.post('/event/OS', async (ctx, next) => {
        return new Promise(function (resolve, reject) {
            EventView.OSByDay(ctx, next, resolve);
        });
    }, function (ctx, next) {
        ctx.body = ctx.body;
    });
    //事件分析-用户访问时间段分布
    router.post('/event/uservisit_time', async (ctx, next) => {
        return new Promise(function (resolve, reject) {
            EventView.userVisitTimeByDay(ctx, next, resolve);
        });
    }, function (ctx, next) {
        ctx.body = ctx.body;
    });
    //页面分析-每个页面的pv
    router.post('/page/pageUrl_pageview', async (ctx, next) => {
        return new Promise(function (resolve, reject) {
            PageView.pageViewByPage(ctx, next, resolve);
        });
    }, function (ctx, next) {
        ctx.body = ctx.body;
    });
    //页面分析-单个URL的pv
    router.post('/page/pageUrl_pageview_url', async (ctx, next) => {
        return new Promise(function (resolve, reject) {
            PageView.pageViewByUrl(ctx, next, resolve);
        });
    }, function (ctx, next) {
        ctx.body = ctx.body;
    });
    //事件分析-用户自定义事件
    router.post('/event/userEvents', async (ctx, next) => {
        return new Promise(function (resolve, reject) {
            EventView.userEvent(ctx, next, resolve);
        });
    }, function (ctx, next) {
        ctx.body = ctx.body;
    });
    //事件分析-单个用户自定义事件使用数
    router.post('/event/userEvent_use', async (ctx, next) => {
        return new Promise(function (resolve, reject) {
            EventView.userEventByOne(ctx, next, resolve);
        });
    }, function (ctx, next) {
        ctx.body = ctx.body;
    });
    //页面数据
    router.post('/data/sdk_page_data', async (ctx, next) => {
        return new Promise(function (resolve, reject) {
            PageView.pageData(ctx, next, resolve);
        });
    }, function (ctx, next) {
        ctx.body = ctx.body;
    });
    //事件数据
    router.post('/data/sdk_event_data', async (ctx, next) => {
        return new Promise(function (resolve, reject) {
            EventView.eventData(ctx, next, resolve);
        });
    }, function (ctx, next) {
        ctx.body = ctx.body;
    });

    return router
};