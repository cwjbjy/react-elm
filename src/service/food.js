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

API.category = (params) => {
    return HttpClient.get(`${baseUrl}/shopping/v2/restaurant/category`,{
        data:params
    })
}

API.shoppingRestaurant = (params) => {
    return HttpClient.get(`${baseUrl}/shopping/restaurant/${params}`)
}

API.v2Menu = (params) => {
    return HttpClient.get(`${baseUrl}/shopping/v2/menu`,{
        data:params
    })
}


export default API