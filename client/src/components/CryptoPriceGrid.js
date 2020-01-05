import React, {useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Paper, Container, Typography, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom'
import { fontWeight } from '@material-ui/system';
import CryptoPriceGridProvider from './providers/CryptoPriceGridProvider'
import ProgressBar from './ProgressBar'
import axios from 'axios';

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}


const useStyles = makeStyles({
  contain: {
    maxWidth: '1500px'
  },
  root: {
    width: '100',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    marginTop: '10px'
  },
  tableWrapper: {
    maxHeight: 407,
    overflow: 'auto',
  },
  tableSymbol: {
    marginLeft: '10px',
  },
  imgThumbnail: {
    border: '0px solid white', /* Gray border */
    marginRight: '5px',
    width: '25px', /* Set a small width */
  },
  tableHeader: {
    position: 'sticky',
    fontWeight: 'bold',
    color: 'black',
    top: 0,
    fontSize: '11px'
  },
  tableCell: {
    fontWeight: 'bold',
    color: 'black',
  },
  progressBar:{
    colorPrimary: '#fbae1c',
    barColorPrimary: '#fbae1c'
  },
  iconButton: {
    backgroundColor: "#FFF",
    maxWidth: "160px",
    "&:hover": {
        //you want this to be the same as the backgroundColor above
        backgroundColor: "#FFF",
    }
  }
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [rows, setRows] = useState([])
  const [mapNewRows, setmapNewRows] = useState(false)
  const [coinData, setCoinData] = useState([])
  const [fetching, setIsFetching] = useState(true)

  useEffect(() => {
    axios.get('/cryptinfo/home/griddata/100/1/USD')
    .then(result => {
      setCoinData(result['data']['Data']);
      setIsFetching(false)
    })
  }, [])


  function showLoadingFunction(){
    setIsFetching(true)
  }

  async function getDataHandleChangePage(event, newPage) {
    setIsFetching(false)
    setPage(newPage);
    showLoadingFunction();
    await axios.get('/cryptinfo/home/griddata/100/'+(newPage+1)+'/USD')
      .then(result => {
        setCoinData(result['data']['Data'])
        setmapNewRows(true);
        setIsFetching(false);
      })
  
  }

  function createData(rank, symbol, price, marketCap, volume, circulatinSupply, change, prediction, accuracy, imageURL) {
    return { rank, symbol, price, marketCap, volume, circulatinSupply, change, prediction, accuracy, imageURL };
  }


  useEffect(() => {
    async function makeData(coinData){
      const Datarows = []
      await Object.keys(coinData).map((index) =>
        Datarows.push(createData(coinData[index]['CoinInfo']['Rank'], coinData[index]['CoinInfo']['Name'], coinData[index]['DISPLAY']['USD']['PRICE'], coinData[index]['DISPLAY']['USD']['MKTCAP'],
                  coinData[index]['DISPLAY']['USD']['VOLUME24HOURTO'], coinData[index]['DISPLAY']['USD']['SUPPLY'],
                  coinData[index]['DISPLAY']['USD']['CHANGEPCT24HOUR'], coinData[index]['DISPLAY']['USD']['PRICE'],
                  coinData[index]['DISPLAY']['USD']['CHANGEPCT24HOUR'], coinData[index]['DISPLAY']['USD']['IMAGEURL']
                ))
      )
      setRows(Datarows);
      setmapNewRows(false)
    }
    makeData(coinData);    
  }, [coinData, mapNewRows])

    if(fetching){
      return (
        <div>
          <br />
          <ProgressBar />
        </div>
      )
    }else{
      return (
        <Container className={classes.contain}>
              <div className={classes.root}>
                <Table>
                    <TableHead>
                      <TableRow>
                          <TableCell className={classes.tableHeader} align="right">#</TableCell>
                          <TableCell className={classes.tableHeader} align="left">Name</TableCell>
                          <TableCell className={classes.tableHeader} align="center">Price</TableCell>
                          <TableCell className={classes.tableHeader} align="right">Market Cap</TableCell>
                          <TableCell className={classes.tableHeader} align="right">Volume</TableCell>
                          <TableCell className={classes.tableHeader} align="right">Circulating Supply</TableCell>
                          <TableCell className={classes.tableHeader} align="right">Change (24h)</TableCell>
                          <TableCell className={classes.tableHeader} align="right">Forecast</TableCell>
                          <TableCell className={classes.tableHeader} align="right">Accuracy</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.keys(coinData).map((index) => (
                            <TableRow component={Link} to="/coin/BTC" style={{textDecoration: "none"}}>
                                <TableCell className={classes.tableCell} align="right">#{coinData[index]['CoinInfo']['Rank']}</TableCell>
                                <TableCell align="left"><IconButton className={classes.iconButton} size="small" disableFocusRipple disableRipple><img className={classes.imgThumbnail} src={"https://www.cryptocompare.com/" + coinData[index]['DISPLAY']['USD']['IMAGEURL']} alt="Symbol" /><Typography align="right" variant="subtitle2" color="black" className={classes.tableCell}>{coinData[index]['CoinInfo']['FullName']}</Typography></IconButton></TableCell>
                                <TableCell align="left" className={classes.tableCell}>{coinData[index]['DISPLAY']['USD']['PRICE']}</TableCell>
                                <TableCell className={classes.tableCell} align="right">{coinData[index]['DISPLAY']['USD']['MKTCAP']}</TableCell>
                                <TableCell className={classes.tableCell} align="right">{coinData[index]['DISPLAY']['USD']['VOLUME24HOURTO']}</TableCell>
                                <TableCell className={classes.tableCell} align="right">{coinData[index]['DISPLAY']['USD']['SUPPLY']}</TableCell>
                                <TableCell className={classes.tableCell} align="center" style={{color: (coinData[index]['DISPLAY']['USD']['CHANGEPCT24HOUR'] > 0 ? 'green' : 'red')}}>{coinData[index]['DISPLAY']['USD']['CHANGEPCT24HOUR']+'%'}</TableCell>
                                <TableCell className={classes.tableCell} align="right">{coinData[index]['DISPLAY']['USD']['PRICE']}</TableCell>
                                <TableCell className={classes.tableCell} align="right" style={{color: (coinData[index]['DISPLAY']['USD']['CHANGEPCT24HOUR'] > 0 ? 'green' : 'red')}} >{coinData[index]['DISPLAY']['USD']['CHANGEPCT24HOUR']+'%'}</TableCell>
                            </TableRow>
                          ))}
                    </TableBody>
              </Table>
              </div>
              <TablePagination
                rowsPerPageOptions={[100]}
                labelRowsPerPage=''
                component="div"
                count={2000}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                  'aria-label': 'previous page',
                }}
                nextIconButtonProps={{
                  'aria-label': 'next page',
                }}
                onChangePage={getDataHandleChangePage}
              />
          </Container>
        ); 
    }
    
 
}