import {GOODS} from "../constant";

const initalState = {
    shop_id: { //商店
        category_id: { //分类
            item_id: { //规格
                food_id: {
                    price: 0,
                    name: '',
                    foodNum: 0
                }
            }
        }
    }
}

const BuyCat = (state = initalState, action) => {
    switch (action.type) {
        case GOODS:
            let {
                shop_id, category_id, item_id, food_id, name, price, foodNum
            } = action.value
            let shop = state[shop_id] = (state[shop_id] || {});
            let category = shop[category_id] = (shop[category_id] || {});
            let item = category[item_id] = (category[item_id] || {});
            item[food_id] = {
                name,
                price,
                foodNum
            }
            if (item[food_id].foodNum === 0) {
                item[food_id] = null
            }
            return state
        default:
            return state
    }
}

export default BuyCat