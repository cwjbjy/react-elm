import Header from "@/components/header/index.jsx";
import { Icon, List } from "antd-mobile";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import * as locationAction from "@/redux/action/locationAction";
import "./index.scss";

const Item = List.Item;

const showItem = (value) =>
  value.map((item, index) => (
    <div className="gridItem" key={index}>
      {item.name}
    </div>
  ));

const showGroup = (value) => {
  let groupList = [];
  for (let key in value) {
    groupList.push(
      <List renderHeader={() => key} className="my-list" key={key}>
        <Item className="">
          {showItem(value[key])}
        </Item>
      </List>
    )
  }
  groupList.sort((a,b)=>{
    return (a.key < b.key) ? -1 : (a.key > b.key) ? 1 : 0
  })
  return groupList
};

const Location = (props) => {
  let { history, locationAction } = props;

  const leftConfig = {
    icon: <Icon type="left" />,
    func: () => history.push("/food"),
  };

  const [guess, getGuess] = useState("");
  const [hot, getHot] = useState([]);
  const [group, getGroup] = useState({});

  useEffect(() => {
    locationAction.getLocation({ type: "guess" }).then((res) => {
      getGuess(res.name);
    });
    locationAction.getLocation({ type: "hot" }).then((res) => {
      getHot(res);
    });
    locationAction.getLocation({ type: "group" }).then((res) => {
      getGroup(res);
    });
  }, [locationAction]);

  return (
    <div className="location">
      <Header left={leftConfig} center={{ title: "选择地址" }} />
      <List renderHeader={() => "当前定位城市:"} className="my-list">
        <Item
          arrow="horizontal"
          onClick={() => {
            console.log("11");
          }}
          className="highlight"
        >
          {guess}
        </Item>
      </List>
      <List renderHeader={() => "热门城市:"} className="my-list">
        <Item className="highlight">{showItem(hot)}</Item>
      </List>
      {showGroup(group)}
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    locationAction: bindActionCreators(locationAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Location);
