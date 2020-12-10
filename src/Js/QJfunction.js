import Vue from 'vue'
let Base64 = require("js-base64").Base64;

//UNix时间转换正常时间并格式化YYYY-MM-DD hh-mm-ss格式时间
const QjUnixTimes = (e) => { 
    let unixTimestamp = new Date(e * 1000);
    let Y = unixTimestamp.getFullYear() + "-";
    let M =
        (unixTimestamp.getMonth() + 1 < 10 ?
            "0" + (unixTimestamp.getMonth() + 1) :
            unixTimestamp.getMonth() + 1) + "-";
    let D =
        unixTimestamp.getDate() + 1 < 10 ?
            "0" + unixTimestamp.getDate() :
            unixTimestamp.getDate();
    let h = unixTimestamp.getHours() + ":";
    let m = unixTimestamp.getMinutes() + ":";
    let s = unixTimestamp.getSeconds();
    let Time = Y + M + D + '\xa0\xa0' + h + m + s;
    return Time;
}
const QJBase64Encode = (e) =>{//加密
    return Base64.encode(e);
}
const QJBase64Decode = (e) =>{//解密
    return Base64.decode(e);
}

export default function (Vue) {
    //添加全局API
    Vue.prototype.$qj = {
        QjUnixTimes,
        QJBase64Encode,
        QJBase64Decode,
    }
}