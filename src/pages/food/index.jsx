import Header from "@/components/header/index.jsx";
import { Icon } from "antd-mobile";
import { Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as foodAction from "@/redux/action/foodAction";
const Home = (props) => {
  console.log(props)
  let { history } = props;

  const leftConfig = {
    icon: <Icon type="search" />,
    func: () => history.push("/search"),
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
        <Header left={leftConfig} title="请选择地址..." right={rightConfig} />
      </nav>
    </Fragment>
  );
};

const mapStateToProps = (state) =>{
  return state
}

const mapDispatchToProps = (dispatch)=>{
  return {
    foodAction:bindActionCreators(foodAction,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);
