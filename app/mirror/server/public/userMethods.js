const User = require('../models/user');


module.exports={
     async addUser(user){
        user = await user.save();
        return user
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
    }
}