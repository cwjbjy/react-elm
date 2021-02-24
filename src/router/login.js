
import {lazy} from "react";
const Login = lazy(()=>import(/* webpackChunkName: "Login" */ '@/pages/login/index.jsx'))

const login = [
    {
        path:'/login',
        Component:Login,
        layout:'NONE',
    },
]

export default login