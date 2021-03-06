import {lazy} from "react";
const Classify = lazy(()=>import(/* webpackChunkName: "classify" */ '@/pages/classify/index.jsx'))
const Shop = lazy(()=>import(/* webpackChunkName: "shop" */ '@/pages/shop/index.jsx'))

const classify = [
    {
        path:'/classify/:name/:id',
        Component:Classify,
        layout:'NONE',
    },
    {
        path:'/shop/:id',
        Component:Shop,
        layout:'NONE',
    },
]

export default classify