const Router = require('koa-router');
const User = require('../controllers/user');
const SDK = require('../controllers/sdk');
const Team = require('../controllers/team');
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
    return router
};