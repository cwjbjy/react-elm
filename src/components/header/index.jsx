import { NavBar, Icon } from "antd-mobile";
import PropTypes from "prop-types";

const Header = (props) => {
  console.log(props);
  let { left,title } = props;
  return (
    <NavBar
      mode="dark"
      icon={
        left === "back" ? (
          <Icon type="left" />
        ) : left === "search" ? (
          <Icon type="search" />
        ) : (
          ""
        )
      }
      onLeftClick={() => console.log("onLeftClick")}
      rightContent={<div className="iconfont icon-user"></div>}
    >
      {title}
    </NavBar>
  );
};

Header.propTypes = {
  left: PropTypes.string,
  title:PropTypes.string,
};

Header.defaultProps = {
  left: "none",
};

export default Header;
