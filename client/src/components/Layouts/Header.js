import React from 'react';
import { AppBar, Toolbar, Typography, Grid, Container, Paper } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faPhoneSquareAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faLinkedinIn, faTwitter  } from '@fortawesome/free-brands-svg-icons';
import { makeStyles } from '@material-ui/core/styles';

//Refer : https://github.com/FortAwesome/react-fontawesome

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    width: '100%',
    color: '#fbae1c',
    height: '20px',
  },
  toolBarLeft: {
    flexGrow: 1,
    marginLeft: '10px'
  },
  toolBarRight: {
    marginRight: '10px',
  },
  margin: {
    marginLeft: theme.spacing(2),
  }

}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
      <div  className={classes.root}>
          <AppBar position="static" color='inherit' align="right">
                <Grid item xs={12} md={12}>
                  <Grid container>
                      <Grid item xs={6} md={6}>
                        <Typography className={classes.toolBarLeft}  variant="subtitle2"  align="left">
                            <FontAwesomeIcon  icon={faClock}  size="sm"/> Mon - Fri 10:00-18:00
                            <FontAwesomeIcon  className={classes.margin} icon={faPhoneSquareAlt} size="sm"/> +1-3454-5678-77
                        </Typography>
                      </Grid>
                      <Grid item xs={6} md={6}>
                        <Typography className={classes.toolBarRight} variant="subtitle2" >
                            <FontAwesomeIcon align="right" icon={faEnvelope} size="sm"/> support@thecoinprophet.com
                            <FontAwesomeIcon className={classes.margin} icon={faFacebookF} />
                            <FontAwesomeIcon className={classes.margin} icon={faLinkedinIn} />
                            <FontAwesomeIcon className={classes.margin} size="sm" icon={faTwitter} />
                        </Typography>
                      </Grid>
                  </Grid>
                </Grid>
          </AppBar>
      </div>
    );
  }
