import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import { TableBody, Button, List, ListItem, ListItemText, ClickAwayListener } from '@material-ui/core';
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
  }
}));

export default function CoinDetailHistoricalData() {
  const classes = useStyles();
  const [historicalData, setHistoricalData] = useState([])
  const [open, setOpen] = useState(false);
  const [filterSelected, setFilter] = useState('lmfs')
  const [labelSelected, setLabel] = useState('Latest mapping - from symbol')
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

  async function fetcho(){
    const result = await axios.get(
        'https://min-api.cryptocompare.com/data/pair/mapping/fsym?fsym=BTC&api_key='+process.env.REACT_APP_CRYPTOCOMPARE_API_KEYS,
      ).then(function(result){
          setHistoricalData(result['data']['Data'].slice(0,100))
    })
  }

  async function fetche(){
    const result = await axios.get(
        'https://min-api.cryptocompare.com/data/pair/mapping/exchange/fsym?exchangeFsym=XXBT&api_key='+process.env.REACT_APP_CRYPTOCOMPARE_API_KEYS,
      ).then(function(result){
          setHistoricalData(result['data']['Data'])
    })
  }

  useEffect(() => {
    if(filterSelected === 'lmfs'){
        fetcho();
    }else{
        fetche();
    }
  }, [filterSelected]);

  return (
    <div>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          <Button variant="outlined" color="primary" onClick={handleClick} align="right"><FilterListIcon className={classes.dropDownButton}/>{labelSelected}</Button>
          {open ? (
              <List onClick={handleClick}>
                <ListItem button onClick={() => handleFilter('lmfs', 'Latest mapping - from symbol')}> <ListItemText primary="Latest mapping - from symbol" /> </ListItem>
                <ListItem button onClick={() => handleFilter('lmefs', 'Latest mapping - exchange from symbol')}> <ListItemText primary="Latest mapping - exchange from symbol" /> </ListItem>
              </List>
              ) : null}
        </div>
      </ClickAwayListener>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
             <TableCell>Date</TableCell>
              <TableCell align="right">Exchange</TableCell>
              <TableCell align="right">exchange_fsym</TableCell>
              <TableCell align="right">exchange_tsym</TableCell>
              <TableCell align="right">fsym</TableCell>
              <TableCell align="right">tsym</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historicalData.map((row, index )=> {
              const date = new Date(row['last_update']*1000);
              const formatedDate = monthNames[date.getUTCMonth()]+' '+date.getUTCDate()+' '+date.getUTCFullYear();
              return (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {formatedDate}
                </TableCell>
                <TableCell align="right">{row['exchange']}</TableCell>
                <TableCell align="right">{row['exchange_fsym']}</TableCell>
                <TableCell align="right">{row['exchange_tsym']}</TableCell>
                <TableCell align="right">{row['fsym']}</TableCell>
                <TableCell align="right">{row['tsym']}</TableCell>
              </TableRow>
              )})
            }
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}
