import PropTypes from 'prop-types';
import React, {Component} from 'react';
import cxs from 'cxs';

import getNewsfeedTheme from '../../common/theme';

const muiTheme = getNewsfeedTheme();

const styles = {
  tag: {
    color: muiTheme.palette.secondaryTextColor,
    fontWeight: 'bold',
    fontSize: '18px'
  }
};

export default class Tag extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired
  };

  render() {
    const {name} = this.props;

    return (
      <span className={cxs(styles.tag)}>#{name} </span>
    );
  }
}
