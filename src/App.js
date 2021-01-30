import React from 'react';
import {connect} from 'react-redux';
import {setUser} from './redux/actions';
import {me} from './api/users';
import Login from './components/Login';
import MyInfo from './components/MyInfo';
import './App.css';

class App extends React.Component {
  componentDidMount() {
    this.fetchLoginInfo();
  }

  async fetchLoginInfo() {
    let user;
    try {
      user = await me();
    } catch (e) {
      return console.error(e);
    }
    this.props.setUser(user);
  }

  render() {
    return <div className="App">
      <header className="App-header">
        <h1>
          Node Developer Test
        </h1>
        <Login />
        <MyInfo />
      </header>
    </div>;
  }
}

export default connect(
  null,
  {setUser}
)(App);
