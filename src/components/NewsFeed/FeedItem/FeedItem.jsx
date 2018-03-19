import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cxs from 'cxs';
import _ from 'lodash';

import Paper from 'material-ui/Paper';

import {Badge, Tag} from '../../Base';
import {CommentContainer} from '../../Comment';

import getNewsfeedTheme from '../../../common/theme';

const muiTheme = getNewsfeedTheme();

const styles = {
  feedItem: {
    padding: '20px',
    margin: '10px',
    marginTop: '0'
  },
  badge: {
    paddingBottom: '10px'
  },
  tags: {
    paddingBottom: '10px'
  },
  content: {
    whiteSpace: 'pre-wrap',
    ' a': {
      color: muiTheme.palette.primary1Color
    }
  },
  comments: {
    paddingTop: '15px'
  }
};


// Component of the trip page.
class NewsFeed extends Component {
  static propTypes = {
    date_created: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired,
    comments: PropTypes.array,
    likes: PropTypes.array,
    profile: PropTypes.shape({
      avatar: PropTypes.string,
      name: PropTypes.string,
      title: PropTypes.string
    }),
    company: PropTypes.shape({
      logo: PropTypes.string,
      name: PropTypes.string
    }),
    userProfile: PropTypes.object
  };

  static defaultProps = {
    comments: [],
    likes: []
  };

  addContentLink(content) {
    return content.replace(/(http(s)?[^\s]*)/g, '<a href="$1">$1</a>')
  }

  getInitialProfile(firstName, lastName) {
    return _([firstName, lastName])
      .filter()
      .map(name => name && name[0].toUpperCase())
      .values()
      .join('');
  }

  getBadgeParameter(profile, company) {
    if (profile) {
      const {avatar, name, title, first_name, last_name} = profile;

      return {
        picture: avatar,
        primaryText: name,
        extraText: title,
        letters: this.getInitialProfile(first_name, last_name)
      }
    }

    if (company) {
      const {logo, name} = company;

      return {
        picture: logo,
        primaryText: name,
        letters: this.getInitialProfile(name)
      }
    }
  }

  render() {
    const {id, date_created, content, tags, comments, likes, profile, company, userProfile} = this.props;
    const {picture, primaryText, extraText = '', letters} = this.getBadgeParameter(profile, company);

    return (
      <Paper className={cxs(styles.feedItem)} zDepth={3}>
        <article>
          <Badge
            picture={picture}
            primaryText={primaryText}
            dateText={date_created}
            extraText={extraText}
            style={styles.badge}
            letters={letters}
          />
          <div className={cxs(styles.tags)}>
            {tags && tags.map(({_id, name}) => <Tag key={_id} name={name} /> )}
          </div>
          <div
            className={cxs(styles.content)}
            dangerouslySetInnerHTML={{__html: this.addContentLink(content)}}>
          </div>
          <div className={cxs(styles.comments)}>
            <CommentContainer
              id={id}
              commentList={comments}
              likes={likes}
              userProfile={userProfile}
            />
          </div>
        </article>
      </Paper>
    )
  }
}

export default NewsFeed;
