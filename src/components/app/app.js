import agent from '../../agent';
import Header from '../Header';
import React from 'react';
import { connect } from 'react-redux';
import { APP_LOAD, REDIRECT } from '../../constants/actionTypes';
import { Route, Switch } from 'react-router-dom';
import Article from '../../components/Article';
import Editor from '../../components/editor';
import Home from '../../components/Home';
import Login from '../../components/Login';
import Profile from '../../components/Profile';
import ProfileFavorites from '../../components/ProfileFavorites';
import Register from '../../components/Register';
import Settings from '../../components/Settings';
import { store } from '../../store';
import { push } from 'react-router-redux';
import app from './app.module.css'

const mapStateToProps = state => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo
  }};

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
  onRedirect: () =>
    dispatch({ type: REDIRECT })
});

class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      // this.context.router.replace(nextProps.redirectTo);
      store.dispatch(push(nextProps.redirectTo));
      this.props.onRedirect();
    }
  }

  componentWillMount() {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
    }

    this.props.onLoad(token ? agent.Auth.current() : null, token);
  }

  render() {
    if (this.props.appLoaded) {
      return (
        <div className={app.page}>
          <Header
            appName={this.props.appName}
            currentUser={this.props.currentUser} />
            <Switch>
            <Route exact path="/" render={props => <Home {...props} />} />
            <Route path="/login" render={props => <Login {...props} />} />
            <Route path="/register" render={props => <Register {...props} />} />
            <Route path="/editor/:slug" render={props => <Editor {...props} />} />
            <Route path="/editor" render={props => <Editor {...props} />} />
            <Route path="/article/:id" render={props => <Article {...props} />} />
            <Route path="/settings" render={props => <Settings {...props} />} />
            <Route path="/@:username/favorites" render={props => <ProfileFavorites {...props} />} />
            <Route path="/@:username" render={props => <Profile {...props} />} />
            </Switch>
        </div>
      );
    }
    return (
      <div className={`${app.page}`}>
        <Header
          appName={this.props.appName}
          currentUser={this.props.currentUser} />
      </div>
    );
  }
}

// App.contextTypes = {
//   router: PropTypes.object.isRequired
// };

export default connect(mapStateToProps, mapDispatchToProps)(App);
