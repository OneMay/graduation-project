function round(num, decimal) {
  if (isNaN(num)) {
    return 0;
  }
  const p1 = Math.pow(10, decimal + 1);
  const p2 = Math.pow(10, decimal);
  return Math.round(num * p1 / 10) / p2;
}


export default {
  parserDataToJson(data) {
    let newData = null;
    if (typeof (data) === "object" && Object.prototype.toString.call(data).toLowerCase() === "[object object]" && !data.length) {
      newData = data;
    } else {
      newData = JSON.parse(data)
    }
    return newData;
  },
  trim(str) { //删除左右两端的空格
    return str.replace(/(^\s*)|(\s*$)/g, "");
  },
  getCookie(name) {
    const cookies = document.cookie;
    let list = cookies.split(";");
    for (let i = 0; i < list.length; i++) {
      let arr = list[i].split("=");
      if (arr.length > 0 && this.trim(arr[0]) === name) {
        return decodeURIComponent(arr[1]);
      }
    }
    return "";
  },
  setCookie(name, value) {
    const Days = 2;
    let exp = new Date();
    exp.setTime(exp.getTime() + Days * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
  },
  delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    // var cval = getCookie(name);
    // if (cval != null)
      document.cookie = name + "=" + "" + ";expires=" + exp.toGMTString();
  },
  //强制保留几位位小数
  toDecimal(num, decimal) {
    return round(num, decimal).toFixed(decimal);
  },
  //日期格式化
  Format(date, fmt) {
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
  },
  //根据传入的日期进行加减
  changeForDate(date, days) {
    var d = new Date(date);
    d.setDate(d.getDate() + days);
    var m = d.getMonth() + 1;
    return d.getFullYear() + '-' + m + '-' + d.getDate();
  }

}
