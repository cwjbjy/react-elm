import "./index.scss";
import PropTypes from "prop-types";
import RatingStar from '@/components/ratingStar/index.jsx'

const ShopList = (props) => {
  let { source } = props;
  const imgBaseUrl = "//elm.cangdu.org/img/";
  return (
    <ul>
      {source.map((item, index) => (
        <li key={index} className="shopList">
          <section>
            <img src={imgBaseUrl + item.image_path} alt="加载失败"></img>
          </section>
          <div className="shopInfo">
            <div className="header">
              <div className={`${item.is_premium ? "premium" : ""} name`}>
                {item.name}
              </div>
              <div>
                <ul className="shop_detail_ul">
                  {item.supports.map((item, index) => (
                    <li key={index} className="supports">
                      {item.icon_name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="rating">
                <RatingStar source={item.rating}/>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

ShopList.prototype = {
  source: PropTypes.array,
};

export default ShopList;
