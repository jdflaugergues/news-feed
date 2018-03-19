import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Moment from 'react-moment';
import cxs from 'cxs';
import 'moment/locale/fr';

import getNewsfeedTheme from '../../common/theme';
import {Badge} from '../Base';

const muiTheme = getNewsfeedTheme();


const styles = {
  commentInput: {
    paddingBottom: '10px'
  },
  comment: {
    paddingLeft: '46px'
  },
  actions: {
    color: muiTheme.palette.accent3Color,
    paddingTop: '5px'
  }
};

export default class Comment extends Component {
  static propTypes = {
    profile: PropTypes.object,
    comment: PropTypes.string
  };

  getInitialProfile(firstName, lastName) {
    return [firstName, lastName].map(name => name && name[0].toUpperCase()).join('');
  }

  render() {
    const {profile: {avatar, name, first_name, last_name}, comment, createdDate} = this.props;

    return (
      <div className={cxs(styles.commentInput)}>
        <Badge
          picture={avatar}
          primaryText={name}
          letters={this.getInitialProfile(first_name, last_name)}
        />

        <div className={cxs(styles.comment)}>
          {comment}
          <div className={cxs(styles.actions)}>
            <Moment locale='fr' fromNow>{createdDate}</Moment>
          </div>
        </div>
      </div>
    );
  }
}
