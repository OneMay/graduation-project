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
            ctx.cookies.set('teamEn', null, {
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
    }
}




//文章列表
/**
 * 通过limit(Number)限制每次取到的数据条数，
 * skip():忽略数据的条数
 * 每页显示2条
 * 1:1-2,skip:0->(当前页-1)*limit
 * 2:3-4,skip:2
 * 实现分页
 */
// router.get('/get/membersDemeanorList', function(req, res, next) {
//     var currentPage = parseInt(req.query.currentPage) || 1;
//     var limit = 6;
//     var page = 0;
//     var sum = 0;
//     // var count = 6;
//     // var index = page * count;
//     MembersDemeanor.count().then(function(count) {
//         if (count > 0) {
//             //计算总页数
//             page = Math.ceil(count / limit);
//             //取值不能超过page
//             currentPage = Math.min(currentPage, page)
//                 //取值不能小于1；
//             currentPage = Math.max(currentPage, 1);
//             var skip = (currentPage - 1) * limit;
//             MembersDemeanor.find().sort({ '_id': -1 }).limit(limit).skip(skip).then(function(membersDemeanorListInfo) {
//                 //console.log(productList);
//                 //var results = productList.slice(index,index + count);
//                 var membersDemeanorList = [];
//                 membersDemeanorListInfo.forEach(function(value, index) {
//                     membersDemeanorList.push({
//                         _id: value._id,
//                         title: value.title,
//                         content: value.content,
//                         membersDemeanoPhoto: value.membersDemeanoPhoto,
//                         time: new Date(value.time).Format("yyyy-MM-dd HH:mm:ss"),
//                         number: (currentPage - 1) * 6 + (index + 1)
//                     })
//                     sum = index;
//                 })

//                 responseData.message = '查询成功';
//                 if (sum + 1 == membersDemeanorListInfo.length) {
//                     var membersDemeanorList1 = {
//                             membersDemeanorList,
//                             currentPage: currentPage,
//                             page: page,
//                             count: count,
//                             limit: limit
//                         }
//                         //responseData.productList = productList;
//                     Object.assign(responseData, membersDemeanorList1);
//                     res.json(responseData);
//                 }
//             })
//         } else {
//             responseData.code = '404';
//             responseData.message = '数据库无记录';
//             var membersDemeanorList1 = {
//                     membersDemeanorList: [],
//                     currentPage: 1,
//                     page: page,
//                     count: 0,
//                     limit: limit
//                 }
//                 //responseData.productList = productList;
//             Object.assign(responseData, membersDemeanorList1);
//             return res.json(responseData);
//         }
//     })

// })
