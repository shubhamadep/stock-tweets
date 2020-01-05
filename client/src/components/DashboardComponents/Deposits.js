/* eslint-disable no-script-url */

import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Portfolio Value</Title>
      <Typography component="p" variant="h4" style={{ color: '#fbae1c'}}>
        $3,024.00
      </Typography>
      <Typography className={classes.depositContext}>
        on 29 October, 2019
      </Typography>
      <div>
        <Link href="javascript:;">
          View Full Portfolio
        </Link>
      </div>
    </React.Fragment>
  );
}