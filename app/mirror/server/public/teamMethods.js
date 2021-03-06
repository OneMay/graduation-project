const User = require('../models/user');
const Team = require('../models/team');
module.exports = {
    async addTeam(team){
       let  Rteam = await team.save();
        return Rteam
    },
    async findOneTeam(team){
        let query =   await Team.find({
            teamEn: team.teamEn
        });
        let res = null;
        query && query[0] ? res = query[0] :res = null
        return res
    },
    async findTeamByUser(mobile){
        let query2;
        let query1 =   await Team.find({
            teamOwner:mobile
        }).sort({'meta.buildTime': 1})
        if(mobile!=='15928221807'){
            query2 =   await Team.find({}).sort({'meta.buildTime': 1}).then(( team) => {
                let inTeam = [];
                team.map((item)=>{
                    if(item.teamMember.includes(mobile)){
                        inTeam.push(item)
                    }
                })
                return inTeam;
            })
        }else{
            query2 =   await Team.find({teamOwner:{ $nin: ["15928221807"] }}).sort({'meta.buildTime': 1}).then(( team) => {
                return team;
            })
        }
      
        let res = [];
        
       let query = [...query1,...query2];
        query && query[0] ? res = query :res = []
        return res;
    },
    async updateTeamMember(msg){
  
     let res =   await Team.update({teamEn: msg.teamEn}, {$set: {teamMember: msg.member}}, {multi: false});
        return res;
    }
}