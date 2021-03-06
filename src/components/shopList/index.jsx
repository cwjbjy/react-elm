import "./index.scss";
import PropTypes from "prop-types";
import RatingStar from "@/components/ratingStar/index.jsx";
import { ActivityIndicator } from "antd-mobile";
import {withRouter} from 'react-router-dom'
import { Fragment } from "react";
import {imgBaseUrl} from '@/constant/config.js'

const zhunshi = (supports) => {
  let zhunStatus;
  if (supports instanceof Array && supports.length) {
    supports.forEach((item) => {
      if (item.icon_name === "准") {
        zhunStatus = true;
      }
    });
  } else {
    zhunStatus = false;
  }
  return zhunStatus;
};

const ShopList = (props) => {
  let { source, loading ,history} = props;

  const goShop = (id)=>{
    history.push(`/shop/${id}`)
  }
  return (
    <Fragment>
      <ul className="shopList">
        {source.map((item, index) => (
          <li key={index} className="listItem" onClick={()=>goShop(item.id)}>
            <section>
              <img src={imgBaseUrl + item.image_path} alt="加载失败"></img>
            </section>
            <div className="shopInfo">
              <div className="header">
                <div className={`${item.is_premium ? "premium" : ""} name`}>
                  {item.name}
                </div>
                <div>
                  <ul className="shop_detail_ul">
                    {item.supports.map((item, index) => (
                      <li key={index} className="supports">
                        {item.icon_name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="rating">
                <RatingStar source={item.rating}>
                  月售{item.recent_order_num}单
                </RatingStar>
                <div className="distribution">
                  {item.delivery_mode ? (
                    <span className="delivery_style delivery_left">
                      {item.delivery_mode.text}
                    </span>
                  ) : (
                    ""
                  )}
                  {zhunshi(item.supports) ? (
                    <span className="delivery_style delivery_right">
                      准时达
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="fee_distance">
                <div className="fee">
                  ¥{item.float_minimum_order_amount}起送
                  <span className="segmentation">/</span>
                  {item.piecewise_agent_fee.tips}
                </div>
                <div className="distance_time">
                  <span className="distance">{item.distance}</span>
                  <span className="segmentation">/</span>
                  <span className="order_time">{item.order_lead_time}</span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <ActivityIndicator toast text="加载中..." animating={loading} />
    </Fragment>
  );
};

ShopList.prototype = {
  source: PropTypes.array,
  loading: PropTypes.bool,
};

export default withRouter(ShopList);
