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

  useEffect(() => {
    axios(
      'https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit='+filterSelected+'&toTs='+todaysDateTimeStamp,
    ).then(function(result){
        setHistoricalData(result['data']['Data'])
    })
    
  }, [filterSelected]);


  return (
    <div>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          <Button variant="outlined" color="primary" onClick={handleClick} align="right" ><FilterListIcon className={classes.dropDownButton}/>{labelSelected}</Button>
          {open ? (
              <List onClick={handleClick} style={{position: 'relative'}}>
                <ListItem button onClick={() => handleFilter(7, "Last 7 days")}> <ListItemText primary="Last 7 days" /> </ListItem>
                <ListItem button onClick={() => handleFilter(30, "Last 30 days")}> <ListItemText primary="Last 30 days" /> </ListItem>
                <ListItem button onClick={() => handleFilter(90, "Last 3 months")}> <ListItemText primary="Last 3 months" /> </ListItem>
                <ListItem button onClick={() => handleFilter(365, "Last 1 year")}> <ListItemText primary="Last 1 year" /> </ListItem>
                <ListItem button onClick={() => handleFilter(2000, "All data")}> <ListItemText primary="All data" /> </ListItem>
              </List>
              ) : null}
        </div>
      </ClickAwayListener>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Open</TableCell>
              <TableCell align="right">Open</TableCell>
              <TableCell align="right">High</TableCell>
              <TableCell align="right">Close</TableCell>
              <TableCell align="right">Low</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historicalData.map(row => {
              const date = new Date(row['time']*1000);
              const formatedDate = monthNames[date.getUTCMonth()]+' '+date.getUTCDate()+' '+date.getUTCFullYear();
              return (
              <TableRow key={row['time']}>
                <TableCell component="th" scope="row">
                  {formatedDate}
                </TableCell>
                <TableCell align="right">{row['open']}</TableCell>
                <TableCell align="right">{row['high']}</TableCell>
                <TableCell align="right">{row['close']}</TableCell>
                <TableCell align="right">{row['low']}</TableCell>
              </TableRow>
              )})
            }
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}
