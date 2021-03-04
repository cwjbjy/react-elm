import {lazy} from "react";
const Classify = lazy(()=>import(/* webpackChunkName: "classify" */ '@/pages/classify/index.jsx'))

const classify = [
    {
        path:'/classify/:name/:id',
        Component:Classify,
        layout:'NONE',
    },
]

export default classify