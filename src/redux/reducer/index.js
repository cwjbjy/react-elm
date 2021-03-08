import { combineReducers } from "redux";
import Location from "./location";
import BuyCat from './buyCatR';

const rootReducer = combineReducers({
    Location,BuyCat
})


export default rootReducer