import React, {useContext, useState, useEffect, useRef} from 'react';
import Highcharts from 'highcharts/highstock';
import { makeStyles } from '@material-ui/core/styles';
import CoinDetailAnalyticCards from './CoinDetailAnalyticCards'
import CoinDetailScales from './CoinDetailScales'
import axios from 'axios';
import { Grid } from '@material-ui/core';
import './styles/coinDetailPriceChartStyles.css'
import HighchartsReact from 'highcharts-react-official';
import Indicators from "highcharts/indicators/indicators-all.js";
import Exporting from "highcharts/modules/exporting"
// import MacD from "highcharts/indicators/macd"
import rsi from "highcharts/indicators/rsi.js"
import DragPanes from "highcharts/modules/drag-panes.js";
import AnnotationsAdvanced from "highcharts/modules/annotations-advanced.js";
import PriceIndicator from "highcharts/modules/price-indicator.js";
import FullScreen from "highcharts/modules/full-screen.js";
import StockTools from "highcharts/modules/stock-tools.js";
import DataFormater from "highcharts/modules/data.js";
import SunSetTheme from "highcharts/themes/sunset.src";

import { CoinDetailPageConsumer } from './providers/CoinDetailPageContext'
import { Button, Container, List, ListItem, ListItemText, SwipeableDrawer, Switch } from '@material-ui/core';
import './styles/coinDetailPriceChartStyles.css';

// MacD(Highcharts);
// rsi(Highcharts);
Indicators(Highcharts)
DragPanes(Highcharts);
AnnotationsAdvanced(Highcharts);
PriceIndicator(Highcharts);
FullScreen(Highcharts);
StockTools(Highcharts);
// SunSetTheme(Highcharts)
DataFormater(Highcharts)
Exporting(Highcharts)

const useStyles = makeStyles({
  root: {
    height: '800px'
  },
  list: {
    width: '100%',
  },
  fullList: {
    width: 'auto',
  },
  technicalIndicatorStyle: {
    marginBottom: '5px',
  },
  containerChart:{
	  height: '75vh',
  },
  chart: {
    width: '100%',
    float: 'left',
    height: '800px',
    position: 'relative'
  }
});

export default function CoinPriceChart() {
  const classes = useStyles();
  const coinInfoData = useContext(CoinDetailPageConsumer)
  const [chartData, setChartData] = useState([])
  const [OHLC, setOHLC] = useState([])
  const [macdState, setMacdState] = useState(false)
  const [volumeData, setVolume] = useState([])
  const [lineChartData, setLineChartData] = useState([])
  const [state, setState] = useState({
    bottom: false,
  });
  const [lineCandleSelection, setLineCandleSelection] = useState('line')
  const HighchartsRef = useRef(null)
  const todaysDateTimeStamp = new Date().getTime();

  useEffect(() => {
    axios(
      'https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=1000&toTs='+todaysDateTimeStamp,
    ).then(function(data){
        setChartData(data['data']['Data'])
        curateDataForCharts(data['data']['Data']['Data'])
    })
  }, []);

  function curateDataForCharts(data){
    var ohlc = [],
        volume = [],
        price = [],
        dataLength = data.length,
        i = 0;

        for (i; i < dataLength; i += 1) {
            ohlc.push([
                data[i]['time']*1000, // the date
                data[i]['open'], // open
                data[i]['high'], // high
                data[i]['low'], // low
                data[i]['close'] // close
            ]);
            
            price.push([
              data[i]['time']*1000,
              data[i]['close']
            ])

            volume.push([
                data[i]['time']*1000, // the date
                data[i]['volumeto'] // the volume
            ]);
        }
        setOHLC(ohlc)
        setVolume(volume)
        setLineChartData(price)
  }

  const toggleDrawer = (side, open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const menuItems = side => {
    return(
      <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
        <List>
          <ListItem button> <ListItemText primary="Absolute Price Oscillator" /> </ListItem>
          <ListItem button> <ListItemText primary="Acceleration Bands" /> </ListItem>
          <ListItem button> <ListItemText primary="A/D (Accumulation/Distribution)" /> </ListItem>
        </List>
      </div>
    )

  }

  function switchChartType(series, seriesVolume, chartType) {
      series.chart.addSeries({
          type: chartType,
          data: OHLC,
          id: 'coin',
          name: 'Bitcoin Price',
        }
      )
      seriesVolume.chart.addSeries({
          type: 'column',
          data: volumeData,
          yAxis: 1
      })
      series.remove()
      seriesVolume.remove()

  }
  // linkedTo: 'coin-ohlc',
  // type: 'rsi',
  // data: OHLC,
  // yAxis: 1
  function changeChartType(){
    const series = HighchartsRef.current.chart.series[0]
    const seriesVolume = HighchartsRef.current.chart.series[1]
    series.type == 'line' ? switchChartType(series, seriesVolume, 'candlestick') : switchChartType(series, seriesVolume, 'line')
  };

  function addIndicators(indicatorType){
    // console.log((HighchartsRef.current.chart.yAxis[0] - (0.20 * HighchartsRef.current.chart.yAxis[0])).toString()+'px')
    // HighchartsRef.current.chart.yAxis[0].update({
    //   top: '20%',
    //   height: '60%'
    // });
    // HighchartsRef.current.chart.addAxis({
    //   id: 'r',
    //   lineWidth: 2,
    //   lineColor: '#08F',
    //   resize: {
    //       enabled: true
    //   },
    //   height: '20%',
    // }, false);
    // console.log(macdState)
    // if(macdState === false){
    //   HighchartsRef.current.chart.addSeries({
    //     linkedTo: 'coin',
    //     id: 'coin-macd',
    //     type: 'macd',
    //     data: OHLC,
    //     params: {
    //         shortPeriod: 12,
    //         longPeriod: 26,
    //         signalPeriod: 9,
    //         period: 26
    //     }
    //   });
    //   setMacdState(true)
    // } 
          
  };

    return(
      <div>
        <Switch
          defaultChecked
          value="checkedF"
          color="default"
          onClick={changeChartType}
        />
        <Button onClick={addIndicators}>RSI</Button>
        <Button onClick={addIndicators}>MacD</Button>
        <Button onClick={addIndicators}>SMA</Button>
        <div className={classes.chart}>
            <HighchartsReact
              ref= {HighchartsRef}
              highcharts={Highcharts}
              constructorType={'stockChart'}
              options={
                { 
                  chart:{
                    height: '800px'
                  },
                  credits: {
                    text: "thecoinprophet.com"
                  },
                  stockTools: {
                    gui: {
                        buttons: ['indicators', 'lines', 'toggleAnnotations', 'fullScreen']
                    }
                  },
                  yAxis: [{
                      labels: {
                          align: 'left'
                      },
                      height: '80%',
                      resize: {
                          enabled: true
                      },
                  }, {
                      labels: {
                          align: 'left'
                      },
                      top: '80%',
                      height: '20%',
                      offset: 0,
                      resize: {
                          enabled: true
                      },
                  }],
                  tooltip: {
                      shape: 'square',
                      headerShape: 'callout',
                      borderWidth: 0,
                      shadow: false,  
                      positioner: function (width, height, point) {
                          var chart = this.chart,
                              position;

                          if (point.isHeader) {
                              position = {
                                  x: Math.max(
                                      // Left side limit
                                      chart.plotLeft,
                                      Math.min(
                                          point.plotX + chart.plotLeft - width / 2,
                                          // Right side limit
                                          chart.chartWidth - width - chart.marginRight
                                      )
                                  ),
                                  y: point.plotY
                              };
                          } else {
                              position = {
                                  x: point.series.chart.plotLeft,
                                  y: point.series.yAxis.top - chart.plotTop
                              };
                          }

                          return position;
                      }
                  },
                  plotOptions:{
                    candlestick: {
                        color: 'red',
                        upColor: 'green'
                    },
                    line: {
                      color: 'black'
                    },
                    column: {
                      color: 'black'
                    }
                  },
                  series: [{
                        type: 'line',
                        id: 'coin',
                        name: 'Bitcoin Price',
                        data: OHLC
                    },{
                        type: 'column',
                        id: 'coin-volume',
                        name: 'Bitcoin Volume',
                        data: volumeData,
                        yAxis: 1
                    }],
                    responsive: {
                        rules: [{
                            condition: {
                                maxWidth: 800
                            },
                            chartOptions: {
                                rangeSelector: {
                                    inputEnabled: false
                                }
                            }
                        }]
                    }
                  }}
            />
            <Container>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                  <CoinDetailAnalyticCards />
              </Grid>
              <Grid item xs={12} md={6}>
                  <CoinDetailScales />
              </Grid>
            </Grid>
          </Container>
        </div>
        </div>
    )
}


// rangeSelector: {
//   selected: 2
// },
// credits: {
//   enabled: false
// },
// title: {
//   text: ''
// },
// legend: {
//   enabled: true
// },

// stockTools: {
//   gui: {
//       buttons: ['indicators', 'typeChange', 'lines', 'toggleAnnotations']
//   }
// },