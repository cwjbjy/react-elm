import { NavBar } from "antd-mobile";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
const Header = (props) => {
    
  let { left, title, right } = props;

  return (
    <NavBar
      mode="dark"
      icon={left.icon}
      onLeftClick={left.func}
      rightContent={right.icon}
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
