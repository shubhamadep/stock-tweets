import React, {Component} from 'react';
import GridList from '@material-ui/core/GridList';
import {GridListTile, GridListTileBar, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography, IconButton, Paper, Container} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LinkIcon from '@material-ui/icons/Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight  } from '@fortawesome/free-solid-svg-icons';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {

  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  gridListTile: {
    width: '375px',
    margin: '15px'
  },
  heading: {

  },
}

class NewsCards extends Component {

    constructor(props){
        super(props)
        this.state = {
          news: [],
        }
      }

  componentDidMount(){
    fetch('https://min-api.cryptocompare.com/data/v2/news/?lang=EN')
      .then(res => res.json())
      .then(json =>
        this.setState({
          news: json['Data'].slice(0,20),
      }))
  }

  render(){
    const newsItems = []
    const {  width } = this.props;
    let columns = width === 'md' || width === 'sm'  ? 2 : 5;
    this.state.news.forEach(item => newsItems.push({
          img: item['imageurl'],
          title: item['title'],
          url: item['url'],
        }
    ))
    return (
          <Paper>
            <div style={styles.root}>
              <GridList style={styles.gridList} cols={columns}>
                {newsItems.map(tile => (
                  <GridListTile key={tile.img} style={styles.gridListTile}>
                    <img src={tile.img} alt={tile.title}/>
                    <GridListTileBar
                      title={tile.title}
                      style={styles.titleBar}
                      actionIcon={
                        <IconButton aria-label={`link ${tile.title}`} href={tile.url}>
                          <LinkIcon fontSize='large' color='error'/>
                        </IconButton>
                      }
                    />
                  </GridListTile>
                ))}
              </GridList>
            </div>
          </Paper>
    );
  }
}

export default NewsCards;
