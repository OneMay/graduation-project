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
        let userParams = ctx.request.body,teamList=[];
        let teamArr = await teamMethods.findTeamByUser(userParams.mobile);
        teamArr.map((item)=>{
            teamList.push({
                teamEn:item.teamEn,
                teamZn:item.teamZn,
                buildTime:moment(item.meta.buildTime).add(8, 'hours').format('YYYY-MM-DD')
            })
        })
        Object.assign(responseData, {
            code: 200,
            message: 'ok',
            data: teamList
        })
        ctx.body = responseData;
        resolve(next())
    }
}