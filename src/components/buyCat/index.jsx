import "./index.scss";
import PropTypes from "prop-types";
import { Component } from "react";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as buyCatA from "@/redux/action/buyCatA.js";
class BuyCat extends Component {
  constructor() {
    super();
    this.state = {
      foodNum: 0,
    };
  }
  handlerClick(food, shop_id,type) {
    let { foodNum } = this.state;
    let { buyCatA } = this.props;
    this.setState({
        foodNum: type === 'add' ? foodNum + 1 :  foodNum - 1,
    },() => {
        let { foodNum } = this.state;
        let { category_id, item_id } = food;
        let { food_id, price, name } = food.specfoods[0];
        buyCatA.SET_GOODS({
            foodNum,category_id,item_id,food_id,price,name,shop_id
        });
      }
    );
  }

  render() {
    let { food, shopId } = this.props;
    let { foodNum } = this.state;
    let flag = foodNum === 0 ? false : true;
    const single = (
      <div className="cart_button">
        <CSSTransition
          in={flag}
          timeout={300}
          classNames="leftIcon"
          unmountOnExit
        >
          <div
            className="iconfont icon-jian"
            onClick={this.handlerClick.bind(this, food, shopId,'sub')}
          ></div>
        </CSSTransition>
        <span className="cart_num">{foodNum ? foodNum : ""}</span>
        <div
          className="iconfont icon-jia"
          onClick={this.handlerClick.bind(this, food, shopId,'add')}
        ></div>
      </div>
    );
    const multiple = (
      <div className="cart_button">
        <CSSTransition
          in={flag}
          timeout={300}
          classNames="leftIcon"
          unmountOnExit
        >
          <div
            className="iconfont icon-jian"
          ></div>
        </CSSTransition>
        <span className="cart_num">{foodNum ? foodNum : ""}</span>
        {flag ? (
          <div
            className="iconfont icon-jia"
          ></div>
        ) : (
          <div className="show_chooselist">
            选规格
          </div>
        )}
      </div>
    );
    return (
      <div className="cart_module">
        {food.specifications.length ? multiple : single}
      </div>
    );
  }
}

BuyCat.propTypes = {
  food: PropTypes.object,
  shopId: PropTypes.string,
  callback:PropTypes.func
};

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    buyCatA: bindActionCreators(buyCatA, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BuyCat);
