import Header from "@/components/header/index.jsx";
import { Icon, Button } from "antd-mobile";
import { useEffect, useState, useRef, Fragment } from "react";
import { saveLocal, readLocal, removeLocal } from "@/utils/local.js";
import {HISTORYCITY,ADDRESS} from '@/constant'
import List from "@/components/list/index.jsx";
import API from "@/service/index";
import "./index.scss";

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
  const [group, getGroup] = useState([]);
  const [historyGroup, getHistoryGroup] = useState([]);
  const input = useRef();

  useEffect(() => {
    API.getCity(`${match.params.id}`).then((res) => {
      getCityInfo(res);
    });
  }, [match.params.id]);

  useEffect(() => {
    readLocal(HISTORYCITY).then((res) => {
      if (res == null) return;
      getHistoryGroup(res);
    });
  }, []);

  const onSearch = () => {
    const params = {
      type: "search",
      keyword: input.current.value,
      city_id: cityInfo.id,
    };
    API.getAddress(params).then((res) => {
      if(Array.isArray(res)){
        getGroup(res);
      }else{
        getGroup([])
      }
    });
  };

  const onAddress = async (value) => {
    if (!localStorage.getItem(HISTORYCITY)) {
      saveLocal(HISTORYCITY, value);
    } else {
      await readLocal(HISTORYCITY).then((res) => {
        let arr = res;
        for (let i = 0, len = arr.length; i < len; i++) {
          if (arr[i].name === value.name) {
            return;
          } else {
            arr.push(value);
            localStorage.setItem(HISTORYCITY, JSON.stringify(arr));
            return;
          }
        }
      });
    }
    history.push("/food");
    saveLocal(ADDRESS, value);
  };

  const onItemClick = (value) => {
    history.push("/food");
    saveLocal(ADDRESS, value);
  };

  const onClear = () => {
    removeLocal(HISTORYCITY);
    getHistoryGroup([]);
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
        {group.length === 0 ? (
          <Fragment>
            <div className="historyTitle">搜索历史</div>
            {historyGroup && historyGroup.length === 0 ? (
              <div className="tip">暂无历史数据</div>
            ) : (
              <Fragment>
                <List source={historyGroup} callback={onItemClick} />
                <div className="tip" onClick={onClear}>
                  清空所有
                </div>
              </Fragment>
            )}
          </Fragment>
        ) : (
          <List source={group} callback={onAddress} />
        )}
      </div>
    </div>
  );
};

export default City;
