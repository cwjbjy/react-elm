import { combineReducers } from "redux";
import Location from "./location";
import BuyCart from './buyCountR';

const rootReducer = combineReducers({
    Location,BuyCart
})


export default rootReducer