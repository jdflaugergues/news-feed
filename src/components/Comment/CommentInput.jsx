import PropTypes from 'prop-types';
import React, {Component} from 'react';
import cxs from 'cxs';

import TextField from 'material-ui/TextField';

const styles = {
  commentInput: {
    paddingBottom: '5px'
  }
};

export default class CommentInput extends Component {
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired
  };

  render() {
    const {onKeyboardAction} = this.props;

    return (
      <div className={cxs(styles.commentInput)}>
        <TextField
          hintText="Ajouter un commentaire"
          multiLine={true}
          rows={1}
          fullWidth={true}
          onKeyPress={onKeyboardAction}
        />
      </div>
    );
  }
}
