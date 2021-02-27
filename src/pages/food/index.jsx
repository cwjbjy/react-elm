import Header from "@/components/header/index.jsx";
import { Icon } from "antd-mobile";
import { Fragment,useState,useEffect } from "react";
import {readLocal} from '@/utils/local.js'
import {ADDRESS} from '@/constant'
import CarouseGood from "@/components/carouseGood/index.jsx"
import API from "@/service"
const Home = (props) => {
 
  let { history} = props;
  const [title,getTitle] = useState('请选择地址...')
  const [goodList,getGoodList] = useState([])
  useEffect(()=>{
    readLocal(ADDRESS).then(res=>{
      getTitle(res[0].name)
    })
  },[])
  useEffect(()=>{
    API.indexEnter().then(res=>{
      getGoodList(res)
    })
  },[])
  const leftConfig = {
    icon: <Icon type="search" />,
    func: () => history.push("/search"),
  };

  const centerConfig = {
    title,
    func: () => history.push("/location"),
  };

  const rightConfig = {
    icon: (
      <div
        className="iconfont icon-user"
        onClick={() => history.push("/user")}
      ></div>
    ),
  };

  return (
    <Fragment>
      <nav>
        <Header left={leftConfig} center={centerConfig} right={rightConfig} />
      </nav>
      <CarouseGood source={goodList}/>
    </Fragment>
  );
};

export default Home;
