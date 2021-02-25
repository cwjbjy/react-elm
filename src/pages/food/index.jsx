import Header from "@/components/header/index.jsx";
import { Fragment } from "react";
const Home = () => {
  const leftConfig = {
    type: "search",
    value: "/login",
  };
  const rightConfig = {
    type: "user",
    value: "/login",
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
