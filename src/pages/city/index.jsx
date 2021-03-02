import Header from "@/components/header/index.jsx";
import { Icon, Button } from "antd-mobile";
import { useEffect, useState, useRef, Fragment } from "react";
import { saveLocal, readLocal, removeLocal } from "@/utils/local.js";
import {HISTORYCITY,ADDRESS} from '@/constant'
import HistoryList from "@/components/historyList/index.jsx";
import API from "@/service/index";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import * as LocationAction from "@/redux/action"
import "./index.scss";

const City = (props) => {

  let { history, match } = props;

  const leftConfig = {
    icon: <Icon type="left" />,
    func: () => history.goBack(),
  };

  const rightConfig = {
    icon: <div className="barRight" onClick={() => history.push("/location")}>切换城市</div>,
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
    props.LocationAction.SET_ADDRESS(value)
    localStorage.setItem(ADDRESS,JSON.stringify(value))
    history.push("/food");
  };

  const onItemClick = (value) => {
    props.LocationAction.SET_ADDRESS(value)
    localStorage.setItem(ADDRESS,JSON.stringify(value))
    history.push("/food");
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
                <HistoryList source={historyGroup} callback={onItemClick} />
                <div className="tip" onClick={onClear}>
                  清空所有
                </div>
              </Fragment>
            )}
          </Fragment>
        ) : (
          <HistoryList source={group} callback={onAddress} />
        )}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch)=>{
  return {
    LocationAction:bindActionCreators(LocationAction,dispatch)
  }
}

export default connect(null,mapDispatchToProps)(City);
