import { combineReducers } from "redux";
import Location from "./location";
import BuyCart from './buyCount';
import ShopDetail from "./shopDetail";

const rootReducer = combineReducers({
    Location,BuyCart,ShopDetail
})


export default rootReducer