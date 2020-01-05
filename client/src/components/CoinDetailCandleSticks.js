import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

const options = {
    rangeSelector: {
      selected: 2
    },
    credits: {
      enabled: false
    },
    title: {
      text: ''
    },
    legend: {
      enabled: true
    },
    series: [{
      name: 'AAPL Stock Price',
      type: 'candlestick',
      data: [1, 2, 1, 4, 3, 6, 7, 3, 8, 6, 9],
      id: 'data',
      dataGrouping: {
          units: [
              [
                  'week', // unit name
                  [1] // allowed multiples
              ], [
                  'month',
                  [1, 2, 3, 4, 6]
              ]
          ]
      }
    }]
};

export default function CoinDetailCandlesticks() {
    return(
        <div>
            <HighchartsReact
              highcharts={Highcharts}
              constructorType={'stockChart'}
              options={options}
            />
        </div>
    )
}