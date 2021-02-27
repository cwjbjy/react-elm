import HttpClient from './lib/httpClient.js'
import {
    baseUrl
} from './lib/baseUrl.js'

let API = {};

//获取用户单条信息
API.indexEnter = (params) => {
    return HttpClient.get(`${baseUrl}/v2/index_entry`,{
        data:params
    })
}

export default API