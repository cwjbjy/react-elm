import "./index.scss";
import PropTypes from "prop-types";
import { useState, Fragment } from "react";

const Tabs = (props) => {
  let { source, initialPage } = props;
  const [current, setCurrent] = useState(initialPage || 0);

  const onItem = (value) => {
    setCurrent(value);
  };
  return (
    <Fragment>
      <ul className="tabs">
        {source.map((item, index) => (
          <li
            key={index}
            className={`${current === index ? "tab_active" : ""} tab`}
            onClick={() => onItem(index)}
          >
            <span>{item.title}</span>
          </li>
        ))}
      </ul>
      <div className="content">
        {props.children.map((item, index) => (index === current ? item : ""))}
      </div>
    </Fragment>
  );
};

Tabs.propTypes = {
  source: PropTypes.array.isRequired,
  initialPage: PropTypes.number,
};

export default Tabs;
