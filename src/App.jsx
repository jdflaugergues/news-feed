import React from 'react';
import {connect, Provider} from 'react-redux';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import cxs from 'cxs';

import getNewsfeedTheme from './common/theme';
import {NewsFeed} from './components/NewsFeed';
import {AppBarMenu} from './components/AppBarMenu';
import {authenticateUser} from './components/Login/LoginActions';

const muiTheme = getNewsfeedTheme();

const appStyle = cxs({
  display: 'block',
  minHeight: '100vh'
});

const propTypes = {
  store: PropTypes.object.isRequired
};

function App({store, ...props}){
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <Provider store={store}>
        <div>
          <AppBarMenu {...props}/>
          <main className={appStyle}>
            <NewsFeed authentication={props.authentication}/>
          </main>
        </div>
      </Provider>
    </MuiThemeProvider>
  );
}

App.propTypes = propTypes;


export default connect(
  state => ({
    authentication: state.authentication
  }),
  dispatch => ({
    authenticate: (login, password) => dispatch(authenticateUser(login, password))
  })
)(App);
