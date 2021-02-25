import {
    ADDRESS
} from "../constant";

const initalState = {
    address: '请选择地址...'
}

const address = (state = initalState, action) => {
    switch (action.type) {
        case ADDRESS:
            return {
                address: action.value
            }
            default:
                return state
    }
}

export default address