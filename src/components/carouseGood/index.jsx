import { Carousel, WingBlank } from "antd-mobile";

const carouseGood = () => {
  return (
    <WingBlank>
      <Carousel
        autoplay={false}
      >
        <div key="1" style={{height:100}}>12</div>
        <div key="2">23</div>
        <div key="3">34</div>
      </Carousel>
    </WingBlank>
  );
};

export default carouseGood;
