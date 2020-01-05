import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';
import {Paper, Grid, Divider, Hidden} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {} from '@fortawesome/free-solid-svg-icons'
import EqualizerIcon from '@material-ui/icons/Equalizer/';
import LinkIcon from '@material-ui/icons/Link/';
import CodeIcon from '@material-ui/icons/Code';
import DescriptionIcon from '@material-ui/icons/Description';

const axios = require('axios');


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: 10
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: '2px',
    whiteSpace: 'nowrap',
  },
  imgThumbnail: {
    marginRight: 20,
    width: 40,
    height: 40,
  },
  topRankSection: {
    margin: 9,
  }
}));

export default function CoinPageInfoSection() {
  const classes = useStyles();
  const [coinDetails, setCoinDetails] = useState([])

  useEffect(() => {
    axios(
      'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC&tsyms=USD',
    ).then(function(result){
        setCoinDetails(result['data']['DISPLAY']['BTC']['USD']);
    })
  }, []);

  console.log(coinDetails);

  return (
    <Container className={classes.root}>
        <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Paper className={classes.paper}>
                  <Grid item xs={12}>
                      <Typography align="left"><EqualizerIcon fontSize="small"/> Rank 1</Typography>
                  </Grid>
                  <Grid item xs={12}>
                      <Typography align="left"><LinkIcon fontSize="small"/> Website</Typography>
                  </Grid>
              </Paper>
            </Grid>
        </Grid>
    </Container>
  );
}