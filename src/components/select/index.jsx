import "./index.scss";
import { Fragment } from "react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";

const Select = (props) => {
  let { source, category, callback } = props;
  let flag = category === source.value;
 
  return (
    <Fragment>
      <div
        className={`${flag ? "selected" : ""} category`}
        onClick={() => callback(source.value)}
      >
        <span className="label">{source.label}</span>
        <div className="iconfont icon-sanjiaoxing arrow"></div>
      </div>
      <CSSTransition
        in={flag}
        timeout={600}
        classNames="selectList"
        unmountOnExit
      >
        <div className="showList">{props.children}</div>
      </CSSTransition>
      {flag ? <div className="back_cover"></div> : ""}
    </Fragment>
  );
};

Select.propTypes = {
  source: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }),
  category: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
};

export default Select;
