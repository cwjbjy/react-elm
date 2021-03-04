import Header from "@/components/header/index.jsx";
import Select from "@/components/select/index.jsx";
import DoubleMenu from "@/components/doubleMenu/index.jsx";
import ShopList from '@/components/shopList/index.jsx';
import SingleList from '@/components/singleList/index.jsx'
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
      categoryList: [],
      shopList:[],
      loading:false,
      restaurant_category_ids:[],
      sortList:[
        {
          label:'智能排序',
          value:4
        },
        {
          label:'距离最近',
          value:5
        },
        {
          label:'销量最高',
          value:6
        },
        {
          label:'起送价最低',
          value:1
        },
        {
          label:'配送速度最快',
          value:2
        },
        {
          label:'评分最高',
          value:3
        },
      ]
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

  onMeun(id,label){
    let { Location } = this.props;
    const params = {
      latitude: Location.latitude,
      longitude: Location.longitude,
      restaurant_category_ids:[id]
    };
    this.setState({
      sortBy: "",
      loading:true,
      restaurant_category_ids:[id],
      food:Object.assign(this.state.food,{label})
    })
    API.shoppingRestaurants(params).then((res) => {
      this.setState({
        shopList:res,
        loading:false
      })
    });
  }

  onSort(id,label){
    let { Location } = this.props;
    let {restaurant_category_ids} = this.state;
    const params = {
      latitude: Location.latitude,
      longitude: Location.longitude,
      restaurant_category_ids,
      order_by:id
    };
    this.setState({
      sortBy: "",
      loading:true,
      sort:Object.assign(this.state.sort,{label})
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
    let { sortBy, food, sort,categoryList,shopList,loading,sortList } = this.state;

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
            <SingleList source={sortList} callback={this.onSort.bind(this)}/>
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
