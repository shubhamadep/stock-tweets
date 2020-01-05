import React, {Component} from 'react';
import CoinDetailTabs from './CoinDetailTabs'
import CoinDetailScales from './CoinDetailScales'
import CoinPageInfoSection from './CoinPageInfoSection'
import CoinDetailAnalyticCards from './CoinDetailAnalyticCards'
import CoinDetailPriceChart from './Charts/CoinDetailPriceChart';
import { Header, HeaderNav, Footer } from './Layouts';
import { Hidden, Grid, Paper, Container} from '@material-ui/core';
import { CoinDetailPageProvider } from './providers/CoinDetailPageContext'
import ProgressBar from './ProgressBar'
import axios from 'axios';
import { getData } from "./Charts/utils"
import { TypeChooser } from "react-stockcharts/lib/helper";

class CoinDetail extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      coinData: [],
      coin_symbol: this.props.match.params.symbol,
      isFetching: true,
    }
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  async componentDidMount() {
    getData().then(data => {
      this.setState({ data })
      console.log(this.state.data)
		})
    await axios.get(
      "/cryptinfo/coin/"+this.state.coin_symbol
    ).then((res) => {
      this.setState({coinData: res.data, isFetching: false})
    });
  }

  render(){
    if (this.state.isFetching === true) {
        return (
          <div>
            <Hidden smDown>
              <Header />
            </Hidden>
            <HeaderNav />
            <br />
            <ProgressBar />
          </div>
        )
    }else{
      return (
        <CoinDetailPageProvider value={this.state.coinData}>
          <Hidden smDown>
            <Header />
          </Hidden>
          <HeaderNav />
          <CoinPageInfoSection />
          <CoinDetailTabs />
          <Footer />
        </CoinDetailPageProvider>
      )
    }
  }
}

export default CoinDetail


          {/* <Container>
            <TypeChooser>
              {type => <CoinDetailPriceChart type={type} data={this.state.data} />}
            </TypeChooser>
          </Container> */}