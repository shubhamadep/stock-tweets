import React from 'react';
import { AppBar, Toolbar, Typography, Button, InputBase, Hidden, IconButton, Drawer, List, ListItem, ListItemText, Dialog} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faChartLine, faNewspaper, faTools, faComments, faListAlt, faHome} from '@fortawesome/free-solid-svg-icons'
import { makeStyles, fade } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink } from 'react-router-dom';

//Refer : https://github.com/FortAwesome/react-fontawesome

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    width: '100%',
  },
  list: {
    width: 250,
  },
  toolBarLeft: {
    flexGrow: 1,
  },
  margin: {
    marginLeft: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
    color: '#fbae1c',
    fontWeight: 'bold',
    "&:hover": {
      color: '#e19c19'
    }
  },
  iconButton:{
    color: '#fbae1c',
    color: '#fbae1c',
    fontWeight: 'bold',
    "&:hover": {
      color: '#e19c19'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 180,
      },
    }
  },
  '@media (max-width: 600)': {
    toolBarLeft: {
      alignItems: 'center',
      color: "white"
    }
  },
  link: {
    color: "white"
  }

}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <ListItem button component={NavLink} to='/'><ListItemText primary={'Home'} />  <FontAwesomeIcon size="lg"icon={faHome}/> </ListItem>
        <ListItem button component={NavLink} to='/'><ListItemText primary={'Contact Us'} />  <FontAwesomeIcon size="lg"icon={faHome}/> </ListItem>   
      </List>
    </div>
  );

  return (
      <div className={classes.root}>
          <AppBar position="sticky" style={{backgroundColor: '#212529', color: '#fbae1c'}}>
            <Toolbar>
                  <Typography className={classes.toolBarLeft} variant="subtitle1" gutterBottom>
                    <Hidden lgUp>
                      <IconButton edge="start" onClick={toggleDrawer('left', true)} color="inherit" aria-label="menu">
                        <MenuIcon fontSize='small'/>
                      </IconButton>
                      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
                        {sideList('left')}
                      </Drawer>
                    </Hidden>
                    Stock Tweets
                  </Typography>
                  <Hidden mdDown>
                    <Typography   className={classes.toolBarLeft} variant="h6" gutterBottom >
                      <Button component={NavLink} to='/' className={classes.button} disableRipple> Home </Button>
                      <Button component={NavLink} to='/' className={classes.button} disableRipple> Contact Us </Button>
                    </Typography>                
                  </Hidden>
            </Toolbar>
          </AppBar>
      </div>
    );
  }