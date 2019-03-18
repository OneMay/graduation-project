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
        window.mirrorCommandQueueEvent=  window.mirrorCommandQueueEvent||[];
        window.mirrorCommandQueueEvent.push(data)
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
     * 查找不在此团队的用户
     */
    getNoMemberUser: async (ctx, params) => {
        ctx.$Loading.start();
        let result = await ctx.$http
            .post("api/user/user_no_in", params)
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
     * 查找在此团队的用户
     */
    getMemberUser: async (ctx, params) => {
        ctx.$Loading.start();
        let result = await ctx.$http
            .post("api/user/user_in", params)
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
     * 更新此团队的用户
     */
    updateMemberUser: async (ctx, params) => {
        ctx.$Loading.start();
        let result = await ctx.$http
            .post("api/team/update_member", params)
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
    },
    /**
    * 概览-累计用户数
    */
    getUserTotal: async (ctx, params) => {
        ctx.$Loading.start();
        let result = await ctx.$http
            .post("api/overview/userTotal", params)
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
    * 概览-新增用户数
    */
    getNewUserTotal: async (ctx, params) => {
        ctx.$Loading.start();
        let result = await ctx.$http
            .post("api/overview/newuserTotal", params)
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
    * 概览-日活
    */
    getUserViewTotal: async (ctx, params) => {
        ctx.$Loading.start();
        let result = await ctx.$http
            .post("api/overview/userviewTotal", params)
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
    * 概览-页面浏览量
    */
    getPageViewTotal: async (ctx, params) => {
        ctx.$Loading.start();
        let result = await ctx.$http
            .post("api/overview/pageviewTotal", params)
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
    * 页面分析-页面浏览量
    */
    getPageViewByDayTotal: async (ctx, params) => {
        ctx.$Loading.start();
        let result = await ctx.$http
            .post("api/pageview/pageviewTotal", params)
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
    * 事件分析-日活
    */
    getUserViewByDayTotal: async (ctx, params) => {
        ctx.$Loading.start();
        let result = await ctx.$http
            .post("api/event/userview", params)
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
    * 事件分析-新增用户数
    */
    getNewUserByDayTotal: async (ctx, params) => {
        ctx.$Loading.start();
        let result = await ctx.$http
            .post("api/event/newuser", params)
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
    * 事件分析-人均页面访问量
    */
    getAverageUserPageView: async (ctx, params) => {
        ctx.$Loading.start();
        let result = await ctx.$http
            .post("api/event/pageaveragebyuser", params)
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
    * 事件分析-访问省份分布
    */
    getProvinceData: async (ctx, params) => {
        ctx.$Loading.start();
        let result = await ctx.$http
            .post("api/event/province", params)
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
    * 事件分析-访问城市分布
    */
    getCityData: async (ctx, params) => {
        ctx.$Loading.start();
        let result = await ctx.$http
            .post("api/event/city", params)
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
   * 事件分析-访问操作系统分布
   */
    getOSData: async (ctx, params) => {
        ctx.$Loading.start();
        let result = await ctx.$http
            .post("api/event/OS", params)
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
   * 事件分析-用户访问时间段分布
   */
    getUserVisitTimeData: async (ctx, params) => {
        ctx.$Loading.start();
        let result = await ctx.$http
            .post("api/event/uservisit_time", params)
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
    * 页面分析-每个页面的pv
    */
    getPageViewPage: async (ctx, params) => {
        ctx.$Loading.start();
        let result = await ctx.$http
            .post("api/page/pageUrl_pageview", params)
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
    * 页面分析-单个url的pv
    */
    getPageViewUrl: async (ctx, params) => {
        ctx.$Loading.start();
        let result = await ctx.$http
            .post("api/page/pageUrl_pageview_url", params)
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
    * 事件分析-获取用户自定义事件
    */
    getUserEvents: async (ctx, params) => {
        ctx.$Loading.start();
        let result = await ctx.$http
            .post("api/event/userEvents", params)
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
    * 事件分析-获取单个用户自定义事件使用数
    */
    getUserEventByOne: async (ctx, params) => {
        ctx.$Loading.start();
        let result = await ctx.$http
            .post("api/event/userEvent_use", params)
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
    * 页面数据
    */
    getPageData: async (ctx, params) => {
        ctx.$Loading.start();
        let result = await ctx.$http
            .post("api/data/sdk_page_data", params)
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
    * 事件数据
    */
    getEventData: async (ctx, params) => {
        ctx.$Loading.start();
        let result = await ctx.$http
            .post("api/data/sdk_event_data", params)
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