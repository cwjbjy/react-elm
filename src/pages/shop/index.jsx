import "./index.scss";
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import * as buyCatA from '@/redux/action/buyCatA.js'
import { useEffect, useState } from "react";
import API from "@/service";
import ShopDetail from "@/components/shopDetail/index.jsx";
import Header from "@/components/header/index.jsx";
import Tabs from "@/components/tabs/index.jsx";
import ShopItems from "@/components/shopItems/index.jsx";
import { Icon } from "antd-mobile";
const Shop = (props) => {
  let { match, history } = props;
  const [shopDetailData, getShop] = useState({});
  const [menuList, getMenu] = useState([]);
  const [loading,setLoading] = useState(false);
  useEffect(() => {
    const restaurant_id = match.params.id;
    setLoading(true)
    API.shoppingRestaurant(`${restaurant_id}`).then((res) => {
      getShop(res);
    });
    API.v2Menu({ restaurant_id }).then((res) => {
      getMenu(res);
      setLoading(false)
    });
  }, [match.params.id]);

  const leftConfig = {
    icon: <Icon type="left" />,
    func: () => history.goBack(),
  };
  const centerConfig = {
    title: "商家",
  };
  const tabs = [{ title: "商品" }, { title: "评价" }];

  const onFood = ()=>{
    let {BuyCat} = props;
    let arr = menuList;
    for(let key1 in BuyCat){
      if(key1 === match.params.id){
        for(let key2 in BuyCat[key1]){
          for(let i = 0 ,len = arr.length;i< len;i++){
            if(+key2 === arr[i].id){
              let total =  Object.keys(BuyCat[key1][key2]).length;
              arr[i].categoryNum = total;
              break;
            }
          }
        }
      }
    }
    getMenu(arr)
  }
  return (
    <div className="shop">
      <Header left={leftConfig} center={centerConfig} />
      <ShopDetail source={shopDetailData} />
      <Tabs source={tabs} initialPage={0}>
        <ShopItems source={menuList} loading={loading} shopId={match.params.id} callback={onFood}/>
        <div>2</div>
      </Tabs>
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch)=>{
    return {
        buyCatA:bindActionCreators(buyCatA,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Shop);
