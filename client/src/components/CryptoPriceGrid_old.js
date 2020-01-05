import React, {Component} from 'react';
import { Container } from 'react-bootstrap';
import {connect} from 'react-redux';
import fetchGridDataAction from './fetchGridData';
import { bindActionCreators } from 'redux';
import Table from '@material-ui/core/Table';
import {TableBody, LinearProgress} from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom'
import { Typography } from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';


const styles = {
  root: {
    width: '100',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    marginTop: '10px'
  },
  tableSymbol: {
    marginLeft: '10px',
  },
  imgThumbnail: {
    border: '0px solid white', /* Gray border */
    marginRight: '5px',
    width: '25px', /* Set a small width */
  },
  tableHeader: {
    position: 'sticky',
    top: 0
  },
}

class CryptoPriceGrid extends Component {

  constructor(props){
    super(props)
    this.state = {
      symbols: "",
      prices: [],
      imageurls: {},
      rows: [],
      rowsPerPage: 0,
    }
    this.shouldComponentRender = this.shouldComponentRender.bind(this);
  }

  componentWillMount(){
    const { fetchGridData } = this.props;
    fetchGridData();
  }

  shouldComponentRender() {
      const { pending } = this.props;
      if (this.pending === false) return false;
      return true;
  }
  
  handleChangePage(event, newPage) {
    setPage(newPage);
  }

  handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  render(){

    if(!this.shouldComponentRender()){
      return (
          <div>
            <br />
            <LinearProgress />
          </div>
      )
    }

    function createData(rank, symbol, price, marketCap, volume, circulatinSupply, change, prediction, accuracy, imageURL) {
      return { rank, symbol, price, marketCap, volume, circulatinSupply, change, prediction, accuracy, imageURL };
    }

    const rows = []
    Object.keys(this.props.crypto_info).map((coin, index) =>
      rows.push(createData(index+1, coin, this.props.crypto_info[coin]['USD']['PRICE'], this.props.crypto_info[coin]['USD']['MKTCAP'],
                this.props.crypto_info[coin]['USD']['VOLUME24HOURTO'], this.props.crypto_info[coin]['USD']['SUPPLY'],
                this.props.crypto_info[coin]['USD']['CHANGEPCT24HOUR'], this.props.crypto_info[coin]['USD']['PRICE'],
                this.props.crypto_info[coin]['USD']['CHANGEPCT24HOUR'], this.props.crypto_info[coin]['USD']['IMAGEURL']
                ))
      )

    return (
        <Container>
            <div style={styles.root}>
              <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                        <TableCell align="right">#</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Market Cap</TableCell>
                        <TableCell align="right">Volume</TableCell>
                        <TableCell align="right">Circulating Supply</TableCell>
                        <TableCell align="right">Prediction</TableCell>
                        <TableCell align="right">Accuracy</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map(row => (
                          <TableRow hover component={Link} to={"/coin/BTC"} key={row.symbol}>
                              <TableCell align="right">#{row.rank}</TableCell>
                              <TableCell align="left"><img style={styles.imgThumbnail} src={"https://www.cryptocompare.com/" + row.imageURL} alt="Symbol" />{row.symbol}</TableCell>
                              <TableCell align="right" style={styles.tableSymbol}>{row.price}</TableCell>
                              <TableCell align="right">{row.marketCap}</TableCell>
                              <TableCell align="right">{row.circulatinSupply}</TableCell>
                              <TableCell align="center" style={{color: (row.change > 0 ? 'green' : 'red')}}>{row.change+'%'}</TableCell>
                              <TableCell align="right">{row.prediction}</TableCell>
                              <TableCell align="right" style={{color: (row.change > 0 ? 'green' : 'red')}} >{row.accuracy+'%'}</TableCell>
                          </TableRow>
                        ))}
                  </TableBody>
            </Table>
            </div>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{
                'aria-label': 'previous page',
              }}
              nextIconButtonProps={{
                'aria-label': 'next page',
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
        </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    crypto_info: state.crypto_info,
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators ({
  fetchGridData: fetchGridDataAction
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CryptoPriceGrid);
