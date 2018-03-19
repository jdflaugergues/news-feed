import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Moment from 'react-moment';
import cxs from 'cxs';
import Avatar from 'material-ui/Avatar';
import 'moment/locale/fr';

import getNewsfeedTheme from '../../common/theme';

const muiTheme = getNewsfeedTheme();

const styles = {
  badgeUserContainer: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    cursor: 'pointer',
  },
  badgeUserContent: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: '6px',
    lineHeight: '18px',
    overflow: 'hidden'
  },
  primaryText: {
    fontWeight: 'bold',
    fontSize: '14px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    width: '100%',
    overflow: 'hidden',
    color: muiTheme.palette.primary1Color
  },
  secondaryText: {
    fontWeight: 'normal',
    fontSize: '13px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '100%',
    whiteSpace: 'nowrap',
    color: muiTheme.palette.accent3Color
  }
};

export default class Badge extends Component {
  static propTypes = {
    primaryText: PropTypes.string.isRequired,
    dateText: PropTypes.string,
    extraText: PropTypes.string,
    picture: PropTypes.string,
    letters: PropTypes.string.isRequired,
    style: PropTypes.object
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired
  };

  render() {
    const {primaryText, dateText, extraText, picture, letters, style} = this.props;

    const badgeUserContainerStyle = {
      ...styles.badgeUserContainer,
      ...style
    };

    return (
      <div className={cxs(badgeUserContainerStyle)}>
        <Avatar size={40} src={picture}>
          {(letters && !picture) ? letters : null}
        </Avatar>
        <div className={cxs(styles.badgeUserContent)}>
          <span className={cxs(styles.primaryText)} title={primaryText}>
            {primaryText}
            {dateText && <span className={cxs(styles.secondaryText)}> - <Moment locale='fr' fromNow>{dateText}</Moment></span>}
          </span>
          {extraText && <span className={cxs(styles.secondaryText)} title={extraText}>{extraText}</span>}
        </div>
      </div>
    );
  }
}
