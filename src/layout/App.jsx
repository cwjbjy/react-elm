import Footer from "../components/footer/index.jsx";

import "./App.scss";
// import { Component } from "react";

const AppHome = (props)=>{
  let {routes} = props
  return(
    <div className="AppHome">
      <main>
        {routes}
      </main>
      <Footer/>
    </div>
  )
}

export default AppHome;
