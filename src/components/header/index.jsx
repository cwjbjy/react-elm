import { NavBar, Icon } from "antd-mobile";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
const Header = (props) => {
  let { left, title, right, history } = props;

  let leftContent = null;
  let rightContent = null;

  const onLeftClick = () => {
    switch (left.type) {
      case "back":
        history.goBack();
        break;
      case "search":
        history.push(left.value);
        break;
      default:
        break;
    }
    console.log("222");
  };

  const onRightClick = () => {
    switch (right.type) {
      case "user":
        history.push(right.value);
        break;
      default:
        break;
    }
  };

  switch (left.type) {
    case "back":
      leftContent = <Icon type="left" />;
      break;
    case "search":
      leftContent = <Icon type="search" />;
      break;
    default:
      leftContent = "";
      break;
  }

  switch (right.type) {
    case "user":
      rightContent = (
        <div className="iconfont icon-user" onClick={onRightClick}></div>
      );
      break;
    default:
      rightContent = "";
      break;
  }

  return (
    <NavBar
      mode="dark"
      icon={leftContent}
      onLeftClick={onLeftClick}
      rightContent={rightContent}
    >
      {title}
    </NavBar>
  );
};

Header.propTypes = {
  left: PropTypes.object,
  title: PropTypes.string,
  right: PropTypes.object,
};

export default withRouter(Header);
