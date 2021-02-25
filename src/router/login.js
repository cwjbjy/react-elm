
import {lazy} from "react";
const Location = lazy(()=>import(/* webpackChunkName: "location" */ '@/pages/location/index.jsx'))

const location = [
    {
        path:'/location',
        Component:Location,
        layout:'NONE',
    },
]

export default location