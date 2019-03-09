
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
    const Days = 30;
    let exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
  },
  //强制保留几位位小数
  toDecimal(num, pos) {
    let f = parseFloat(num);
    if (isNaN(f)) {
      return false;
    }
    f = Math.round(num * 10 * pos) / (10 * pos);
    let s = f.toString();
    let rs = s.indexOf('.');
    if (rs < 0) {
      rs = s.length;
      s += '.';
    }
    while (s.length <= rs + 2) {
      s += '0';
    }
    return s;
  }

}
