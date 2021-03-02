import Footer from "../components/footer/index.jsx";
import menuConfig from '../constant/menu';
import {Component} from 'react'
import { ADDRESS } from "@/constant";
import "./App.scss";

class AppHome extends Component{
  componentDidMount(){
    if(!localStorage.getItem(ADDRESS)){
      this.props.history.push('/location')
    }else if(this.props.location.pathname !== '/food'){
      this.props.history.push('/food')
    }
  }
  render(){
    let {routes} = this.props;
    return(
      <div className="AppHome">
        <main>
          {routes}
        </main>
        <div className="footer"></div>
        <Footer source={menuConfig}/>
      </div>
    )
  }
}

export default AppHome;
