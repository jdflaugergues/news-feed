import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';

import PropTypes from 'prop-types';
import cxs from 'cxs';

import getNewsfeedTheme from '../../common/theme';

const muiTheme = getNewsfeedTheme();

const snackBarStyle = {
  fontSize: '16px'
};

const snackBarSuccessStyle = {
  ...snackBarStyle,
  color: muiTheme.palette.alert1Color
};

const snackBarErrorStyle = {
  ...snackBarStyle,
  color: muiTheme.palette.alert3Color
};


// Component of the trip page.
class Login extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    authenticate: PropTypes.func.isRequired
  };


  constructor(props) {
    super(props);

    this.state = {
      open: false,
      loginValue: '',
      passwordValue: '',
      snackbar: {
        open: false,
        message: ''
      }
    };

    this.updateLoginValue = this.updateLoginValue.bind(this);
    this.updatePasswordValue = this.updatePasswordValue.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleConnect = this.handleConnect.bind(this);
    this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
    this.close = this.close.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      open: newProps.isOpen
    })
  }

  updateLoginValue(event) {
    this.setState({loginValue: event.target.value});
  }

  updatePasswordValue(event) {
    this.setState({passwordValue: event.target.value});
  }

  handleCancel() {
    this.setState({
      loginValue: '',
      passwordValue: ''
    });
    this.close();
  }

  handleConnect() {
    this.props.authenticate(this.state.loginValue, this.state.passwordValue)
      .then(() => {
        this.setState({
          snackbar: {
            open: true,
            isError: false,
            message: 'Authentification réussie'
          }
        });
        this.close();
      })
      .catch((err) => {
        const message = (err.response.status === 401)
          ? 'Votre compte ou mot de passe est incorrect. Veuillez réessayer'
          : 'Une erreur s\'est produite lors de l\'authentification, veuillez réessayer';
        this.setState({
          snackbar: {
            open: true,
            isError: true,
            message
          }
        });
      });
  }

  close() {
    this.setState({open: false});
  };

  handleSnackbarClose() {
    this.setState({snackbar: {open: false}});
  }

  render() {
    const actions = [
      <FlatButton
        label="Annuler"
        primary
        onClick={this.handleCancel}
      />,
      <FlatButton
        label="Se connecter"
        primary
        disabled={false}
        onClick={this.handleConnect}
      />
    ];

    const snackBarStyle = this.state.snackbar.isError ? snackBarErrorStyle : snackBarSuccessStyle;

    return (
      <div>
        <Dialog
          title="Connexion au flux d'actualité"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <TextField
            floatingLabelText="Identifiant"
            value={this.state.loginValue}
            onChange={this.updateLoginValue}
            fullWidth={true}
          /><br />
          <TextField
            floatingLabelText="Mot de passe"
            type="password"
            value={this.state.passwordValue}
            onChange={this.updatePasswordValue}
            fullWidth={true}
          />
        </Dialog>
        <Snackbar
          contentStyle={snackBarStyle}
          open={this.state.snackbar.open}
          message={this.state.snackbar.message}
          onRequestClose={this.handleSnackbarClose}
          autoHideDuration={4000}
        />
      </div>
    );
  }
}

export default Login;
