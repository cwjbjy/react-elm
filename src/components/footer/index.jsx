import "./index.scss";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const buildGuide = (value) => {
  return value.map((item, index) => (
    <NavLink className="guide_item" key={index} exact to={item.path}>
      {item.icon}
      <div className="guide_title">{item.title}</div>
    </NavLink>
  ));
};

const Footer = (props) => {
  let { source } = props;
  return <div className="guide">{buildGuide(source)}</div>;
};

Footer.prototypes = {
  source: PropTypes.array,
};

export default Footer;
