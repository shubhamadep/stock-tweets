import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CryptoPriceGridProvider from '../providers/CryptoPriceGridProvider'
import ReactTicker from 'react-ticker';
import { Typography, AppBar } from '@material-ui/core';
import { display } from '@material-ui/system';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';

//Refer : https://github.com/FortAwesome/react-fontawesome
//color code for official ticker: #343a40'
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '64px',
    color: '#fbae1c',
    background: 'white',
    marginTop: '5px',
  },
  rootParent: {
    display: 'flex'
  },
  toolBarLeft: {
    flexGrow: 1,
  },
  imgThumbnail: {
    border: '0px solid white', /* Gray border */
    marginRight: '5px',
    width: '25px', /* Set a small width */
  },
  margin: {
    marginLeft: theme.spacing(4),
    whiteSpace: 'nowrap',
  },
  marginPrice:{
    marginLeft: theme.spacing(1),
    whiteSpace: 'nowrap',  
  }

}));

export default function Ticker() {
  const classes = useStyles();
  const data = useContext(CryptoPriceGridProvider)
  const coinData = Object.assign([], data['coinData'])

  function get_top_20_movers(coinData){
    
    if(!data['fetching']){
      return (<ArrowLeftIcon />)
    }
    coinData.sort(function(a, b) {
      return b['DISPLAY']['USD']['CHANGEPCTDAY'] - a['DISPLAY']['USD']['CHANGEPCTDAY']
    })
    const tickerData = []
    Object.keys(coinData.slice(70)).map((index) => {
      tickerData.push(
        <span>
          <span className={classes.margin}>{coinData[index]['CoinInfo']['Name']}</span>
          <span className={classes.marginPrice} style={{color: (coinData[index]['DISPLAY']['USD']['CHANGEPCTDAY'] > 0 ? '#28a745' : 'red')}} >{coinData[index]['DISPLAY']['USD']['CHANGEPCTDAY']+"%"}</span>
        </span>
      )
    }
    )
    return tickerData
  }

  return (
      <AppBar className={classes.root} position="sticky">
        <ReactTicker offset="run-in" speed={10} >
          {() => <h4>{get_top_20_movers(coinData)}</h4>}
        </ReactTicker>
      </AppBar>
    );
  }