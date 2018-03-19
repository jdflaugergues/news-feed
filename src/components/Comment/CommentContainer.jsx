import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import cxs from 'cxs';

import Divider from 'material-ui/Divider';

import {initializeComments, addComment} from './CommentActions';
import CommentHeader from './CommentHeader';
import CommentInput from './CommentInput';
import Comment from './Comment';
import getNewsfeedTheme from '../../common/theme';

const muiTheme = getNewsfeedTheme();

const styles = {
  commentContainer: {
  },
  header: {

  },
  commentInput: {
  },
  comments: {
    paddingTop: '10px'
  }
};

class CommentContainer extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    commentList: PropTypes.array,
    comments: PropTypes.object.isRequired,
    addComment: PropTypes.func.isRequired,
    userProfile: PropTypes.object
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.handleKeyboardAction = this.handleKeyboardAction.bind(this);
  }

  componentWillMount() {
    const {id, commentList, initializeComments} = this.props;

    initializeComments(id, commentList);
  }

  handleKeyboardAction(event) {
    const {key, shiftKey, target: {value}} = event;
    const {id, addComment, userProfile} = this.props;

    const profile = JSON.parse(window.localStorage['profile']);

    if (key === 'Enter' && !shiftKey) {
      addComment(id, value, profile);
      event.target.value = '';
      event.preventDefault();
    }
  }

  render() {
    const {id, likes} = this.props;
    const comments = this.props.comments[id] || [];

    return (
      <div className={cxs(styles.commentContainer)}>
        <CommentHeader countComments={comments.length} countThanx={likes.length}/>
        <Divider/>
        <div className={cxs(styles.comments)}>
          {comments.map(({comment, profile}, index) => {
            return (
              <Comment
                key={index}
                comment={comment}
                profile={profile}>
              </Comment>
            )
          })}
        </div>
        <CommentInput
          onKeyboardAction={this.handleKeyboardAction}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    comments: state.comment
  }),
  {
    addComment: (id, comment, profile) => addComment(id, comment, profile),
    initializeComments: (id, comments) => initializeComments(id, comments)
  }
)(CommentContainer);