import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import Typography from '@material-ui/core/Typography';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const useStyles = makeStyles(theme => ({
  fontStyle: {
    color: '#fbae1c',
  }
}))

const data = [
  createData('00:00', 0),
  createData('03:00', 300),
  createData('06:00', 600),
  createData('09:00', 800),
  createData('12:00', 1500),
  createData('15:00', 2000),
  createData('18:00', 2400),
  createData('21:00', 2400),
  createData('24:00', undefined),
];

export default function Chart() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title className={classes.fontStyle}>Prophet Forecast</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" />
          <YAxis>
            <Label angle={270} position="left" style={{ textAnchor: 'middle'}} >
              Price ($)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke="#fbae1c" />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}