import {createActions, handleActions} from 'redux-actions';
import fetch from 'cross-fetch';

const defaultState = {};

export const {getNewsFeed} = createActions({
  GET_NEWS_FEED: async (accessToken) => {
    const {feed_items: {feed_items}} = await fetchPosts(accessToken);
    return {feedItems: feed_items};
  }
});


export default handleActions({
  [getNewsFeed] (state, {payload: {feedItems}}) {
    console.log('feedItems', feedItems);
    return {
      ...state,
      feedItems,
    };
  }
}, defaultState);


function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}

function fetchPosts(token) {
  return new Promise((resolve, reject) => {
    fetch('https://api.wizbii.com/v2/dashboard/?direction=newest', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: '{}'
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(data => resolve(data))
      .catch(err => reject(err));
  })
}
