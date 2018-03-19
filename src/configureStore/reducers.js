import {combineReducers} from 'redux'

// import * as authenticationReducer from '../services/reducers/authentication';
import comment from '../components/Comment/CommentActions';
import newsFeed from '../components/NewsFeed/NewsFeedActions';
import authentication from '../components/Login/LoginActions';


export default combineReducers({
  authentication,
  comment,
  newsFeed
});
