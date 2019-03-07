
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
  }

}
