import Header from "@/components/header/index.jsx";
import Select from "@/components/select/index.jsx";
import DoubleMenu from "@/components/doubleMenu/index.jsx";
import ShopList from '@/components/shopList/index.jsx'
import { Fragment, Component } from "react";
import { Icon } from "antd-mobile";
import "./index.scss";
import API from "@/service";
import { connect } from "react-redux";
class Classify extends Component {
  constructor() {
    super();
    this.state = {
      sortBy: "", //选中的类别
      food: {
        label: "分类",
        value: "food",
      },
      sort: {
        label: "排序",
        value: "sort",
      },
      filter: {
        label: "筛选",
        value: "filter",
      },
      categoryList: [],
      shopList:[],
      loading:false
    };
  }

  componentDidMount() {
    let { Location } = this.props;
    const params = {
      latitude: Location.latitude,
      longitude: Location.longitude,
    };
    this.setState({
      loading:true
    })
    API.category(params).then((res) => {
      this.setState({
        categoryList: res,
      });
    });
    API.shoppingRestaurants(params).then((res) => {
      this.setState({
        shopList:res,
        loading:false
      })
    });
  }

  onChoose(type) {
    let { sortBy } = this.state;
    if (sortBy !== type) {
      this.setState({
        sortBy: type,
      });
    } else {
      this.setState({
        sortBy: "",
      });
    }
  }

  onMeun(id){
    let { Location } = this.props;
    const params = {
      latitude: Location.latitude,
      longitude: Location.longitude,
      restaurant_category_ids:[id]
    };
    this.setState({
      sortBy: "",
      loading:true
    })
    API.shoppingRestaurants(params).then((res) => {
      this.setState({
        shopList:res,
        loading:false
      })
    });
  }

  render() {
    let { history, match } = this.props;
    let { sortBy, food, sort, filter,categoryList,shopList,loading } = this.state;

    const leftConfig = {
      icon: <Icon type="left" />,
      func: () => history.goBack(),
    };

    const centerConfig = {
      title: match.params.name,
    };

    return (
      <Fragment>
        <Header left={leftConfig} center={centerConfig} />
        <div className="selectContainer">
          <Select
            source={food}
            category={sortBy}
            callback={this.onChoose.bind(this)}
          >
            <DoubleMenu source={categoryList} callback={this.onMeun.bind(this)}/>
          </Select>
          <Select
            source={sort}
            category={sortBy}
            callback={this.onChoose.bind(this)}
          >
            222
          </Select>
          <Select
            source={filter}
            category={sortBy}
            callback={this.onChoose.bind(this)}
          >
            333
          </Select>
        </div>
        <ShopList source={shopList} loading={loading}/>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Classify);
