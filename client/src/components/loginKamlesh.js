import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

import * as actions from '../actions/login';
import config from '../config/config.json';

class login extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);
  }

  async onSubmit(formData) {
    await this.props.signIn(formData);
    if (!this.props.errorMessage) {
      this.props.history.push('/dashboard');
    }
  }

  async responseGoogle(res) {
      var that = this;
    await this.props.oauthGoogle(res.accessToken);
    debugger;
    if (!this.props.errorMessage) {
        debugger;
      //that.props.history.push('/dashboard');
    }
  }

  async responseFacebook(res) {
    await this.props.oauthFacebook(res.accessToken);
    if (!this.props.errorMessage) {
    //  this.props.history.push('/dashboard');
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="row">
        <div className="col">
          <div className="text-center">
         
            <FacebookLogin
              appId='609107356292516'
              render={renderProps => (
                <button style={{ marginRight: 15 }} className="btn btn-primary" onClick={renderProps.onClick}>Facebook</button>
              )}
              fields="name,email,picture"
              callback={this.responseFacebook}
              cssClass="btn btn-outline-primary"
            />
            <GoogleLogin 
              clientId={config.GOOGLE_CLIENT_ID}
              render={renderProps => (
                <button className="btn btn-danger" onClick={renderProps.onClick} disabled={renderProps.disabled}>Google</button>
              )}
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              className="btn btn-outline-danger"
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage
  }
}

export default compose(
  connect(mapStateToProps, actions)
)(login)
