import React, {useState, useEffect, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';
import {Paper, Grid, Divider, Hidden, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {} from '@fortawesome/free-solid-svg-icons'
import EqualizerIcon from '@material-ui/icons/Equalizer/';
import LinkIcon from '@material-ui/icons/Link/';
import CodeIcon from '@material-ui/icons/Code';
import DescriptionIcon from '@material-ui/icons/Description';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import Chip from '@material-ui/core/Chip';
import { CoinDetailPageConsumer } from './providers/CoinDetailPageContext'

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
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  imgThumbnail: {
    border: '0px solid white', /* Gray border */
    marginRight: '5px',
    width: '70px', /* Set a small width */
  },
}));

export default function CoinPageInfoSection() {
  const CoinInfo = useContext(CoinDetailPageConsumer)
  const classes = useStyles();
  const [coinDetails, setCoinDetails] = useState([])

  useEffect(() => {
    axios(
      'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC&tsyms=USD',
    ).then(function(result){
        setCoinDetails(result['data']['DISPLAY']['BTC']['USD']);
    })
  }, []);

  return (
      <div className={classes.root}>
        <ExpansionPanel defaultExpanded>
            <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
            <Typography className={classes.heading}>Top News</Typography>
            </ExpansionPanelSummary>
              <ExpansionPanelDetails>
              <div className={classes.root}>
                  <Grid container spacing={2}>
                      {
                        CoinInfo['coinNews']['news'].map((newsTile, index) => {
                          return(
                            <Grid container>
                              <Grid item xs={2} md={2}>
                                <img className={classes.imgThumbnail} src={newsTile['imagerUrl']} />
                              </Grid>
                              <Grid item xs={10} md={10}>
                                <Typography>{newsTile['title']}</Typography>
                              </Grid>
                            </Grid>
                          )
                        })
                      }
                  </Grid>
              </div>
            </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
  );
}

//Add this when: Add stock picks expansion panel.
{/* <ExpansionPanel defaultExpanded>
            <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
            <Typography className={classes.heading}>Top stock picks</Typography>
            </ExpansionPanelSummary>
              <ExpansionPanelDetails>
              <div className={classes.root}>
                  <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                              <Chip icon={<AddShoppingCartIcon />} label="Top Buy Picks" color="primary" variant="outlined" />
                          <Paper>
                              
                          </Paper>
                      </Grid>
                      <Grid item xs={12} md={6}>
                          <Chip icon={<RemoveShoppingCartIcon />} label="Top Sell Picks" color="primary" variant="outlined" />
                          <Paper>
                          </Paper>
                      </Grid>
                  </Grid>
              </div>
            </ExpansionPanelDetails>
        </ExpansionPanel> */}