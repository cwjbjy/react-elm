import Header from "@/components/header/index.jsx";
import { Icon, Button, List } from "antd-mobile";
import { useEffect, useState, useRef } from "react";
import API from "@/service/index";
import "./index.scss";

const Item = List.Item;
const Brief = Item.Brief;

const City = (props) => {
  let { history, match } = props;

  const leftConfig = {
    icon: <Icon type="left" />,
    func: () => history.goBack(),
  };

  const rightConfig = {
    icon: <div onClick={() => history.push("/location")}>切换城市</div>,
  };

  const [cityInfo, getCityInfo] = useState({});
  const input = useRef();

  useEffect(() => {
    API.getCity(`${match.params.id}`).then((res) => {
      getCityInfo(res);
    });
  }, [match.params.id]);

  const onSearch = () => {
    console.log(input.current.value);
  };

  return (
    <div className="city">
      <Header
        left={leftConfig}
        center={{ title: cityInfo.name }}
        right={rightConfig}
      />
      <div className="box">
        <div className="boxContent">
          <input
            type="text"
            ref={input}
            className="normalInput"
            placeholder="输入学校、商务楼、地址"
          />
          <Button
            type="primary"
            onClick={onSearch}
            size="small"
            className="primaryButton"
          >
            查询
          </Button>
        </div>
      </div>
      <div className="box">
      <div className="historyTitle">搜索历史</div>
          <List  className="my-list">
            <Item multipleLine onClick={() => {}}>
              Title <Brief>subtitle</Brief>
            </Item>
            <Item multipleLine onClick={() => {}}>
              Title <Brief>subtitle</Brief>
            </Item>
            <Item multipleLine onClick={() => {}}>
              Title <Brief>subtitle</Brief>
            </Item>
          </List>
          <div className="clear">清空所有</div>
      </div>
    </div>
  );
};

export default City;
