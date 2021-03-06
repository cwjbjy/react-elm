import "./index.scss";
import PropTypes from "prop-types";
import { Component } from "react";
import { CSSTransition } from "react-transition-group";

class BuyCat extends Component {
  constructor() {
    super();
    this.state = {
      foodNum: 0,
    };
  }
  handlerAdd() {
    let { foodNum } = this.state;
    this.setState({
      foodNum: foodNum + 1,
    });
  }
  handlerSubtract() {
    let { foodNum } = this.state;
    this.setState({
      foodNum: foodNum - 1,
    });
  }
  render() {
    let { food } = this.props;
    let { foodNum } = this.state;
    const single = (
      <div className="cart_button">
        <CSSTransition
          in={foodNum}
          timeout={300}
          classNames="leftIcon"
          unmountOnExit
        >
          <div
            className="iconfont icon-jian"
            onClick={this.handlerSubtract.bind(this)}
          ></div>
        </CSSTransition>
        <span className="cart_num">{foodNum ? foodNum : ""}</span>
        <div
          className="iconfont icon-jia"
          onClick={this.handlerAdd.bind(this)}
        ></div>
      </div>
    );
    return (
      <div className="cart_module">
        {food.specifications.length ? "" : single}
      </div>
    );
  }
}

BuyCat.propTypes = {
  food: PropTypes.object,
  shopId: PropTypes.string,
};

export default BuyCat;
