import "./index.scss";
import PropTypes from "prop-types";
import { imgBaseUrl } from "@/constant/config.js";

const ShopDetail = (props) => {
  const { source } = props;
  return (
    <div className="shopDetail">
      <div className="header_cover_img_con">
        <img
          src={imgBaseUrl + source.image_path}
          alt="加载失败"
          className="header_cover_img"
        ></img>
      </div>
      <div className="mask"></div>
      <section>
        <img
          src={imgBaseUrl + source.image_path}
          alt="加载失败"
          className="overImg"
        ></img>
      </section>
      <section className="info">
        <div className="shopName">{source.name}</div>
        <div className="shopDis">
          商家配送／{source.order_lead_time}分钟送达／配送费¥
          {source.float_delivery_fee}
        </div>
        <div>
          {source.promotion_info
            ? source.promotion_info
            : "欢迎光临，用餐高峰期请提前下单，谢谢。"}
        </div>
      </section>
    </div>
  );
};

ShopDetail.propTypes = {
  source: PropTypes.object,
};

export default ShopDetail;
