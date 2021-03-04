import "./index.scss";
import PropTypes from "prop-types";
import { Icon } from "antd-mobile";
import {  useState } from "react";

const SingleList = (props) => {
  let { source,callback} = props;
  const [id, setId] = useState(null);


  const onItem = (value,label) => {
    setId(value);
    callback(value,label)
  };

  return (
    <ul>
      {source.map((item, index) => (
        <li
          key={index}
          className={`${item.value === id ? "selected" : ""} itemStyle`}
          onClick={() => onItem(item.value,item.label)}
        >
          <span>{item.label}</span>
          {item.value === id ? <Icon type="check" color="#3190e8" /> : ""}
        </li>
      ))}
    </ul>
  );
};

SingleList.propTypes = {
  source: PropTypes.arrayOf(PropTypes.shape({
      label:PropTypes.string,
      value:PropTypes.any
  })) ,
  callback:PropTypes.func
};

export default SingleList;
