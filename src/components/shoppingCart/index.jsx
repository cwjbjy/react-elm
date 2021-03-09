import "./index.scss";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Toast } from "antd-mobile";

const ShoppingCart = (props) => {
  let { ShopDetail, totalMoney, totalCount } = props;

  const [difference, setDifference] = useState(0);

  useEffect(() => {
    setDifference(totalMoney - ShopDetail.float_minimum_order_amount);
  }, [totalMoney, ShopDetail.float_minimum_order_amount]);

  const failToast = () => {
    Toast.fail("购物车功能未开放");
  };

  return (
    <div className="buy_cart_container">
      <div className="cart_icon_num" onClick={() => failToast()}>
        <div
          className={`cart_icon_container ${
            totalCount !== 0 ? "cartActive" : "defaultCart"
          }`}
        >
          <div className="iconfont icon-gouwuche cart_icon"></div>
          {totalCount !== 0 ? (
            <span className="totalCount">{totalCount}</span>
          ) : (
            ""
          )}
        </div>
        <div className="cart_num">
          <div>¥ {totalMoney}</div>
          <div>配送费¥{ShopDetail.float_delivery_fee}</div>
        </div>
      </div>
      <div
        className={`${difference < 0 ? "" : "gotopay_ac"} gotopay`}
        onClick={() => failToast()}
      >
        <span className="total">
          {difference < 0 ? `还差¥${Math.abs(difference)}起送` : "去结算"}
        </span>
      </div>
    </div>
  );
};

ShoppingCart.propTypes = {
  totalMoney: PropTypes.string,
  totalCount: PropTypes.number,
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(ShoppingCart);
