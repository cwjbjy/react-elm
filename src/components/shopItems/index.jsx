import "./index.scss";
import PropTypes from "prop-types";
import React from "react";
import { imgBaseUrl } from "@/constant/config.js";
import { ActivityIndicator } from "antd-mobile";
import { connect } from "react-redux";
import BuyCount from "@/components/buyCount/index.jsx";
import ShoppingCart from "@/components/shoppingCart/index.jsx";
class ShopItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      pre: 0,
      goodsList: {},
      totalMoney: "0.00",
      totalCount: 0,
    };
    this.leftContent = React.createRef();
    this.rightContent = React.createRef();
    this.topList = [];
  }

  onMenuItem(index) {
    this.setState(
      {
        current: index,
      },
      () => {
        let top = document.querySelector(`#food_${this.state.current}`)
          .offsetTop;
        this.rightContent.current.scrollTop = top;
      }
    );
  }
  handleOnScroll(wait) {
    let { pre } = this.state;
    let now = +new Date();
    if (now - pre > wait) {
      if (this.topList.length === 0) {
        document.querySelectorAll(".classiftyList").forEach((item) => {
          this.topList.push(item.offsetTop);
        });
      }
      this.setState(
        {
          pre: now,
        },
        () => {
          this.onRightScroll();
        }
      );
    }
  }

  onRightScroll() {
    let currentTop = this.rightContent.current.scrollTop;
    for (let i = 0, len = this.topList.length; i < len; i++) {
      if (currentTop === 0) {
        this.setState({
          current: 0,
        });
        break;
      }
      if (currentTop < this.topList[i]) {
        this.setState(
          {
            current: i - 1,
          },
          () => {
            console.log("current", this.state.current);
            this.handlerLeftScroll();
          }
        );
        break;
      }
      if (currentTop > this.topList[len - 1]) {
        this.setState({
          current: len - 1,
        });
        break;
      }
    }
  }

  handlerLeftScroll() {
    let leftTop = document.querySelector(".menu_active").offsetTop;
    this.leftContent.current.scrollTop = leftTop;
  }

  onCart(category_id) {
    let { BuyCart, shopId } = this.props;
    let { goodsList } = this.state;
    let num = 0;

    for (let key1 in BuyCart[shopId]) {
      if (category_id === +key1) {
        for (let key2 in BuyCart[shopId][key1]) {
          for (let key3 in BuyCart[shopId][key1][key2]) {
            if (BuyCart[shopId][key1][key2][key3]) {
              num += BuyCart[shopId][key1][key2][key3].foodNum;
            }
          }
        }

        if (Reflect.has(goodsList, key1)) {
          goodsList[key1] = num;
        } else {
          Object.assign(goodsList, { [key1]: num });
        }

        this.setState({
          goodsList,
        });
      }
    }
    this.handlerShoppingCart(BuyCart, shopId);
  }

  handlerShoppingCart(BuyCart, shopId) {
    let totalMoney = 0;
    let totalCount = 0;
    if (BuyCart[shopId]) {
      Object.keys(BuyCart[shopId]).forEach((category_id) => {
        Object.keys(BuyCart[shopId][category_id]).forEach((itemId) => {
          Object.keys(BuyCart[shopId][category_id][itemId]).forEach(
            (foodId) => {
              let foodItem = BuyCart[shopId][category_id][itemId][foodId];
              if (foodItem) {
                totalMoney += foodItem.foodNum * foodItem.price;
                totalCount += foodItem.foodNum;
              }
            }
          );
        });
      });
      this.setState({
        totalMoney: totalMoney.toFixed(2),
        totalCount,
      });
    } else {
      this.setState({
        totalMoney: "0.00",
        totalCount: 0,
      });
    }
  }

  render() {
    let { loading, shopId, source } = this.props;
    let { current, goodsList, totalMoney, totalCount } = this.state;
    return (
      <div className="shopItems">
        <div className="left" ref={this.leftContent}>
          <ul>
            {source.map((item, index) => (
              <li
                key={index}
                className={`${current === index ? "menu_active" : ""} menuItem`}
                onClick={() => this.onMenuItem(index)}
              >
                <span>{item.name}</span>
                {Object.keys(goodsList).length !== 0
                  ? Object.keys(goodsList).map((key) =>
                      +key === item.id ? (
                        <span key={key} className="sign">
                          {goodsList[key] !== 0 ? goodsList[key] : ""}
                        </span>
                      ) : (
                        ""
                      )
                    )
                  : ""}
              </li>
            ))}
          </ul>
        </div>
        <section
          className="right"
          ref={this.rightContent}
          onScrollCapture={this.handleOnScroll.bind(this, 300)}
        >
          {source.map((item, index) => (
            <ul key={index} id={`food_${index}`} className="classiftyList">
              {item.foods.map((food, i) =>
                food.specifications.length === 0 ? (
                  <li key={i} className="food_item">
                    <div className="info">
                      <img
                        src={imgBaseUrl + food.image_path}
                        alt="加载失败"
                        className="foodImg"
                      ></img>
                      <div className="describle">
                        <div className="foodName">{food.name}</div>
                        <div className="foodTips">
                          <span>月售{food.month_sales}份</span>
                          <span className="rate">
                            好评率{food.satisfy_rate}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="count">
                      <div className="food_price">
                        <span>¥</span>
                        <span>{food.specfoods[0].price}</span>
                        {food.specifications.length ? <span>起</span> : ""}
                      </div>
                      <BuyCount
                        food={food}
                        shopId={shopId}
                        callback={this.onCart.bind(this)}
                      />
                    </div>
                  </li>
                ) : (
                  ""
                )
              )}
            </ul>
          ))}
        </section>
        <ShoppingCart totalMoney={totalMoney} totalCount={totalCount} />
        <ActivityIndicator toast text="加载中..." animating={loading} />
      </div>
    );
  }
}

ShopItems.propTypes = {
  source: PropTypes.array,
  loading: PropTypes.bool,
  shopId: PropTypes.string,
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(ShopItems);
