// import Menus from "../components/menus/index.jsx";

import "./App.scss";
// import { Component } from "react";

const AppHome = (props)=>{
  let {routes} = props
  return(
    <div className="AppHome">
      <main>
        {routes}
      </main>
      <footer>footer</footer>
    </div>
  )
}

export default AppHome;
