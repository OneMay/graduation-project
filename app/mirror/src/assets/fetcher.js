import commenMotheds from "./commen";
export default {
    login: async (ctx, params) => {
        ctx.$Loading.start();
        let result = await ctx.$http
            .post("api/user/login", params)
            .then(res => {
                let data = commenMotheds.parserDataToJson(res.data);
                ctx.$Loading.finish();
                return data;
            })
            .catch(err => {
                console.log(err);
                let data = {
                    code: 4444,
                    data: null,
                    message: '好像出错了哟o(╥﹏╥)o'
                }
                ctx.$Loading.error();
                return data;
            });
        return result;
    },
    register: async (ctx, params) => {
        ctx.$Loading.start();
        let result = await ctx.$http
            .post("api/user/add", params)
            .then(res => {
                let data = commenMotheds.parserDataToJson(res.data);
                ctx.$Loading.finish();
                return data;
            })
            .catch(err => {
                console.log(err);
                let data = {
                    code: 4444,
                    data: null,
                    message: '好像出错了哟o(╥﹏╥)o'
                }
                ctx.$Loading.error();
                return data;
            });
        return result;
    },
    logout: async (ctx) => {
        ctx.$Loading.start();
        let result = await ctx.$http
            .post("api/user/logout")
            .then(res => {
                let data = commenMotheds.parserDataToJson(res.data);
                ctx.$Loading.finish();
                return data;
            })
            .catch(err => {
                console.log(err);
                let data = {
                    code: 4444,
                    data: null,
                    message: '好像出错了哟o(╥﹏╥)o'
                }
                ctx.$Loading.error();
                return data;
            });
        return result;
    },
    postEventViewData: (data) => {
        window.postMirrorEvent(data)

    },
    /**
     * 添加团队
     */
    teamAdd: async (ctx, params) => {
        ctx.$Loading.start();
        let result = await ctx.$http
            .post("api/team/add", params)
            .then(res => {
                let data = commenMotheds.parserDataToJson(res.data);
                ctx.$Loading.finish();
                return data;
            })
            .catch(err => {
                console.log(err);
                let data = {
                    code: 4444,
                    data: null,
                    message: '好像出错了哟o(╥﹏╥)o'
                }
                ctx.$Loading.error();
                return data;
            });
        return result;
    },
    /**
     * 查找所在的所有团队
     */
    findAllTeamIn: async (ctx, params) => {
        ctx.$Loading.start();
        let result = await ctx.$http
            .post("api/team/allIn", params)
            .then(res => {
                let data = commenMotheds.parserDataToJson(res.data);
                ctx.$Loading.finish();
                return data;
            })
            .catch(err => {
                console.log(err);
                let data = {
                    code: 4444,
                    data: null,
                    message: '好像出错了哟o(╥﹏╥)o'
                }
                ctx.$Loading.error();
                return data;
            });
        return result;
    },
     /**
     * 查找所有用户
     */
    findAllUser: async (ctx, params) => {
        ctx.$Loading.start();
        let result = await ctx.$http
            .post("api/user/all", params)
            .then(res => {
                let data = commenMotheds.parserDataToJson(res.data);
                ctx.$Loading.finish();
                return data;
            })
            .catch(err => {
                console.log(err);
                let data = {
                    code: 4444,
                    data: null,
                    message: '好像出错了哟o(╥﹏╥)o'
                }
                ctx.$Loading.error();
                return data;
            });
        return result;
    }
}