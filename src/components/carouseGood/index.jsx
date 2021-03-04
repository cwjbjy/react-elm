import { Grid } from "antd-mobile";
import { withRouter } from "react-router-dom";
import './index.scss'

const CarouseGood = (props) => {
  let { source,history } = props;
  const imgBaseUrl = 'https://fuss10.elemecdn.com';
  const config = {
    hasLine:false,
    isCarousel:true
  }
  let data = source.map((item) => ({ icon: imgBaseUrl + item.image_url, text: item.title ,id :item.id}));
  return <Grid data={data} {...config} onClick={(_el) => history.push(`/classify/${_el.text}/${_el.id}`)} />;
};

export default withRouter(CarouseGood);
