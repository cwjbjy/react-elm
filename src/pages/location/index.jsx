import Header from "@/components/header/index.jsx";
import { Icon, List } from "antd-mobile";
import { useEffect, useState } from "react";
import API from "@/service/index";
import "./index.scss";

const Item = List.Item;

const showItem = (value,callback) =>
  value.map((item, index) => (
    <div
      className="gridItem"
      key={index}
      onClick={callback.bind(this,item.id)}
    >
      {item.name}
    </div>
  ));

const Location = (props) => {
  let { history } = props;

  const leftConfig = {
    icon: <Icon type="left" />,
    func: () => history.goBack(),
  };

  const [guess, getGuess] = useState({});
  const [hot, getHot] = useState([]);
  const [group, getGroup] = useState({});

  useEffect(() => {
    API.getLocation({ type: "guess" }).then((res) => {
      getGuess({ name: res.name, id: res.id });
    });
    API.getLocation({ type: "hot" }).then((res) => {
      getHot(res);
    });
    API.getLocation({ type: "group" }).then((res) => {
      getGroup(res);
    });
  }, []);

  const skip = (id) => {
    history.push(`/city/${id}`);
  }

  const showGroup = (value) => {
    let groupList = [];
    for (let key in value) {
      groupList.push(
        <List renderHeader={() => key} className="my-list" key={key}>
          <Item className="">{showItem(value[key],skip)}</Item>
        </List>
      );
    }
    groupList.sort((a, b) => {
      return a.key < b.key ? -1 : a.key > b.key ? 1 : 0;
    });
    return groupList;
  };

  return (
    <div className="location">
      <Header left={leftConfig} center={{ title: "选择地址" }} />
      <List renderHeader={() => "当前定位城市:"} className="my-list">
        <Item
          arrow="horizontal"
          onClick={() => {
            history.push(`/city/${guess.id}`);
          }}
          className="highlight"
        >
          {guess.name}
        </Item>
      </List>
      <List renderHeader={() => "热门城市:"} className="my-list">
        <Item className="highlight">{showItem(hot,skip)}</Item>
      </List>
      {showGroup(group)}
    </div>
  );
};

export default Location;
