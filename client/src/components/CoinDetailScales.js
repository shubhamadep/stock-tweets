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
    marginTop: '15px',
    width: '100%',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: '2px',
    whiteSpace: 'nowrap',
    height: '300px',
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

export default function CoinDetailScales() {
  const classes = useStyles();
  return (
      <div className={classes.root}>
        <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Paper className={classes.paper}>

              </Paper>
            </Grid>
        </Grid>
      </div>
  );
}