import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import cxs from 'cxs';
import _ from 'lodash';

import {FeedItem} from './FeedItem';
import {getNewsFeed} from './NewsFeedActions';


const newsFeedStyle = cxs({
  margin: 'auto',
  paddingTop: '30px',
  width: '800px',
  display: 'block'
});


// Component of the trip page.
class NewsFeed extends Component {
  static propTypes = {
    feedItems: PropTypes.array
  };

  static defaultProps = {
    feedItems: []
  };

  getPosts(accessToken = window.localStorage['access-token']) {
    if (accessToken) {
      this.props.getNewsFeed(accessToken);
    }
  }

  filterFeedItems (feedItems) {
    return _.filter(feedItems, 'publication');
  }

  render() {
    const {authentication, feedItems} = this.props;
    if (_.isEmpty(feedItems)) {
      this.getPosts(_.get(authentication, 'accessToken'));
    }
    return (
      <div className={newsFeedStyle}>
        {this.filterFeedItems(feedItems).map(({id, publication: {date_created, content, tags, comments, likes, profile, company}}) => {
          return (
            <FeedItem
              key={id}
              id={id}
              date_created={date_created}
              content={content}
              profile={profile}
              company={company}
              tags={tags}
              comments={comments}
              likes={likes}
            >
            </FeedItem>
          )
        })}
      </div>
    );
  }
}

export default connect(
  state => ({
    feedItems: state.newsFeed.feedItems
  }),
  dispatch => ({
    getNewsFeed: (token) => dispatch(getNewsFeed(token))
  })
)(NewsFeed);
