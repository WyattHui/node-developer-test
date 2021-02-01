import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {
  DEFAULT_MOMENT_FORMAT
} from '../constants';
import logout from '../redux/actions/logout';

class MyInfo extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  render() {
    let props = this.props,
      loginInfo = props.loginInfo || {},
      user = loginInfo.user || {},
      name = user.name,
      email = user.email;

    return email ? <div>
      <h1>
        User Detail
      </h1>
      <div>
        Email:&nbsp;{email}
      </div>
      <div>
        Name:&nbsp;{name}
      </div>
      <div>
        Created At:&nbsp;{moment(user.date).format(DEFAULT_MOMENT_FORMAT)}
      </div>
      <button onClick={this.logout}>
        Logout
      </button>
    </div> : null;
  }

  async logout() {
    let props = this.props;

    try {
      await props.dispatch(logout());
    } catch (e) {
      // Do nothing
    }
  }
}

export default connect(
  state => ({
    loginInfo: state.loginInfo
  })
)(MyInfo);
