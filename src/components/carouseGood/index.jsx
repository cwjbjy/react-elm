import { Grid } from "antd-mobile";
import './index.scss'

const CarouseGood = (props) => {
  let { source } = props;
  const imgBaseUrl = 'https://fuss10.elemecdn.com';
  const config = {
    hasLine:false,
    isCarousel:true
  }
  let data = source.map((item) => ({ icon: imgBaseUrl + item.image_url, text: item.title }));
  return <Grid data={data} {...config} onClick={(_el) => console.log(_el)} />;
};

export default CarouseGood;
