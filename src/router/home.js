import { lazy } from "react";

const Home = lazy(()=>import(/* webpackChunkName: "home" */'@/pages/home/index.jsx'))

const home = [
    {
        path:'/home',
        Component:Home,
    },
]

export default home