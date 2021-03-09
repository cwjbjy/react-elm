import { SHOPDETAIL } from "../constant";

const initalState = {
    float_delivery_fee:5,
    float_minimum_order_amount:20
}

const ShopDetail = (state=initalState,action)=>{
    switch (action.type) {
        case SHOPDETAIL:
            
           return Object.assign(state,action.value)
    
        default:
            return state
    }
}

export default ShopDetail