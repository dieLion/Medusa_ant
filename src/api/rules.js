import {
    post,
    postDownload
} from '../utils/request'
import {
    URL_POST_LOGIN,
    URL_POST_REGISTERED,
    URL_POST_SCANNING,
    URL_POST_LIST_QUERY,
    URL_POST_INFOMATION_QUERY,
    URL_POST_MEDUSA_QUERY,
    URL_POST_GENERATE_WORD,
    URL_POST_DOWNLOAD_WORD,
    URL_POST_GETINFO,
    URL_POST_UPDATE_PASSWORD,
    URL_POST_HOMEPAGE_DATA
} from './url'


let api = {
    // 登陆接口
    async login(params) {
        let response = await post(URL_POST_LOGIN, params, {
            headers: {}
        })
        return response
    },
    // 注册接口
    async registered(params) {
        let response = await post(URL_POST_REGISTERED, params, {
            headers: {}
        })
        return response
    },
    // 扫描接口
    async scanning(params) {
        let response = await post(URL_POST_SCANNING, params, {
            headers: {}
        })
        return response
    },
    //列表接口
    async list_query(params) {
        let response = await post(URL_POST_LIST_QUERY, params, {
            headers: {}
        })
        return response
    },
    //主动扫描目标漏洞列表查询接口
    async imfomation_query(params) {
        let response = await post(URL_POST_INFOMATION_QUERY, params, {
            headers: {}
        })
        return response
    },
    //获取用户个人信息
    async user_info(params) {
        let response = await post(URL_POST_GETINFO, params, {
            headers: {
            }
        })
        return response
    },
    //更新密码
    async update_password(params){
        let response = await post(URL_POST_UPDATE_PASSWORD,params,{
            headers:{}
        })
        return response
    },
    async homepage_data(params){
        let response = await post(URL_POST_HOMEPAGE_DATA,params,{
            headers:{}
        })
        return response
    }
    ,
    async medusa_query(params) {
        let response = await post(URL_POST_MEDUSA_QUERY, params, {
            headers: {}
        })
        return response
    },
    async generate_word(params) {
        let response = await post(URL_POST_GENERATE_WORD, params, {
            headers: {}
        })
        return response
    },
    async download_word(params) {
        let response = await postDownload(URL_POST_DOWNLOAD_WORD, params, {
            headers: {}
        })
        return response
    }
}

export default api