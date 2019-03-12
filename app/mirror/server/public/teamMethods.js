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
  
        let query1 =   await Team.find({
            teamOwner:mobile
        }).sort({'meta.buildTime': 1})
        let query2 =   await Team.find({}).sort({'meta.buildTime': 1}).then(( team) => {
            let inTeam = [];
            team.map((item)=>{
                if(item.teamMember.includes(mobile)){
                    inTeam.push(item)
                }
            })
            return inTeam;
        })
        let res = [];
        
       let query = [...query1,...query2];
        query && query[0] ? res = query :res = []
        return res;
    }
}