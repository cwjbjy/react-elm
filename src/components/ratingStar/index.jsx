import PropTypes from "prop-types";
import "./index.scss";

const RatingStar = (props) => {
  let { source,children } = props;
  const arr = [1, 2, 3, 4, 5];
  return (
    <div className="rating_container">
      <div className="star_container" style={{ position: "absolute" }}>
          {arr.map((item) => (
            <div
              key={item}
              className="iconfont icon-shixinxingxing grey_fill"
            ></div>
          ))}
        </div>
      <div className="star">
        <div className="star_overflow" style={{width: source*120/5 + 'rem'}}>
            <div className="star_container">
            {arr.map((item) => (
                <div
                key={item}
                className="iconfont icon-shixinxingxing orange_fill"
                ></div>
            ))}
            </div>
        </div>
      </div>
      <div className="rating_num">{source}</div>
      <div className="describe">{children}</div>
    </div>
  );
};

RatingStar.prototype = {
  source: PropTypes.number,
};

export default RatingStar;
