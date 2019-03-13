const http = require('http');
module.exports = {
    async insertPageView(pageView){
       let  RpageView = await pageView.save();
        return RpageView
    },
    async insertEventView(eventView){
        let  ReventView= await eventView.save();
        return ReventView
    },
    async getIpInfo (ip) {
        const baidu_server_url = 'http://api.map.baidu.com/location/ip?ip='+ip+'&ak=ia6HfFL660Bvh43exmH9LrI6&coor=bd09ll';
        let result=null;
        let data = await new Promise(function(resolve, reject) {
    
            http.get(baidu_server_url, function(res) {
                var code = res.statusCode;
                if (code == 200) {
                    res.on('data', function(data) {
                        try {
                            return resolve(JSON.parse(data))
                        } catch (err) {
                            console.log(err)
                            return resolve(null)
                        }
                    });
                } else {
                    resolve({ code: code });
                }
            }).on('error', function(e) { 
                console.log(err)
               return resolve(null);
             });
        });
        if(data){
            result={
                address:data.content.address,
                province:data.content.address_detail.province,
                city:data.content.address_detail.city
            }
        }else{
            result={
                address:"",
                province:"",
                city:""
            }; 
        }

        return result;
      }
}