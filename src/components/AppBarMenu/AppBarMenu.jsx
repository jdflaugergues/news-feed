import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import cxs from 'cxs';
import _ from 'lodash';

import {Login} from '../Login';


const appBarStyle = cxs({
});

class LoginButton extends Component {
  static muiName = 'FlatButton';

  render() {
    const {handleOpenLoginDialog} = this.props;
    return (
      <FlatButton
        label="Se connecter"
        onClick={handleOpenLoginDialog}
      />
    );
  }
}

// Component of the trip page.
class AppBarMenu extends Component {
  static propTypes = {
    authenticate: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }
  state = {
    loginDialogOpen: false
  };

  handleChange = (event, logged) => {
    this.setState(prevState => ({loginDialogOpen: !prevState.loginDialogOpen}));
  };

  handleOpenLoginDialog = () => {
    console.log('handleOpenLoginDialog');
    this.setState({loginDialogOpen: true});
  };

  render() {
    const {authenticate} = this.props;
    return (
      <div className={appBarStyle}>
        <AppBar
          title="Flux d'actualité"
          showMenuIconButton={false}
          iconElementRight = {!_.get(this.props, 'authentication.logged')
            ? <LoginButton handleOpenLoginDialog={this.handleOpenLoginDialog}/>
            :<Avatar src={this.props.authentication.profile.avatar}/>}
        />
        <Login
          authenticate={authenticate}
          isOpen={this.state.loginDialogOpen}
        />
      </div>
    );
  }
}

export default AppBarMenu;
