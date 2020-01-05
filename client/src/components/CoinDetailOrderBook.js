import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import { TableBody, Button, List, ListItem, ListItemText, ClickAwayListener, Grid, Typography } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import FilterListIcon from '@material-ui/icons/FilterList';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
    position: 'relative'
  },
  table: {
    minWidth: 650,
  },
  dropdown: {
    position: 'absolute',
    top: 36,
    right: 0,
    left: 0,
  },
  dropDownButton: {
    marginRight: theme.spacing(1),
  },
  paperBlock: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: '2px',
    whiteSpace: 'nowrap',
  },
}));

export default function CoinDetailOrderBook() {
  const classes = useStyles();
  const [historicalData, setHistoricalData] = useState([])
  const [open, setOpen] = useState(false);
  const [filterSelected, setFilter] = useState(30)
  const [labelSelected, setLabel] = useState("Last 30 days")
  const todaysDateTimeStamp = new Date().getTime();
  const todaysDate = new Date(todaysDateTimeStamp);
  const monthNames = ["January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"
                     ];
  
  const handleClick = () => {
    setOpen(prev => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const handleFilter = (filterApplied, label) => {
    setFilter(filterApplied)
    setLabel(label)
  }

  async function fetchOrderBook(){
    const response = await axios.get(
        'https://min-api.cryptocompare.com/data/ob/l1/top?fsyms=BTC&tsyms=USD,EUR&e=coinbase&api_key='+process.env.REACT_APP_CRYPTOCOMPARE_API_KEYS,
    ).then(function(result){
        setHistoricalData(result['data']['Data']['DISPLAY']['BTC']['USD'])
    })
}
  
  useEffect(() => {
    fetchOrderBook();
  }, []);

  console.log(historicalData)
  return (
    <div>
    <Paper className={classes.root}>
        <Grid container>
            <Grid item xs={12} md={6}>
                <Paper className={classes.paperBlock}> 
                    <Grid container>
                        <Grid item xs={12} md={12}>
                            <Typography>DigiFinex</Typography>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Grid container>
                                <Grid item xs={6} md={6}>
                                    Bid: {historicalData['BID']}
                                </Grid>
                                <Grid item xs={6} md={6}>
                                    Ask: {historicalData['ASK']}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>   
            </Grid>
            <Grid item xs={12} md={6}>
            <Paper className={classes.paperBlock}> 
                    <Grid container>
                        <Grid item xs={12} md={12}>
                            <Typography>DigiFinex</Typography>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Grid container>
                                <Grid item xs={6} md={6}>
                                    Bid: {historicalData['BID']}
                                </Grid>
                                <Grid item xs={6} md={6}>
                                    Ask: {historicalData['ASK']}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>              
            </Grid>
            <Grid item xs={12} md={6}>
            <Paper className={classes.paperBlock}> 
                    <Grid container>
                        <Grid item xs={12} md={12}>
                            <Typography>DigiFinex</Typography>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Grid container>
                                <Grid item xs={6} md={6}>
                                    Bid: {historicalData['BID']}
                                </Grid>
                                <Grid item xs={6} md={6}>
                                    Ask: {historicalData['ASK']}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>          
            </Grid>
            <Grid item xs={12} md={6}>
            <Paper className={classes.paperBlock}> 
                    <Grid container>
                        <Grid item xs={12} md={12}>
                            <Typography>DigiFinex</Typography>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Grid container>
                                <Grid item xs={6} md={6}>
                                    Bid: {historicalData['BID']}
                                </Grid>
                                <Grid item xs={6} md={6}>
                                    Ask: {historicalData['ASK']}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>       
            </Grid>
        </Grid>
        
      </Paper>
    </div>
  );
}
