const Koa = require('koa');
const router = require('./config/routers')();
const cors = require('koa2-cors');
const path = require('path');
const koaBody = require('koa-body');
const staticFiles = require('koa-static')
const session = require('koa-session');


const app = new Koa();
app.use(cors());
app.use(staticFiles(path.resolve(__dirname, ".."),'static'));
app.use(koaBody({
    multipart:true, // 支持文件上传
   // encoding:'gzip',
    multipart:true,
    json:true,
    urlencoded:true,
    formidable:{
      uploadDir:path.join(__dirname,'../static/upload/'), // 设置文件上传目录
      keepExtensions: true,    // 保持文件的后缀
      maxFieldsSize:2 * 1024 * 1024, // 文件上传大小
      onFileBegin:(name,file) => { // 文件上传前的设置
        // console.log(`name: ${name}`);
        // console.log(file);
      },
    }
  }));
app.keys = ['some secret hurr'];
const CONFIG = {
   key: 'koa:sess',   //cookie key (default is koa:sess)
   maxAge: 86400000,  // cookie的过期时间 maxAge in ms (default is 1 days)
   overwrite: true,  //是否可以overwrite    (默认default true)
   httpOnly: false, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
   signed: true,   //签名默认true
   rolling: true,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
   renew: false,  //(boolean) renew session when session is nearly expired,
};
app.use(session(CONFIG, app));

app.use(router.routes());
app.use(router.allowedMethods());
module.exports = app;