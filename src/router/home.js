import { lazy } from "react";

const Food = lazy(()=>import(/* webpackChunkName: "food" */'@/pages/food/index.jsx'))
const Search = lazy(()=>import(/* webpackChunkName: "search" */'@/pages/search/index.jsx'))
const Order = lazy(()=>import(/* webpackChunkName: "order" */'@/pages/order/index.jsx'))
const User = lazy(()=>import(/* webpackChunkName: "user" */'@/pages/user/index.jsx'))

const home = [
    {
        path:'/food',
        Component:Food,
    },
    {
        path:'/search',
        Component:Search,
    },
    {
        path:'/order',
        Component:Order,
    },
    {
        path:'/user',
        Component:User,
    },
]

export default home