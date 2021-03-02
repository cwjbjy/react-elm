import { ADDRESS } from "../constant";

const initalState = {
    name:'请选择地址...'
}

const Location = (state=initalState,action)=>{
    switch(action.type){
        case ADDRESS:
            return Object.assign(state,action.value)
        default:
            return Object.assign(state,JSON.parse(localStorage.getItem(ADDRESS)))
    }
}

export default Location