import HttpClient from './lib/httpClient.js'
import {
    baseUrl
} from './lib/baseUrl.js'

let API = {};

API.indexEnter = (params) => {
    return HttpClient.get(`${baseUrl}/v2/index_entry`,{
        data:params
    })
}

API.shoppingRestaurants = (params) => {
    return HttpClient.get(`${baseUrl}/shopping/restaurants`,{
        data:params
    })
}

export default API