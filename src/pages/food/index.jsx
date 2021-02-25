import Header from "@/components/header/index.jsx";
import { Icon } from "antd-mobile";
import { Fragment } from "react";
const Home = (props) => {
  
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

export default Home;
