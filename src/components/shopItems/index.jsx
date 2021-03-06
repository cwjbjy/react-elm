import "./index.scss";
import PropTypes from "prop-types";
import { Fragment } from "react";
import React from "react";
import { imgBaseUrl } from "@/constant/config.js";
import { ActivityIndicator } from "antd-mobile";
import BuyCat from '@/components/buyCat/index.jsx'

class ShopItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      pre: 0,
    };
    this.leftContent = React.createRef();
    this.rightContent = React.createRef();
    this.topList = []
  }

  componentDidMount() {
    document.querySelectorAll(".classiftyList").forEach((item) => {
        this.topList.push(item.offsetTop);
    });
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
        this.setState({
          current: i - 1,
        },()=>{
            this.handlerLeftScroll()
        });
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

  handlerLeftScroll(){
      let leftTop = document.querySelector('.menu_active').offsetTop;
      this.leftContent.current.scrollTop = leftTop
  }

  render() {
    let { source,loading,shopId } = this.props;
    let { current } = this.state;
    return (
      <Fragment>
        <div className="left" ref={this.leftContent}>
          <ul>
            {source.map((item, index) => (
              <li
                key={index}
                className={`${current === index ? "menu_active" : ""} menuItem`}
                onClick={() => this.onMenuItem(index)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
        <section
          className="right"
          ref={this.rightContent}
          onScrollCapture={() => this.handleOnScroll(300)}
        >
          {source.map((item, index) => (
            <ul key={index} id={`food_${index}`} className="classiftyList">
              {item.foods.map((food, i) => (
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
                        <span className="rate">好评率{food.satisfy_rate}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="count">
                    <div className="food_price">
                      <span>¥</span>
                      <span>{food.specfoods[0].price}</span>
                      {food.specifications.length ? <span>起</span> : ""}
                    </div>
                    <BuyCat food={food} shopId={shopId}/>
                  </div>
                </li>
              ))}
            </ul>
          ))}
        </section>
        <ActivityIndicator toast text="加载中..." animating={loading} />
      </Fragment>
    );
  }
}

ShopItems.propTypes = {
  source: PropTypes.array,
  loading:PropTypes.bool,
  shopId:PropTypes.string
};

export default ShopItems;
