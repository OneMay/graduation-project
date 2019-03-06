function parserDataToJson(data){
    let newData=null;
    if(typeof (data) == "object" && Object.prototype.toString.call(data).toLowerCase() == "[object object]" && !data.length){
        newData=data;
    }else{
        newData=JSON.parse(data)
    }
    return newData;
}
function getCookie(name) {
    var cookies = document.cookie;
    var list = cookies.split(";");      
    for(var i = 0; i < list.length; i++) {
      var arr = list[i].split("=");         
      if(arr[0] == name)
        return decodeURIComponent(arr[1]);
    } 
    return "";
  }

export {parserDataToJson,getCookie}