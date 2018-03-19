import PropTypes from 'prop-types';
import React, {Component} from 'react';
import cxs from 'cxs';

import getNewsfeedTheme from '../../common/theme';

const muiTheme = getNewsfeedTheme();

const styles = {
  commentHeader: {
    paddingBottom: '5px'

  },
  comment: {
    color: muiTheme.palette.primary1Color
  },
  thanx: {
    color: muiTheme.palette.accent3Color
  }
};

export default class CommentHeader extends Component {
  static propTypes = {
    countComments: PropTypes.number.isRequired,
    countThanx: PropTypes.number.isRequired
  };

  static defaultProps = {
    countComments: 0,
    countThanx: 0
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired
  };

  render() {
    const {countComments, countThanx} = this.props;

    return (
      <div className={cxs(styles.commentHeader)}>
        <span className={cxs(styles.comment)}>{countComments} {countComments > 1 ?'commentaires' : 'commentaire'}</span>
        <span className={cxs(styles.thanx)}> - {countThanx} Thanx</span>
      </div>
    );
  }
}
