// import Footer from "../components/footer/index.jsx";
// import menuConfig from '../constant/menu';
import {Component} from 'react'
import { connect } from "react-redux";
import "./App.scss";

class AppHome extends Component{
  componentDidMount(){
    let {Location} = this.props;
    if(!Location.latitude){
      this.props.history.push('/login')
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
        {/* <Footer source={menuConfig}/> */}
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  return state
}

export default connect(mapStateToProps)(AppHome);
