import React, { Component } from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';

import * as actions from '../actions/login';

import { withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
//Material UI Components
import {
  Container,
  Grid,
  Button,
  Typography,
  TextField,
  Divider
} from "@material-ui/core";


//UI Oauth2 Components
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { makeStyles } from "@material-ui/core/styles";
import {
  faGoogle,
  faFacebook,

} from "@fortawesome/free-brands-svg-icons";

import config from '../config/config.json';

/*
const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200
  },
  inputFields: {
    width: "100%"
  },
  socialMediaButton: {
    backgroundColor: "white",
    marginLeft: theme.spacing(4),
    marginTop: theme.spacing(4)
  },
  socialIcons: {
    marginLeft: theme.spacing(1)
  }
}));
*/


const useStyles1 = {
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: ' 1 rem',
    marginRight: ' 1 rem'
  },
  dense: {
    marginTop: ' 2 rem'
  },
  menu: {
    width: 200
  },
  inputFields: {
    width: "100%"
  },
  socialMediaButton: {
    backgroundColor: "white",
    marginLeft: ' 4 rem',
    marginTop: ' 4 rem'
  },
  socialIcons: {
    marginLeft: ' 1 rem'
  }
};

 const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

class Login extends Component {
  constructor(props) {
    super(props);
    //this.onSubmit = this.onSubmit.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);
    this.useStyles = useStyles;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);

    this.state = {
      email: '',
      password: ''
    };
  }

 /* async handleSubmit(formData) {
    debugger;
    var payload = {
      email: this.state.email,
      password:this.state.password
    }
    await this.props.signIn(payload);
    if (!this.props.errorMessage) {
     // this.props.history.push('/dashboard');
    }
  }
*/
  async responseGoogle(res) {
     await this.props.oauthGoogle(res.accessToken);
    debugger;
    if (!this.props.errorMessage) {
        debugger;
        this.props.handleCloseCallback();
      //that.props.history.push('/dashboard');
    }
  }

  async responseFacebook(res) {
    await this.props.oauthFacebook(res.accessToken);
    if (!this.props.errorMessage) {
      this.props.history.push('/dashboard');
    }
  }

  async  handleSubmit(event) {
    debugger;
    alert('A name was submitted: ');
    event.preventDefault();
    var payload = {
      email: this.state.email,
      password:this.state.password
    }
    await this.props.signIn(payload);
    debugger;
    if (this.props.showPricingPage) {
      // eslint-disable-next-line no-restricted-globals 
      this.props.history.push('/pricing');
   
 
    }
    //await this.props.oauthFacebook(res.accessToken);

  }

  async handleChangeEmail(event) {
    debugger;
    let oldState = {
      email: this.state.email,
      password: this.state.password
      
    };
    oldState.email =  event.target.value;

    this.setState(oldState);
  }

 
  async handleChangePassword(event) {
    debugger;

    let oldState = {
      email: this.state.email,
      password: this.state.password
      
    };
    oldState.password =  event.target.value;

    this.setState(oldState);
  }

  /*async onSubmit(formData) {
    await this.props.signIn(formData);
    if (!this.props.errorMessage) {
      this.props.history.push('/dashboard');
    }
  }*/


  render() {
    var classes = useStyles;
    return (
    <Container md={12} xs={12} style={{ height: "500px", width: "450px" }}>
      <Grid>
        <Grid item xs={12} md={12} style={{ height: "5rem" }}>
          <Grid item xs={12} md={12}>
            <Typography align="center" variant="h6">
              Login
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Grid container>
              <Grid item xs={6} md={6}>
                <FacebookLogin
                  appId="609107356292516"
                  render={renderProps => (
                    <Button
                      style={{ marginRight: 1 }}
                      className="btn btn-primary"
                      onClick={renderProps.onClick}
                      startIcon={<FontAwesomeIcon icon={faFacebook} />}
                      color="primary"
                      variant="contained"
                    >
                      Facebook
                    </Button>
                  )}
                  fields="name,email,picture"
                  cssClass="btn btn-outline-primary"
                  onSuccess={this.responseFacebook}
                  
                />
              </Grid>

              <Grid item xs={6} md={6}>
                <GoogleLogin
                  clientId={config.GOOGLE_CLIENT_ID}
                  render={renderProps => (
                    <Button
                      className="btn btn-danger"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      startIcon={<FontAwesomeIcon icon={faGoogle} />}
                      color="secondary"
                      variant="contained"
                      style={{'margin-left': '6rem'}}
                    >
                      Google
                    </Button>
                  )}
                  className="btn btn-outline-danger"
                  onSuccess={this.responseGoogle}
                />
              </Grid>
            </Grid>
            <Divider style={{'margin-top': '1rem'}}/>
          </Grid>
        </Grid>

        <Grid item xs={12} md={12}>
          <Grid item xs={12} md={12}>
            <Container  maxWidth="xs">
              <CssBaseline />

              <div className={classes.paper}>
                <Typography component="h6" variant="h6" style={{ 'margin-left': "6rem",  'margin-top': "1rem"}}>
                  Or Be Classical
                </Typography>
                <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={this.handleChangeEmail}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={this.handleChangePassword}
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="#" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </div>
            </Container>
          </Grid>
        </Grid>
      </Grid>
    </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage,
    showPricingPage: state.auth.showPricingPage
  }
}

export default compose(withRouter,
  connect(mapStateToProps, actions)
)(Login);
