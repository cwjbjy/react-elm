import Header from "@/components/header/index.jsx";
import { Icon } from "antd-mobile";
import { Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as foodAction from "@/redux/action/foodAction";
const Home = (props) => {
  console.log(props);
  let { history, address } = props;

  const leftConfig = {
    icon: <Icon type="search" />,
    func: () => history.push("/search"),
  };

  const centerConfig = {
    title: address,
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
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return state.address;
};

const mapDispatchToProps = (dispatch) => {
  return {
    foodAction: bindActionCreators(foodAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
