let responseData = {
    code: 200,
    message: 'ok',
    data: null
}

module.exports = {
    /**
     * 用户注册
     */
    async EP_EVENT_BUS(ctx, next, resolve) {
        let msg = ctx.request.body;
        //let userInfo = await userMethods.login(newObj);
        if (true) {
            //数据库有此用户，已经被注册
            Object.assign(responseData, {
                code: 200,
                data: msg,
                message: '电话号码已经被注册了'
            });
            ctx.body = responseData;
            resolve(next())
            return;
        }

    },
}