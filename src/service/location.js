import HttpClient from './lib/httpClient.js'
import {
    baseUrl
} from './lib/baseUrl.js'

let API = {};

//获取用户单条信息
API.getLocation = (params) => {
    return HttpClient.get(`${baseUrl}/v1/cities`,{
        data:params
    })
}

export default API