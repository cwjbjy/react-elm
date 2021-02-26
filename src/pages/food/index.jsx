import Header from "@/components/header/index.jsx";
import { Icon } from "antd-mobile";
import { Fragment,useState,useEffect } from "react";
import {readLocal} from '@/utils/local.js'
import {ADDRESS} from '@/constant'

const Home = (props) => {
 
  let { history} = props;
  const [title,getTitle] = useState('请选择地址...')
  useEffect(()=>{
    readLocal(ADDRESS).then(res=>{
      getTitle(res[0].name)
    })
  },[])
  const leftConfig = {
    icon: <Icon type="search" />,
    func: () => history.push("/search"),
  };

  const centerConfig = {
    title,
    func: () => history.push("/location"),
  };

  const rightConfig = {
    icon: (
      <div
        className="iconfont icon-user"
        onClick={() => history.push("/user")}
      ></div>
    ),
  };

  return (
    <Fragment>
      <nav>
        <Header left={leftConfig} center={centerConfig} right={rightConfig} />
      </nav>
    </Fragment>
  );
};

export default Home;
