import React from 'react';
import {connect} from 'react-redux';
import {setUser} from '../redux/actions';
import {login} from '../api/users';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoggingIn: false
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
      state = this.state;

    return user.email ? null : <div>
      <div className="text-danger">
        {state.errorMsg || ''}
      </div>
      <div className="text-right">
        <div>
          Email:&nbsp;
          <input
            onChange={this.updateEmail}
            value={state.email}/>
        </div>
        <div>
          Password:&nbsp;
          <input
            type="password"
            onChange={this.updatePassword}
            onKeyPress={this.onKeyPressPassword}
            value={state.password}/>
        </div>
      </div>
      <button onClick={this.login}>
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
    let {isLoggingIn, email, password} = this.state,
      user;

    if (isLoggingIn) {
      return;
    }

    this.setState({
      errorMsg: null,
      isLoggingIn: true
    });

    try {
      user = await login({
        email,
        password
      });
    } catch (e) {
      return this.setState({
        errorMsg: e.message,
        isLoggingIn: false
      });
    }

    this.setState({
      email: '',
      password: '',
      isLoggingIn: false
    });
    this.props.setUser(user);
  }
}

export default connect(
  state => ({
    loginInfo: state.loginInfo
  }),
  {setUser}
)(Login);
