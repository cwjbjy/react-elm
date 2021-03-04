import "./index.scss";
import PropTypes from "prop-types";
import { Icon } from "antd-mobile";
import { useState } from "react";

const getImgPath = (path) => {
  let suffix;
  if (!path) {
    return "//elm.cangdu.org/img/default.jpg";
  }
  if (path.indexOf("jpeg") !== -1) {
    suffix = ".jpeg";
  } else {
    suffix = ".png";
  }
  let url =
    "/" +
    path.substr(0, 1) +
    "/" +
    path.substr(1, 2) +
    "/" +
    path.substr(3) +
    suffix;
  return "https://fuss10.elemecdn.com" + url;
};

const DoubleMenu = (props) => {
  let { source,callback } = props;
  const [restaurant_category_id, setLeft] = useState(260);

  const leftClick = (id) => {
    setLeft(id);
  };

  const rightContent = source.map((item) => {
    if (item.id === restaurant_category_id) {
      return item.sub_categories.map((child, index) => {
        if (child.level !== 1) {
          return (
            <li key={index} className="subMenu" onClick={()=>callback(child.id,item.name)}>
              <div>{child.name}</div>
              <div>{child.count}</div>
            </li>
          );
        } else {
          return "";
        }
      });
    } else {
      return [];
    }
  });

  return (
    <div className="doubleMenu">
      <div className="menuLeft">
        <ul>
          {source.length !== 0
            ? source.map((item, index) => (
                <li
                  key={index}
                  className={`${
                    restaurant_category_id === item.id ? "itemActive" : ""
                  } listItem`}
                  onClick={() => leftClick(item.id)}
                >
                  <div className="name">
                    <img
                      src={getImgPath(item.image_url)}
                      alt="加载失败"
                      className="menuIcon"
                    ></img>
                    <span className="title">{item.name}</span>
                  </div>
                  <div className="info">
                    <span className="count">{item.count}</span>
                    <Icon type="right" size="xs" color="#ccc" />
                  </div>
                </li>
              ))
            : ""}
        </ul>
      </div>
      <div className="menuRight">
        <ul>{rightContent}</ul>
      </div>
    </div>
  );
};

DoubleMenu.propotypes = {
  source: PropTypes.array,
  callback:PropTypes.func
};

export default DoubleMenu;
