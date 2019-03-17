//var moment = require('moment');
//console.log(moment(new Date()).add(8, 'hours').format('YYYY-MM-DD HH:mm:ss'))

const User = require('../models/user');
const userMethods = require('../public/userMethods');
//统一返回格式
let responseData = {
    code: 200,
    message: 'ok',
    data: null
}


module.exports = {
    /**
     * 用户注册
     */
    async addUser(ctx, next, resolve) {
        let newObj = ctx.request.body, newUser;
        let userInfo = await userMethods.findUser(newObj);
        if (userInfo) {
            //数据库有此用户，已经被注册
            Object.assign(responseData, {
                code: 400,
                data: null,
                message: '电话号码已经被注册了'
            });
            ctx.body = responseData;
            resolve(next())
            return;
        } else {
            let user = new User({
                mobile: newObj.mobile,
                password: newObj.password
            });

            newUser = await userMethods.addUser(user);
            Object.assign(responseData, {
                code: 200,
                message: 'ok',
                data: newUser
            })
            ctx.body = responseData;
            resolve(next())
        }

    },
    /**
     * 用户登录
     */
    async userLogin(ctx, next, resolve) {
        let userObj = ctx.request.body;
        let userInfo = await userMethods.login(userObj);
        if (userInfo) {
            ctx.session.user_id = userInfo._id;
            Object.assign(responseData, {
                code: 200,
                message: 'ok',
                data: userInfo
            });
            ctx.cookies.set('userInfo', JSON.stringify({
                _id: userInfo._id,
                mobile:userInfo.mobile
            }), {
                    maxAge: 2 * 60 * 60 * 1000,   // cookie有效时长
                    httpOnly: false,  // 是否只用于http请求中获取
                    overwrite: true
                });
            ctx.body = responseData;
            resolve(next())
            return;

        } else {
            Object.assign(responseData, {
                code: 400,
                message: '账号或者密码错误',
                data: null
            });
            ctx.body = responseData;
            resolve(next())
            return;
        }
    },
    /**
     * 用户登出
     */
    async userLogout(ctx, next, resolve) {
        if (ctx.cookies.get('userInfo')) {
            Object.assign(responseData,{
                code:200,
                message:'退出成功',
                data:null
            })
            ctx.cookies.set('userInfo', null, {
                'httpOnly': false,
                'path': '/'
            });
            ctx.cookies.set('team', null, {
                'httpOnly': false,
                'path': '/'
            });
            delete ctx.session.user_id;
           ctx.body = responseData;
           resolve(next())
            return;
        } else {
            Object.assign(responseData,{
                code:400,
                message:'退出失败',
                data:null
            })
            ctx.body = responseData;
            resolve(next())
            return;
        }
    },
    /**
     * 查找所有用户
     */
    async findAllUser(ctx,next,resolve){
        let userObj = ctx.request.body;
        let userList = await userMethods.findAllUser(userObj.mobile);
        Object.assign(responseData,{
            code:200,
            message:'ok',
            data:userList
        })
        ctx.body = responseData;
        resolve(next())
        return;
    },
    /**
     * 查找不在此团队的用户
     */
    async findNoMemberUser(ctx,next,resolve){
        let msg = ctx.request.body;
        let userList = await userMethods.findNoMemberUser(msg);
        Object.assign(responseData,{
            code:200,
            message:'ok',
            data:userList
        })
        ctx.body = responseData;
        resolve(next())
        return;
    },
    /**
     * 查找在团队的用户
     */
    async findemberUser(ctx,next,resolve){
        let msg = ctx.request.body;
        let userList = await userMethods.findMemberUser(msg);
        Object.assign(responseData,{
            code:200,
            message:'ok',
            data:userList
        })
        ctx.body = responseData;
        resolve(next())
        return;
    }
}