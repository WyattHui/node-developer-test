import React from 'react';
import {connect} from 'react-redux';
import me from './redux/actions/me';
import Login from './components/Login';
import MyInfo from './components/MyInfo';
import './App.css';

class App extends React.Component {
  componentDidMount() {
    this.fetchLoginInfo();
  }

  async fetchLoginInfo() {
    let props = this.props;

    try {
      await props.dispatch(me());
    } catch (e) {
      // Do nothing
    }
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

export default connect()(App);
