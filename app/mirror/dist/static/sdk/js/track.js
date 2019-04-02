(function (window) {

    var Ajax = {
        get: function (url, fn) {
            // XMLHttpRequest对象用于在后台与服务器交换数据  
            var xhr
            if (window.XMLHttpRequest)//如果有XMLHttpRequest，那就是非IE6浏览器。()里面加window的原因下面会有描述。
            {
                xhr = new XMLHttpRequest();//创建ajax对象
            }
            else//如果没有XMLHttpRequest，那就是IE6浏览器
            {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");//IE6浏览器创建ajax对象
            }
            xhr.open('GET', url, true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
            xhr.onreadystatechange = function () {
                // readyState == 4说明请求已完成
                if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) {
                    // 从服务器获得数据 
                    fn.call(this, xhr.responseText);
                }
            };
            xhr.send();
        },
        // 
        post: function (url, data, fn) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            // 添加http头，发送信息至服务器时内容编码类型
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
                    fn.call(this, xhr.responseText);
                }
            };
            xhr.send(JSON.stringify(data));
        }
    }
    /**
     * 获取当前浏览器信息
     */

    var BrowserMatch = {
        init: function () {
            this.browser = this.getBrowser().browser || "未知浏览器";  //获取浏览器名
            this.version = this.getBrowser().version || "未知浏览器版本号";  //获取浏览器版本
            this.OS = this.getOS() + " " + this.getDigits() || "未知操作系统"; //系统版本号 
            this.browserLanguage = navigator.language || navigator.userLanguage;
            this.browserCharset = document.charset || document.characterSet;
        },
        getOS: function () {  //判断所处操作系统
            var sUserAgent = navigator.userAgent.toLowerCase();

            var isWin = (navigator.platform == "Win32") || (navigator.platform == "Win64") || (navigator.platform == "wow64");

            var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
            if (isMac) return "Mac";
            var isUnix = (navigator.platform == "X11") && !isWin && !isMac;
            if (isUnix) return "Unix";
            var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
            if (bIsIpad) return "ipad";
            var bIsIphoneOs = sUserAgent.match(/iphone/i) == "iphone";
            if (bIsIphoneOs) return "ipad";
            var isLinux = (String(navigator.platform).indexOf("Linux") > -1);
            var bIsAndroid = sUserAgent.toLowerCase().match(/android/i) == "android";
            if (isLinux) {
                if (bIsAndroid) return "Android";
                else return "Linux";
            }
            if (isWin) {

                var isWin2K = sUserAgent.indexOf("Windows nt 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
                if (isWin2K) return "Win2000";
                var isWinXP = sUserAgent.indexOf("Windows nt 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1
                sUserAgent.indexOf("Windows XP") > -1;
                if (isWinXP) return "WinXP";
                var isWin2003 = sUserAgent.indexOf("Windows nt 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
                if (isWin2003) return "Win2003";
                var isWinVista = sUserAgent.indexOf("Windows nt 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
                if (isWinVista) return "WinVista";
                var isWin7 = sUserAgent.indexOf("Windows nt 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
                if (isWin7) return "Win7";
                var isWin8 = sUserAgent.indexOf("windows nt 6.2") > -1 || sUserAgent.indexOf("Windows 8") > -1;
                if (isWin8) return "Win8";
                var isWin10 = sUserAgent.indexOf("windows nt 10.0") > -1 || sUserAgent.indexOf("Windows 10") > -1;
                if (isWin10) return "Win10";
            }
            return "其他";
        },
        getDigits: function () { //判断当前操作系统的版本号 
            var sUserAgent = navigator.userAgent.toLowerCase();
            var is64 = sUserAgent.indexOf("win64") > -1 || sUserAgent.indexOf("wow64") > -1;
            if (is64) {
                return "64位";
            } else {
                return "32位";
            }
        },
        getBrowser: function () {  // 获取浏览器名
            var rMsie = /(msie\s|trident\/7)([\w\.]+)/;
            var rTrident = /(trident)\/([\w.]+)/;
            var rEdge = /(edge)\/([\w.]+)/;//IE

            var rFirefox = /(firefox)\/([\w.]+)/;  //火狐
            var rOpera = /(opera).+version\/([\w.]+)/;  //旧Opera
            var rNewOpera = /(opr)\/(.+)/;  //新Opera 基于谷歌
            var rChrome = /(chrome)\/([\w.]+)/; //谷歌 
            var rUC = /(ubrowser)\/([\w.]+)/;//UC
            var rMaxthon = /(maxthon)\/([\w.]+)/;//遨游
            var r2345 = /(2345explorer)\/([\w.]+)/;//2345
            var rQQ = /(qqbrowser)\/([\w.]+)/;//QQ
            //var rMetasr =  /(metasr)\/([\w.]+)/;//搜狗
            var rSafari = /version\/([\w.]+).*(safari)/;

            var ua = navigator.userAgent.toLowerCase();

            var matchBS, matchBS2;

            //IE 低版
            matchBS = rMsie.exec(ua);
            if (matchBS != null) {
                matchBS2 = rTrident.exec(ua);
                if (matchBS2 != null) {
                    switch (matchBS2[2]) {
                        case "4.0":
                            return {
                                browser:
                                    "Microsoft IE",
                                version: "IE: 8"  //内核版本号
                            };
                            break;
                        case "5.0":
                            return {
                                browser:
                                    "Microsoft IE",
                                version: "IE: 9"
                            };
                            break;
                        case "6.0":
                            return {
                                browser:
                                    "Microsoft IE",
                                version: "IE: 10"
                            };
                            break;
                        case "7.0":
                            return {
                                browser:
                                    "Microsoft IE",
                                version: "IE: 11"
                            };
                            break;
                        default:
                            return {
                                browser:
                                    "Microsoft IE",
                                version: "Undefined"
                            };
                    }
                } else {
                    return {
                        browser: "Microsoft IE",
                        version: "IE:" + matchBS[2] || "0"
                    };
                }
            }
            //IE最新版
            matchBS = rEdge.exec(ua);
            if ((matchBS != null) && (!(window.attachEvent))) {
                return {
                    browser: "Microsoft Edge",
                    version: "Edge/" + matchBS[2] || "0"
                };
            }
            //UC浏览器					  
            matchBS = rUC.exec(ua);
            if ((matchBS != null) && (!(window.attachEvent))) {
                return {
                    browser: "UC",
                    version: "ubrowser/" + matchBS[2] || "0"
                };
            }
            //火狐浏览器
            matchBS = rFirefox.exec(ua);
            if ((matchBS != null) && (!(window.attachEvent))) {
                return {
                    browser: "火狐",
                    version: "Firefox/" + matchBS[2] || "0"
                };
            }
            //Oper浏览器					 
            matchBS = rOpera.exec(ua);
            if ((matchBS != null) && (!(window.attachEvent))) {
                return {
                    browser: "Opera",
                    version: "Opera/" + matchBS[2] || "0"
                };
            }
            //遨游
            matchBS = rMaxthon.exec(ua);
            if ((matchBS != null) && (!(window.attachEvent))) {
                return {
                    browser: "遨游",
                    version: "Maxthon/" + matchBS[2] || "0"
                };
            }
            //2345浏览器					  
            matchBS = r2345.exec(ua);
            if ((matchBS != null) && (!(window.attachEvent))) {
                return {
                    browser: "2345",
                    version: "2345explorer/ " + matchBS[2] || "0"
                };
            }
            //QQ浏览器					  
            matchBS = rQQ.exec(ua);
            if ((matchBS != null) && (!(window.attachEvent))) {
                return {
                    browser: "QQ",
                    version: "qqbrowser/" + matchBS[2] || "0"
                };
            }
            //Safari（苹果）浏览器
            matchBS = rSafari.exec(ua);
            if ((matchBS != null) && (!(window.attachEvent)) && (!(window.chrome)) && (!(window.opera))) {
                return {
                    browser: "Safari",
                    version: "Safari(win版)/" + matchBS[1] || "0"
                };
            }
            //谷歌浏览器
            matchBS = rChrome.exec(ua);
            if ((matchBS != null) && (!(window.attachEvent))) {
                matchBS2 = rNewOpera.exec(ua);
                if (matchBS2 == null) {
                    return {
                        browser: "Chrome",
                        version: "Chrome/" + matchBS[2] || "0"
                    };
                } else {
                    return {
                        browser: "Opera",
                        version: "opr/" + matchBS2[2] || "0"
                    };
                }
            }else{
                return {
                    browser:"",
                    version: "" 
                };
            }
        }
    };
    BrowserMatch.init();

    //url变化监听器
    var oldLocation = window.location.href;
    var postMirrorData = {
        eventType: "pageView",
        timeFormat: '',
        time: '',
        entities: {
            browserName: BrowserMatch.browser,
            browserVersion: BrowserMatch.version,
            operatingSystem: BrowserMatch.OS,
            browserCharset: BrowserMatch.browserCharset,
            browserLanguage: BrowserMatch.browserLanguage,
            pageTitle: document.title,
            pageUrl: window.location.href,
            previousPageUrl: '/',
            screenHeight: window.screen.height,
            screenWidth: window.screen.width,
            system: '',
            user: '',
            version: '1.0.1'
        }
    }

var previousTime=0,stayTime=0;
    var firstEnter = setInterval(function () {
        if (window.mirrorCommandQueue && JSON.stringify(window.mirrorCommandQueue)!=="{}") {
            postMirrorData.entities.pageTitle = document.title;
            postMirrorData.entities.system  = window.mirrorCommandQueue.system?window.mirrorCommandQueue.system:'';
            postMirrorData.entities.user  = window.mirrorCommandQueue.user?window.mirrorCommandQueue.user:'';
            var data = getNewSomethings()
            postMirrorData.time = data.time;
            postMirrorData.timeFormat = data.timeFormat;
            var newdata = JSON.parse(JSON.stringify(postMirrorData))
            newdata.stayTime = stayTime;
            postPageView(newdata);
            previousTime = (new Date()).getTime();
            clearInterval(firstEnter)
        }
        setInterval(function () {
            if (window.location.href != oldLocation) {
                postMirrorData.eventType = 'pageView';
                postMirrorData.entities.system  = window.mirrorCommandQueue&&window.mirrorCommandQueue.system?window.mirrorCommandQueue.system:'';
                postMirrorData.entities.user  = window.mirrorCommandQueue&&window.mirrorCommandQueue.user?window.mirrorCommandQueue.user:'';
                var data = getNewSomethings()
                postMirrorData.time = data.time;
                postMirrorData.timeFormat = data.timeFormat;
                postMirrorData.entities.pageTitle = document.title
                postMirrorData.entities.pageUrl = window.location.href;
                postMirrorData.entities.previousPageUrl = oldLocation;
                oldLocation = window.location.href;
                var newdata = JSON.parse(JSON.stringify(postMirrorData));
                stayTime = ((new Date()).getTime()-previousTime)/1000;
                newdata.stayTime = stayTime;
                postPageView(newdata)
                previousTime = (new Date()).getTime();
            }
        }, 50)
    }, 150)
    function getNewSomethings() {
        var newTime = new Date();
        return {
            time: newTime.getTime(),
            timeFormat: Format(newTime, 'yyyy-MM-dd HH:mm:ss')
        }
    }
    function Format(date, fmt) {
        var o = {
            "M+": date.getMonth() + 1, //月份         
            "d+": date.getDate(), //日         
            "h+": date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, //小时         
            "H+": date.getHours(), //小时         
            "m+": date.getMinutes(), //分         
            "s+": date.getSeconds(), //秒         
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度         
            "S": date.getMilliseconds() //毫秒         
        };
        var week = {
            "0": "/u65e5",
            "1": "/u4e00",
            "2": "/u4e8c",
            "3": "/u4e09",
            "4": "/u56db",
            "5": "/u4e94",
            "6": "/u516d"
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        if (/(E+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[date.getDay() + ""]);
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    }
    var url = '//www.onelgd.com/api/report/send_message/EP_EVENT_BUS';
     //var url = 'http://localhost:8000/api/report/send_message/EP_EVENT_BUS';
    function postPageView(data) {
        Ajax.post(url, data, function (msg) {

        });
    }
    function postMirrorEvent(data) {
        var newdata = JSON.parse(JSON.stringify(postMirrorData))
        newdata.eventType = 'eventView';
        newdata.entities.system  = window.mirrorCommandQueue&&window.mirrorCommandQueue.system?window.mirrorCommandQueue.system:'';
        newdata.entities.user  = window.mirrorCommandQueue&&window.mirrorCommandQueue.user?window.mirrorCommandQueue.user:'';
        var odata = getNewSomethings()
        newdata.time = odata.time;
        newdata.timeFormat = odata.timeFormat;
        newdata.entities.action = data.action;
        newdata.entities.category = data.category;
        Ajax.post(url, newdata, function (msg) {

        });
    }

    setInterval(function(){
        var mirrorCommandQueueEvent = window.mirrorCommandQueueEvent||[];
        mirrorCommandQueueEvent.map(function(value){
            postMirrorEvent(value)
        })
        window.mirrorCommandQueueEvent = []
    },100)

}(window))