import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';
import {Paper, Grid, Divider, Hidden, List, ListItem, ListItemText} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {} from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faTwitter, faRedditAlien  } from '@fortawesome/free-brands-svg-icons';
import GaugeChart from 'react-gauge-chart'
import GroupIcon from '@material-ui/icons/Group';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PageviewIcon from '@material-ui/icons/Pageview';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import BarChartIcon from '@material-ui/icons/BarChart';
import BookIcon from '@material-ui/icons/Book';
import FindReplaceIcon from '@material-ui/icons/FindReplace';

const axios = require('axios');


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: 10,
    width: '100%',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: 'black',
    margin: '2px',
    whiteSpace: 'nowrap',
    height: '350px'
  },
  paperBlock: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: 'black',
    margin: '2px',
    whiteSpace: 'nowrap',
  },
}));

export default function CoinDetailSocialStats() {
  const classes = useStyles();
  const [facebookStats, setFacebookStats] = useState([])
  const [twitterStats, setTwitterStats] = useState([])
  const [redditStats, setRedditStats] = useState([])
  const [cryptoCompareSocialStats, setCryptoCompareSocialStats] = useState([])
  const [cryptoCompareSocialViewsStats, setCryptoCompareSocialViewsStats] = useState([])

  async function fetchSocialStats(){
        const response = await axios.get(
            'https://min-api.cryptocompare.com/data/social/coin/latest?&api_key='+process.env.REACT_APP_CRYPTOCOMPARE_API_KEYS,
        ).then(function(response){
            setFacebookStats(response['data']['Data']['Facebook'],
            setTwitterStats(response['data']['Data']['Twitter']),
            setRedditStats(response['data']['Data']['Reddit']),
            setCryptoCompareSocialStats(response['data']['Data']['CryptoCompare']),
            setCryptoCompareSocialViewsStats(response['data']['Data']['CryptoCompare']['PageViewsSplit']))
        })
    }

  useEffect(() => {
        fetchSocialStats();
      }, []);

  return (
    <Container className={classes.root}>
        <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Paper className={classes.paper}>
                <Typography variant="h6"><a href={facebookStats.link} ><FontAwesomeIcon className={classes.margin} icon={faFacebookF} size="sm"/> Facebook </a></Typography>
                <List component="nav" aria-label="Facebook Stats">
                    <ListItem>
                        <ListItemText primary="Likes" />  <ListItemText primary={facebookStats.likes} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Taking about" />  <ListItemText primary={facebookStats.talking_about} />
                    </ListItem>
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper className={classes.paper}>
                <Typography variant="h6"><a href={twitterStats.link} ><FontAwesomeIcon className={classes.margin} icon={faTwitter} size="sm"/>  Twitter </a></Typography>
                <List>
                    <ListItem>
                      <ListItemText primary="Followers" />  <ListItemText primary={twitterStats.followers} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Following" />  <ListItemText primary={twitterStats.following} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Statuses" />  <ListItemText primary={twitterStats.statuses} />
                    </ListItem>
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper className={classes.paper}>
                <Typography variant="h6"><a href={redditStats.link} ><FontAwesomeIcon className={classes.margin} icon={faRedditAlien} size="sm"/>  Reddit </a></Typography>
                    <ListItem>
                      <ListItemText primary="Subscribers" />  <ListItemText primary={redditStats.subscribers}/>
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Active Users" />  <ListItemText primary={redditStats.active_users} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Comments per day" />  <ListItemText primary={redditStats.comments_per_day} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Comments per hour" />  <ListItemText primary={redditStats.comments_per_hour} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Posts per day" />  <ListItemText primary={redditStats.posts_per_day} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Posts per hour" />  <ListItemText primary={redditStats.posts_per_hour} />
                    </ListItem>
              </Paper>
            </Grid>
        </Grid>
        <Grid container spacing={2} >
          <Grid item xs={12} md={6} >
            <Paper className={classes.paperBlock}>
              <GaugeChart id="gauge-chart6" 
                nrOfLevels={15} 
                percent={0.56} 
                needleColor="#345243"
                textColor="black"
              />
              <Typography variant="h6">Social Sentiment Meter</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} spacing={2}>
            <Paper className={classes.paperBlock}>
            <Typography variant="h6">Social Stats</Typography>
              <Grid container >
                  <Grid item xs={4} md={4}>
                      <Paper className={classes.paperBlock}>
                        <Grid container>
                          <Grid item> <GroupIcon fontSize='large'/> </Grid>
                          <Grid item style={{marginLeft: '10px', align: 'right'}}> 
                            <Typography>{(cryptoCompareSocialStats['Followers']/1000).toFixed(1)}K</Typography>
                            <Typography variant="subtitle2">Followers</Typography>
                            </Grid>
                          </Grid>
                      </Paper>
                  </Grid>
                  <Grid item xs={4} md={4}>
                      <Paper className={classes.paperBlock}>
                        <Grid container>
                          <Grid item> <FormatListBulletedIcon fontSize='large'/> </Grid>
                          <Grid item style={{marginLeft: '10px', align: 'right'}}> 
                            <Typography>{(cryptoCompareSocialStats['Posts']/10000).toFixed(1)}K</Typography>
                            <Typography variant="subtitle2">Forum Posts</Typography>
                            </Grid>
                          </Grid>
                      </Paper>
                  </Grid>
                  <Grid item xs={4} md={4}>
                      <Paper className={classes.paperBlock}>
                        <Grid container>
                          <Grid item> <FormatListBulletedIcon fontSize='large'/> </Grid>
                          <Grid item style={{marginLeft: '10px', align: 'right'}}> 
                            <Typography>{(cryptoCompareSocialViewsStats['Forum']/10000).toFixed(1)}K</Typography>
                            <Typography variant="subtitle2">Forum Views</Typography>
                            </Grid>
                          </Grid>
                      </Paper>
                  </Grid>
                  <Grid item xs={4} md={4}>
                      <Paper className={classes.paperBlock}>
                        <Grid container>
                          <Grid item> <VisibilityIcon fontSize ='large'/> </Grid>
                          <Grid item style={{marginLeft: '10px', align: 'right'}}> 
                            <Typography>{Number(cryptoCompareSocialStats['PageViews']/1000000).toFixed(1)}M</Typography>
                            <Typography variant="subtitle2">Page Views</Typography>
                            </Grid>
                          </Grid>
                      </Paper>
                  </Grid>
                  <Grid item xs={4} md={4}>
                      <Paper className={classes.paperBlock}>
                        <Grid container>
                          <Grid item> <PageviewIcon fontSize ='large'/> </Grid>
                          <Grid item style={{marginLeft: '5px', align: 'right'}}> 
                            <Typography>{Number(cryptoCompareSocialViewsStats['Overview']/1000000).toFixed(1)}M</Typography>
                            <Typography variant="subtitle2">Views</Typography>
                            </Grid>
                          </Grid>
                      </Paper>
                  </Grid>
                  <Grid item xs={4} md={4}>
                      <Paper className={classes.paperBlock}>
                        <Grid container>
                          <Grid item> <BarChartIcon fontSize ='large'/> </Grid>
                          <Grid item style={{marginLeft: '10px', align: 'right'}}> 
                            <Typography>{(cryptoCompareSocialViewsStats['Charts']/100000).toFixed(1)}M</Typography>
                            <Typography variant="subtitle2">Charts Views</Typography>
                            </Grid>
                          </Grid>
                      </Paper>
                  </Grid>
                  <Grid item xs={4} md={4}>
                      <Paper className={classes.paperBlock}>
                        <Grid container>
                          <Grid item> <TrendingUpIcon fontSize ='large'/> </Grid>
                          <Grid item style={{marginLeft: '10px', align: 'right'}}> 
                            <Typography>{(cryptoCompareSocialViewsStats['Trades']/100000).toFixed(1)}M</Typography>
                            <Typography variant="subtitle2">Trades</Typography>
                            </Grid>
                          </Grid>
                      </Paper>
                  </Grid>
                  <Grid xs={4} md={4}>
                    <Paper className={classes.paperBlock}>
                        <Grid container>
                          <Grid item> <BookIcon fontSize ='large'/> </Grid>
                          <Grid item style={{marginLeft: '10px', align: 'right'}}> 
                            <Typography>{(cryptoCompareSocialViewsStats['News']/10000).toFixed(1)}K</Typography>
                            <Typography variant="subtitle2">News</Typography>
                            </Grid>
                          </Grid>
                      </Paper>
                  </Grid>
                  <Grid xs={4} md={4}>
                    <Paper className={classes.paperBlock}>
                        <Grid container>
                          <Grid item> <FindReplaceIcon fontSize ='large'/> </Grid>
                          <Grid item style={{marginLeft: '10px', align: 'right'}}> 
                            <Typography>{(cryptoCompareSocialViewsStats['Analysis']/100000).toFixed(1)}M</Typography>
                            <Typography variant="subtitle2">Analysis</Typography>
                            </Grid>
                          </Grid>
                      </Paper>
                  </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
    </Container>
  );
}