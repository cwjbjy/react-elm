import { NavBar } from "antd-mobile";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

const Header = (props) => {

  let { left, center, right } = props;
  
  const onCenterClick = ()=>{
      if(!center.func) return;
      center.func()
  }

  return (
    <NavBar
      mode="dark"
      icon={left.icon}
      onLeftClick={left.func}
      rightContent={right.icon}
    >
      <span onClick={onCenterClick}>{center.title}</span>
    </NavBar>
  );
};

Header.propTypes = {
  left: PropTypes.object,
  center:PropTypes.object,
  right: PropTypes.object,
};

Header.defaultProps = {
    right:{icon:''}
}

export default withRouter(Header);
