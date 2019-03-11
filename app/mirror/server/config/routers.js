const Router = require('koa-router');
const User = require('../controllers/user');
const SDK = require('../controllers/sdk');
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
    // router.post('*',async(ctx,next)=>{
    //     const ip =   ctx.req.headers['x-forwarded-for'] ||
    //        ctx.req.connection.remoteAddress ||
    //        ctx.req.socket.remoteAddress ||
    //        ctx.req.connection.socket.remoteAddress;
    //        console.log( ctx.req.headers['x-forwarded-for']);
    //        next()
         
    //    })
    // var getIpInfo = function(ip, cb) {
    //     var sina_server = 'http://api.map.baidu.com/location/ip?ip='+ip+'&ak=ia6HfFL660Bvh43exmH9LrI6&coor=bd09ll';
    //     var url = sina_server + ip;
    //     http.get(url, function(res) {
    //         var code = res.statusCode;
    //         if (code == 200) {
    //             res.on('data', function(data) {
    //                 try {
    //                     cb(null, JSON.parse(data));
    //                 } catch (err) {
    //                     cb(err);
    //                 }
    //             });
    //         } else {
    //             cb({ code: code });
    //         }
    //     }).on('error', function(e) { cb(e); });
    //   };
      
    //   getIpInfo('220.181.111.85', function(err, msg) {
    //     console.log(msg)
    //     //console.log('城市: ' + msg.city);
    //     //console.log('msg: ' + util.inspect(msg, true, 8));
    //   })
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
    //sdk
     //登出
     router.post('/report/send_message/EP_EVENT_BUS', async (ctx, next) => {
        return new Promise(function (resolve, reject) {
            SDK.EP_EVENT_BUS(ctx, next, resolve);
        });
    }, function (ctx, next) {
        ctx.body = ctx.body;
    });
    return router
};