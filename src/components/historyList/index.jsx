import PropTypes from "prop-types";
import "./index.scss";

const List = (props) => {
  let { source,callback } = props;
  return (
    <ul className="list">
      {source.map((item, index) => (
        <li className="list_item" key={index} onClick={callback.bind("",item)}>
          <div className="title">{item.name}</div>
          <p className="subTitle">{item.address}</p>
        </li>
      ))}
    </ul>
  );
};

List.propTypes = {
  source: PropTypes.array,
  callback:PropTypes.func
};

List.defaultProps = {
    callback:()=>{}
}

export default List;
