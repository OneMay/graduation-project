const User = require('../models/user');


module.exports={
     async addUser(user){
      let  ruser = await user.save();
        return ruser
    },
    async findUser(user){
        let query =   await User.find({
            mobile: user.mobile
        });
        let res = null;
        query && query[0] ? res = query[0] :res = null
        return res
    },
    async login(user){
        let query =   await User.find({
            mobile: user.mobile,
            password:user.password
        });
        let res = null;
        query && query[0] ? res = query[0] :res = null
        return res
    },
    /**
     * 所有用户 
     */
    async findAllUser(mobile){
        let query =   await User.find({
            mobile: { $ne:mobile}
        },"mobile _id");
        let res = [];
        query && query[0] ? res = query :res = []
        return res
    }
}