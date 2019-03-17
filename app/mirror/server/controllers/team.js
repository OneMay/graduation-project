const Team = require('../models/team');
const teamMethods = require('../public/teamMethods');
const moment = require('moment');
//统一返回格式
let responseData = {
    code: 200,
    message: 'ok',
    data: null
}

module.exports = {
    /**
     * 添加团队
     */
    async teamAdd(ctx, next, resolve) {
        let teamParams = ctx.request.body,resTeam;
        const teamInfo = await teamMethods.findOneTeam(teamParams);
        if(teamInfo){
            Object.assign(responseData, {
                code: 400,
                data: null,
                message: '此团队已经被添加了'
            });
            ctx.body = responseData;
            resolve(next())
            return;
        }else{
            let team = new Team({
                teamZn:teamParams.teamZn,
                teamEn:teamParams.teamEn,
                domainName:teamParams.domainName,
                teamMember:teamParams.teamMember,
                teamOwner:teamParams.mobile
            });
            resTeam = await teamMethods.addTeam(team);
            delete resTeam.teamOwner.password;
            Object.assign(responseData, {
                code: 200,
                message: 'ok',
                data: resTeam
            })
            ctx.body = responseData;
            resolve(next())
        }
    },
    /**
     * 查询用户所在的团队
     */
    async findTeamByUser(ctx,next,resolve){
        let userParams = ctx.request.body,teamList=[],teamNameList=[];
        let teamArr = await teamMethods.findTeamByUser(userParams.mobile);
        teamArr.map((item)=>{
            teamList.push({
                teamEn:item.teamEn,
                teamZn:item.teamZn,
                buildTime:moment(item.meta.buildTime).format('YYYY-MM-DD'),
                teamOwner:item.teamOwner
            })
            teamNameList.push(item.teamEn)
        })
        
        Object.assign(responseData, {
            code: 200,
            message: 'ok',
            data: teamList
        })
        let team = decodeURIComponent(ctx.cookies.get('team'));
        if(teamList.length<=0){
            ctx.cookies.set('team', null, {
                'httpOnly': false,
                'path': '/'
            });
        }else{
            if(typeof ctx.cookies.get('team')!== "undefined"){
                try{
                 let teamObj=JSON.parse(team);
                 teamNameList.includes(teamObj.teamEn)?'':ctx.cookies.set('team', null, {
                     'httpOnly': false,
                     'path': '/'
                 });
     
                }catch(e){
                 ctx.cookies.set('team', null, {
                     'httpOnly': false,
                     'path': '/'
                 });
                }
            }
        }
        
        ctx.body = responseData;
        resolve(next())
    },
    /**
     * 更新此团队的成员
     */
    async updateMember(ctx,next,resolve){
        let msg = ctx.request.body;
        let data = await teamMethods.updateTeamMember(msg);
        if(data.ok){
            Object.assign(responseData,{
                code:200,
                message:'ok',
                data:data
            })
        }else{
            Object.assign(responseData,{
                code:4444,
                message:'失败',
                data:null
            })
        }
        ctx.body = responseData;
        resolve(next())
        return;
    }
}