import PropTypes from 'prop-types';
import React, {Component} from 'react';
import cxs from 'cxs';

import getNewsfeedTheme from '../../common/theme';

const muiTheme = getNewsfeedTheme();


const styles = {
  attachment: {
    position: 'relative',
    display: 'inline',
    paddingTop: '10px',
    ' img': {
      height: 'auto',
      width: '100%'
    }
  },
  title: {
    color: muiTheme.palette.canvasColor,
    position: 'absolute',
    width: '100%',
    bottom: '0',
    left: '0',
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '80px',
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '4px'
  }
};

export class Attachment extends Component {
  static propTypes = {
    link: PropTypes.string,
    picture: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    title: PropTypes.string
  };

  render() {
    const {link, picture, height, width, title} = this.props;

    return (
      <div className={cxs(styles.attachment)}>
        <a href={link}>
          <img src={picture} />
          <div className={cxs(styles.title)}>{title}</div>
        </a>

      </div>
    );
  }
}
