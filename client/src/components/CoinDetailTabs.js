import React, { useContext} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CoinPriceChart from './CoinPriceChart'
import CoinDetailSocialStats from './CoinDetailSocialStats'
import CoinDetailHistoricalData from './CoinDetailHistoricalData'
import CoinDetailOrderBook from './CoinDetailOrderBook'
import { CoinDetailPageConsumer } from './providers/CoinDetailPageContext'
import CoinDetailPairMapping from './CoinDetailPairMapping';
import { TVChartContainer } from './TVChartContainer/index'

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const [state, setState] = React.useState({
    bottom: false,
  });


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
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    marginTop: 10
  },
}));

export default function CoinDetailTabs() {
  const coinInfoData = useContext(CoinDetailPageConsumer)
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div> 
    <Container className={classes.root} md={3}>
      <AppBar position="static" color="white">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="black"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable analysis tabs"
          TabIndicatorProps={{
              style: {
                backgroundColor: "#fbae1c"
              }
            }}
        >
          <Tab style={{outline:'none'}} disableRipple label="Charts" {...a11yProps(0)} />
          <Tab style={{outline:'none'}} disableRipple label="Social" {...a11yProps(1)} />
          <Tab style={{outline:'none'}} disableRipple label="Historical Data" {...a11yProps(2)} />
          <Tab style={{outline:'none'}} disableRipple label="Order Book" {...a11yProps(3)} />
          <Tab style={{outline:'none'}} disableRipple label="Pair Mapping" {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <TVChartContainer />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CoinDetailSocialStats />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CoinDetailHistoricalData />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <CoinDetailOrderBook />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <CoinDetailPairMapping />
      </TabPanel>
    </Container>

      </div>
  );
}

//<CoinPriceChart xs={12} md={12}/>