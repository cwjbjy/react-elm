// import Header from "../components/header/index.jsx";
// import Menus from "../components/menus/index.jsx";

import "./App.scss";
// import { Component } from "react";

const AppHome = (props)=>{
  console.log(props)
  let {routes} = props
  return(
    <div className="AppHome">
      <header>111</header>
      <main>
        {routes}
      </main>
      <footer>footer</footer>
    </div>
  )
}

// class AppHome extends Component {
//   componentDidMount(){
//     // if(!authMenus){
//     //   this.props.history.push('/login')
//     // } 
//   }
//   render(){
//     let {routes} = this.props
//     return (
//       <div>
//         {/* <Header/> */}
//         <main className="wrapper">
//           <aside>
//             {/* <Menus/> */}
//           </aside>
//           <article>{routes}</article>
//         </main>
//       </div>
//     );
//   }
// };

export default AppHome;
