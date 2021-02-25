import Footer from "../components/footer/index.jsx";
import menuConfig from '../constant/menu';
import "./App.scss";

const AppHome = (props)=>{
  let {routes} = props
  return(
    <div className="AppHome">
      <main>
        {routes}
      </main>
      <Footer source={menuConfig}/>
    </div>
  )
}

export default AppHome;
