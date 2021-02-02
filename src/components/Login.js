import React from 'react';
import {connect} from 'react-redux';
import login from '../redux/actions/login';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.updateEmail = this.updateCredential.bind(this, 'email');
    this.updatePassword = this.updateCredential.bind(this, 'password');
    this.onKeyPressPassword = this.onKeyPressPassword.bind(this);
    this.login = this.login.bind(this);
  }

  render() {
    let props = this.props,
      loginInfo = props.loginInfo || {},
      user = loginInfo.user || {},
      error = loginInfo.error || {},
      state = this.state;

    return user.email ? null : <div>
      <div className="text-danger">
        {error.message || ''}
      </div>
      <div className="text-right">
        <div>
          <label htmlFor="email">
            Email:
          </label>
          &nbsp;
          <input
            id="email"
            type="text"
            onChange={this.updateEmail}
            value={state.email}/>
        </div>
        <div>
          <label htmlFor="password">
            Password:
          </label>
          &nbsp;
          <input
            id="password"
            type="password"
            data-testid="password"
            onChange={this.updatePassword}
            onKeyPress={this.onKeyPressPassword}
            value={state.password}/>
        </div>
      </div>
      <button id="login"
        onClick={this.login}>
        Login
      </button>
    </div>;
  }

  updateCredential = (name, e) => {
    let newState = {};
    newState[name] = e.target.value;
    this.setState(newState);
  };

  onKeyPressPassword(e) {
    if (e.key === 'Enter') {
      this.login();
    }
  }

  async login() {
    let props = this.props,
      loginInfo = props.loginInfo || {},
      isLoggingIn = loginInfo.isLoggingIn,
      {email, password} = this.state;

    if (isLoggingIn) {
      return;
    }

    try {
      await props.dispatch(login({
        email,
        password
      }));
      this.setState({
        email: '',
        password: ''
      });
    } catch (e) {
      // Do nothing
    }
  }
}

export default connect(
  state => ({
    loginInfo: state.loginInfo
  })
)(Login);
