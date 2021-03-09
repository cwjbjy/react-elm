import "./index.scss";
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

  return (
    <div className="shop">
      <Header left={leftConfig} center={centerConfig} />
      <ShopDetail source={shopDetailData} />
      <Tabs source={tabs} initialPage={0}>
        <ShopItems source={menuList} loading={loading} shopId={match.params.id}/>
        <div>2</div>
      </Tabs>
    </div>
  );
};



export default Shop;
