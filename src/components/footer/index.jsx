import "./index.scss";
import { NavLink } from "react-router-dom";

const menuConfig = [
  {
    title: "外卖",
    icon: <div className="iconfont icon-SSS"></div>,
    path: "/food",
  },
  {
    title: "搜索",
    icon: <div className="iconfont icon-icon-zhinanzhen"></div>,
    path: "/search",
  },
  {
    title: "订单",
    icon: <div className="iconfont icon-dingdan"></div>,
    path: "/order",
  },
  {
    title: "我的",
    icon: <div className="iconfont icon-yonghu"></div>,
    path: "/user",
  },
];

const buildGuide = (value) => {
  return value.map((item, index) => (
    <NavLink className="guide_item" key={index} exact to={item.path}>
      {item.icon}
      <div className="guide_title">{item.title}</div>
    </NavLink>
  ));
};

const Footer = () => {
  return <div className="guide">{buildGuide(menuConfig)}</div>;
};

export default Footer;
