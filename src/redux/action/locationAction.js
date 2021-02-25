import API from '@/service/index'

export const getLocation = (params)=>{
    return dispatch=>{
        return API.getLocation(params)
    }
}