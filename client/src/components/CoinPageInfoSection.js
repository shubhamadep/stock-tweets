import React, {useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Button } from '@material-ui/core';
import {Paper, Grid, Divider, Hidden, List, ListItem, ListItemText} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {} from '@fortawesome/free-solid-svg-icons'
import EqualizerIcon from '@material-ui/icons/Equalizer/';
import LinkIcon from '@material-ui/icons/Link/';
import CodeIcon from '@material-ui/icons/Code';
import DescriptionIcon from '@material-ui/icons/Description';
import { CoinDetailPageConsumer } from './providers/CoinDetailPageContext'

const axios = require('axios');


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: 10,
    color: 'black',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: '2px',
    whiteSpace: 'nowrap',
  },
  imgThumbnailMainLogo: {
    marginRight: 10,
    width: 30,
    height: 30,
  },
  topRankSection: {
    margin: 9,
  },
  imgThumbnail: {
    border: '0px solid white', /* Gray border */
    marginRight: '5px',
    width: '15px', /* Set a small width */
  },
  icons: {
    color: "#fbae1c",
    marginRight: '5px'
  }
}));

export default function CoinPageInfoSection() {
  const coinInfoData = useContext(CoinDetailPageConsumer)
  const classes = useStyles();
  const [coinDetails, setCoinDetails] = useState([])
  
  useEffect(() => {
    axios(
      'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC&tsyms=USD,EUR',
    ).then(function(result){
        setCoinDetails(result['data']['DISPLAY']['BTC']['USD']);
    })
  }, []);
  return (
    <Container className={classes.root}>
        <Grid container spacing={2}>
          <Hidden smDown>
            <Grid item xs={12} md={3}>
              <Paper className={classes.paper}>
                      <Typography align="left"><Button disableRipple ><EqualizerIcon fontSize="small" className={classes.icons}/> Rank {coinInfoData['coinInfo']['rank']}</Button></Typography>
                      <Typography align="left"><Button disableRipple href={coinInfoData['coinInfo']['website_url']}><LinkIcon fontSize="small" className={classes.icons}/> Website</Button></Typography>
                      <Typography align="left"><Button disableRipple href={coinInfoData['coinInfo']['source_code_url']}><CodeIcon fontSize="small" className={classes.icons}/> Source Code</Button></Typography>
                      <Typography align="left"><Button disableRipple href={coinInfoData['coinInfo']['technical_doc_url']}><DescriptionIcon fontSize="small" className={classes.icons}/> Technical Documentation</Button></Typography>
              </Paper>
            </Grid>
          </Hidden>
            <Grid item xs={12} md={6}>
                <Paper className={classes.paper}>
                    <Grid item xs={12} md={12}>    
                        <Typography variant="h4" gutterBottom>
                        <img className={classes.imgThumbnailMainLogo} src={"https://www.cryptocompare.com/" + coinDetails['IMAGEURL']} alt="Symbol" />{coinInfoData['coinInfo']['name']} ({coinInfoData['coinInfo']['symbol']})
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Typography variant="h5" gutterBottom> 
                        {coinDetails['PRICE']} <span style={{color: (coinDetails['CHANGEPCTDAY'] > 0 ? 'green' : 'red')}}>({coinDetails['CHANGEPCTDAY']+'%'})</span>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Grid container className={classes.root} spacing={2}>
                        <Grid item xs={12}>
                          <Grid container justify="center" >
                              <Grid item xs={6} md={3}>
                                  <Typography variant='caption'>Market Cap</Typography>
                                  <Typography>{coinDetails['MKTCAP']}</Typography>   
                              </Grid>
                              <Divider orientation="horizontal" />
                              <Grid item xs={6} md={3}>
                                  <Typography variant='caption'>Volume (24h) </Typography>
                                  <Typography>{coinDetails['VOLUME24HOUR']}</Typography>
                              </Grid>
                              <Divider orientation="horizontal" />                              
                              <Grid item xs={6} md={3}>
                                  <Typography variant='caption'>Circulating Supply</Typography>
                                  <Typography>{coinDetails['SUPPLY']}</Typography>
                              </Grid>
                              <Divider orientation="horizontal" />                             
                              <Grid item xs={6} md={3}>
                                  <Typography variant='caption'>Forecasted Price</Typography>
                                  <Typography>{coinDetails['PRICE']}</Typography>                               
                              </Grid>
                              <Divider orientation="horizontal" />                              
                          </Grid>
                        </Grid>                      
                      </Grid>
                    </Grid>                                              
                </Paper>
            </Grid>
            <Hidden smUp>
              <Grid item xs={12} md={3}>
                <Paper className={classes.paper}>
                    <Grid item xs={12} className={classes.topRankSection}>
                        <Typography align="left"><EqualizerIcon fontSize="small"/> Rank 1</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.topRankSection}>
                        <Typography align="left"><LinkIcon fontSize="small"/> Website</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.topRankSection}>
                        <Typography align="left"><CodeIcon fontSize="small" /> Source Code</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.topRankSection}>
                        <Typography align="left"><DescriptionIcon fontSize="small"/> Technical Documentation</Typography>
                    </Grid>
                </Paper>
              </Grid>
            </Hidden>
            <Hidden smDown>
              <Grid item xs={12} md={3}>
                <Paper className={classes.paper}>
                  {/* <Typography variant='subtitle2'>People Also Watched</Typography> */}
                  {
                    coinInfoData['realtedCoinSymbols'].slice(1).map(row => {
                      return(
                        <Typography variant="subtitle2" align="left"><Button><img className={classes.imgThumbnail} src={"https://www.cryptocompare.com/" + row['ImageUrl']} alt="Symbol"/>{row['symbol']}</Button></Typography>
                      )
                    })
                  }
                </Paper>
              </Grid>
            </Hidden>
        </Grid>
    </Container>
  );
}