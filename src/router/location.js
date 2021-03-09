
import {lazy} from "react";
const Location = lazy(()=>import(/* webpackChunkName: "location" */ '@/pages/location/index.jsx'))
const City = lazy(()=>import(/* webpackChunkName: "city" */ '@/pages/city/index.jsx'))

const location = [
    {
        path:'/login',
        Component:Location,
        layout:'NONE',
    },
    {
        path:'/city/:id',
        Component:City,
        layout:'NONE',
    },
]

export default location