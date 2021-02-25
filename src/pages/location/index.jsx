import Header from "@/components/header/index.jsx";
import { Icon, List } from "antd-mobile";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {useEffect,useState} from 'react';
import * as locationAction from '@/redux/action/locationAction'
import './index.scss'

const Item = List.Item;

const Location = (props) => {
  console.log(props)
  let { history,locationAction } = props;

  const leftConfig = {
    icon: <Icon type="left" />,
    func: () => history.push("/food"),
  };

  const [guess,getGuess] = useState('')

  useEffect(()=>{
    let params = {
      type:'guess'
    }
    locationAction.getLocation(params).then(res=>{
      getGuess(res.name)
    })
  },[locationAction])

  return (
    <div className="location">
      <Header left={leftConfig} center={{ title: "选择地址" }} />
      <List renderHeader={() => "当前定位城市:"} className="my-list">
        <Item arrow="horizontal" onClick={() => {console.log('11')}}>{guess}</Item>
      </List>
    </div>
  );
};

const mapStateToProps = (state)=>{
  return state
}

const mapDispatchToProps = (dispatch)=>{
  return{
    locationAction:bindActionCreators(locationAction,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Location);
