import React, { useState, useEffect } from 'react';
import CryptoPriceGrid from './CryptoPriceGrid'
import NewsCards from './NewsCards';
import { Header, HeaderNav, Footer, Ticker } from './Layouts';
import { Hidden } from '@material-ui/core';
import { CryptoPriceGridProvider } from './providers/CryptoPriceGridProvider'
import axios from 'axios';

export default function App() {
    const[coinData, setCoinData] = useState([])
    const [isFetching, setIsFetching] = useState(false)

    useEffect(() => {
      axios.get('/cryptinfo/home/griddata/100/1/USD')
      .then(result => {
        setCoinData(result['data']['Data']);
        setIsFetching(true)
      })
    }, [])
    
    return (
      <CryptoPriceGridProvider value={{coinData: coinData, fetching: isFetching}}>
        <div>
          <Hidden smDown>
            <Header />
          </Hidden>
          <HeaderNav />
          <Ticker />
          <NewsCards />
          <CryptoPriceGrid />
          <Footer />
        </div>
      </CryptoPriceGridProvider>
    );

}
