import Header from "@/components/header/index.jsx";
import { Icon } from "antd-mobile";
import { Fragment, useState, useEffect } from "react";
import { readLocal } from "@/utils/local.js";
import { ADDRESS } from "@/constant";
import CarouseGood from "@/components/carouseGood/index.jsx";
import ShopList from '@/components/shopList/index.jsx'
import API from "@/service";
import "./index.scss";
const Home = (props) => {

  let { history } = props;

  const [locationInfo, getLocationInfo] = useState({ name: "请选择地址..." });
  const [goodList, getGoodList] = useState([]);
  const [shopList,getShopList] = useState([])

  useEffect(() => {
    readLocal(ADDRESS).then((res) => {
      if (!res) return;
      getLocationInfo(res[0]);
    });
  }, []);

  useEffect(() => {
    API.indexEnter().then((res) => {
      getGoodList(res);
    });
  }, []);

  useEffect(() => {
    if(!locationInfo.latitude) return;
    const params = {
      latitude: locationInfo.latitude,
      longitude: locationInfo.longitude,
    };
    API.shoppingRestaurants(params).then((res) => {
      getShopList(res)
    });
  }, [locationInfo]);

  const leftConfig = {
    icon: <Icon type="search" />,
    func: () => history.push("/search"),
  };

  const centerConfig = {
    title: locationInfo.name,
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
      <CarouseGood source={goodList} />
      <div className="listTitle">
        <div className="iconfont icon-maijiadianpu"></div>
        <div className="text">附近商家</div>
      </div>
      <ShopList source={shopList}/>
    </Fragment>
  );
};

export default Home;
