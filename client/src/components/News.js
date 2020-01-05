import React, {Component} from 'react';
import { Header, HeaderNav, Footer} from './Layouts';
import { Hidden } from '@material-ui/core';
import NewsPageTabs from './NewsTabsTiles'

class News extends Component {

    render(){
      return (
        <div>
            <Hidden smDown>
              <Header />
            </Hidden>
            <HeaderNav />
            <NewsPageTabs />
            <Footer />
        </div>
      );
    }
}

export default News;
