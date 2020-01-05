import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Typography, Container, CardActionArea, CardActions, CardContent, CardMedia, Button, Card, Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import axios from 'axios';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  card: {
    maxWidth: 345,
  },
  indicator: {
    backgroundColor: '#fbae1c',
  },
  tabs: {
    style: {
      outline: 'none'
    }
  },
  cardContent: {
    height: '150px',
  },
  cardButtons: {
    color: '#fbae1c'
  },
  cardAction:{
    background: '#343a40'
  }
}));

export default function ScrollableTabsButtonAuto() {
  const classes = useStyles();
  const [newsLoaded, setNewsLoaded] = useState([])
  const [news, setNews] = useState([])
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState('All')

  function handleChange(event, newValue) {
    setValue(newValue);
  }
  
  function handleChangeCategory(newCategory){
    setCategory(newCategory)
  }

  useEffect(() => {
    axios(
      'https://min-api.cryptocompare.com/data/v2/news/?lang=EN',
    ).then(function(result){
      setNewsLoaded(result['data']['Data']);
    })
  }, []);

  useEffect(() => {
    setNews(
        <TabPanel value={value} index={value}>
        <Grid container spacing={3}>
          { 
              newsLoaded.map(item => {
                  if(item['categories'].split('|').includes(category) || category === 'All'){
                    return(
                      <Grid item key = {item['id']} xs={12} sm={6} md={4} >
                        <Card className={classes.card}>
                            <CardActionArea>
                              <CardMedia
                                component="img"
                                alt="News"
                                height="140"
                                image={item['imageurl']}
                                title={item['title']}
                              />
                              <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="body2" component="h5">
                                  {item['title']}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                  {item['body'].split('.')[0] + " ... "}
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                            <CardActions className={classes.cardAction}>
                              <Button className={classes.cardButtons} size="small">
                                Share
                              </Button>
                              <Button className={classes.cardButtons} href={item['url']} size="small">
                                Read More
                              </Button>
                            </CardActions>
                        </Card>
                      </Grid>
                    )
                  }
                  
               }
              )
          }
      </Grid>
      </TabPanel>
      )
  }, [value, newsLoaded])

  return (
    <div>
      <AppBar color="white" position="sticky">
          <Tabs
            value={value}
            onChange={handleChange}
            TabIndicatorProps={{
              style: {
                backgroundColor: "#fbae1c"
              }
            }}
            textColor="inherit"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <Tab label="All" style={{outline:'none'}} disableRipple {...a11yProps(0)} onClick={() => handleChangeCategory('All')}/>
            <Tab label="Blockchain" style={{outline:'none'}} disableRipple {...a11yProps(1)} onClick={() => handleChangeCategory('Blockchain')} />
            <Tab label="ICO" style={{outline:'none'}} disableRipple {...a11yProps(1)} onClick={() => handleChangeCategory('ICO')} />
            <Tab label="Market" style={{outline:'none'}} disableRipple {...a11yProps(2)} onClick={() => handleChangeCategory('Market')} />
            <Tab label="Technology" style={{outline:'none'}} disableRipple {...a11yProps(3)} onClick={() => handleChangeCategory('Technology')}/>
            <Tab label="Fiat" style={{outline:'none'}} disableRipple {...a11yProps(4)} onClick={() => handleChangeCategory('Fiat')}/>
            <Tab label="Altcoin News" style={{outline:'none'}} disableRipple {...a11yProps(5)} onClick={() => handleChangeCategory('Altcoin')}/>
            <Tab label="Regulation" style={{outline:'none'}} disableRipple {...a11yProps(6)} onClick={() => handleChangeCategory('Regulation')}/>
          </Tabs>
      </AppBar>
    <Container sm={5} className={classes.root}>        
          {news}
    </Container>
    </div>

  );
}