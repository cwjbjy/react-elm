import Header from "@/components/header/index.jsx";
import { Icon } from "antd-mobile";
import { Fragment, useState, useEffect } from "react";
import CarouseGood from "@/components/carouseGood/index.jsx";
import ShopList from '@/components/shopList/index.jsx'
import API from "@/service";
import {connect} from 'react-redux'
import "./index.scss";
const Home = (props) => {

  let { history,Location } = props;

  const [goodList, getGoodList] = useState([]);
  const [shopList,getShopList] = useState([])
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    API.indexEnter().then((res) => {
      getGoodList(res);
    });
  }, []);

  useEffect(() => {
    if(!Location.latitude) return;
    const params = {
      latitude: Location.latitude,
      longitude: Location.longitude,
    };
    setLoading(true)
    API.shoppingRestaurants(params).then((res) => {
      getShopList(res)
      setLoading(false)
    }).catch(()=>{
      setLoading(false)
    });
  }, [Location]);

  const leftConfig = {
    icon: <Icon type="search" />,
    func: () => history.push("/search"),
  };

  const centerConfig = {
    title: Location.name,
    func: () => history.push("/login"),
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
      <CarouseGood source={goodList} />
      <div className="listTitle">
        <div className="iconfont icon-maijiadianpu"></div>
        <div className="text">附近商家</div>
      </div>
      <ShopList source={shopList} loading={loading}/>
    </Fragment>
  );
};

const mapStateToProps = (state)=>{
  return state
}

export default connect(mapStateToProps)(Home);
